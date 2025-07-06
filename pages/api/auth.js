import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, masterPassword, deviceId } = req.body

  console.log('Auth API called:', { action, deviceId }) // Debug log

  try {
    if (action === 'setup') {
      const hash = await bcrypt.hash(masterPassword, 12)
      const { data, error } = await supabase
        .from('master_password')
        .insert([{ device_id: deviceId, password_hash: hash }])
        .select()
      
      if (error) {
        console.error('Setup error:', error)
        throw error
      }
      
      console.log('Setup successful:', data)
      return res.json({ success: true })
    }

    if (action === 'login') {
      const { data, error } = await supabase
        .from('master_password')
        .select('password_hash')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false })
        .limit(1)
      
      if (error) {
        console.error('Login query error:', error)
        throw error
      }
      
      console.log('Login query result:', data)
      
      if (!data || data.length === 0) {
        return res.json({ success: false, isFirstTime: true })
      }
      
      const isValid = await bcrypt.compare(masterPassword, data[0].password_hash)
      console.log('Password verification:', isValid)
      
      return res.json({ success: isValid })
    }

    if (action === 'check') {
      const { data, error } = await supabase
        .from('master_password')
        .select('id')
        .eq('device_id', deviceId)
      
      if (error) {
        console.error('Check error:', error)
        throw error
      }
      
      const isFirstTime = !data || data.length === 0
      console.log('Check result:', { isFirstTime, dataLength: data?.length })
      
      return res.json({ isFirstTime })
    }

    if (action === 'reset') {
      // Verify master password before reset
      const { data: masterData, error: masterError } = await supabase
        .from('master_password')
        .select('password_hash')
        .eq('device_id', deviceId)
        .limit(1)
      
      if (masterError) throw masterError
      
      if (!masterData || masterData.length === 0) {
        return res.json({ success: false, error: 'No master password found' })
      }
      
      const isValid = await bcrypt.compare(masterPassword, masterData[0].password_hash)
      if (!isValid) {
        return res.json({ success: false, error: 'Invalid master password' })
      }

      // Delete all data
      await supabase.from('master_password').delete().eq('device_id', deviceId)
      await supabase.from('passwords').delete().eq('device_id', deviceId)
      
      return res.json({ success: true })
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