import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  console.log('Auth API called - Method:', req.method)
  console.log('Request body:', req.body)
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, masterPassword, deviceId } = req.body

  if (!action || !deviceId) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    console.log(`Processing action: ${action} for device: ${deviceId}`)

    if (action === 'setup') {
      if (!masterPassword) {
        return res.status(400).json({ error: 'Master password required' })
      }

      const hash = await bcrypt.hash(masterPassword, 10) // Reduced from 12 to 10 for faster processing
      console.log('Generated hash for setup')
      
      const { data, error } = await supabase
        .from('master_password')
        .insert([{ device_id: deviceId, password_hash: hash }])
        .select()
      
      if (error) {
        console.error('Supabase insert error:', error)
        return res.status(500).json({ error: 'Database error', details: error.message })
      }
      
      console.log('Setup successful')
      return res.json({ success: true })
    }

    if (action === 'check') {
      const { data, error } = await supabase
        .from('master_password')
        .select('id')
        .eq('device_id', deviceId)
      
      if (error) {
        console.error('Supabase check error:', error)
        return res.status(500).json({ error: 'Database error', details: error.message })
      }
      
      const isFirstTime = !data || data.length === 0
      console.log(`Check result - isFirstTime: ${isFirstTime}, found ${data?.length || 0} records`)
      
      return res.json({ isFirstTime })
    }

    if (action === 'login') {
      if (!masterPassword) {
        return res.status(400).json({ error: 'Master password required' })
      }

      const { data, error } = await supabase
        .from('master_password')
        .select('password_hash')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false })
        .limit(1)
      
      if (error) {
        console.error('Supabase login query error:', error)
        return res.status(500).json({ error: 'Database error', details: error.message })
      }
      
      if (!data || data.length === 0) {
        console.log('No master password found for device')
        return res.json({ success: false, isFirstTime: true })
      }
      
      console.log('Found master password, verifying...')
      const isValid = await bcrypt.compare(masterPassword, data[0].password_hash)
      console.log(`Password verification result: ${isValid}`)
      
      return res.json({ success: isValid })
    }

    return res.status(400).json({ error: 'Invalid action' })

  } catch (error) {
    console.error('Auth API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    })
  }
}