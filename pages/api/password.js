import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  console.log('Passwords API called - Method:', req.method)
  console.log('Request body:', req.body)
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, deviceId } = req.body

  if (!action || !deviceId) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    console.log(`Processing passwords action: ${action} for device: ${deviceId}`)

    if (action === 'load') {
      const { data, error } = await supabase
        .from('passwords')
        .select('*')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Load passwords error:', error)
        return res.status(500).json({ error: 'Database error', details: error.message })
      }
      
      console.log(`Loaded ${data?.length || 0} passwords`)
      return res.json({ success: true, data: data || [] })
    }

    if (action === 'save') {
      const { website, username, encryptedPassword } = req.body
      
      if (!website || !username || !encryptedPassword) {
        return res.status(400).json({ error: 'Missing required fields for save' })
      }

      // Check for existing entry (case insensitive)
      const { data: existing, error: checkError } = await supabase
        .from('passwords')
        .select('id')
        .eq('device_id', deviceId)
        .ilike('website', website)
        .ilike('username', username)
      
      if (checkError) {
        console.error('Check existing error:', checkError)
        return res.status(500).json({ error: 'Database error', details: checkError.message })
      }

      if (existing && existing.length > 0) {
        // Update existing
        const { error: updateError } = await supabase
          .from('passwords')
          .update({ 
            encrypted_password: encryptedPassword, 
            updated_at: new Date().toISOString() 
          })
          .eq('id', existing[0].id)
        
        if (updateError) {
          console.error('Update error:', updateError)
          return res.status(500).json({ error: 'Database error', details: updateError.message })
        }
        
        console.log('Password updated successfully')
        return res.json({ success: true, message: 'Password updated' })
      } else {
        // Create new
        const { error: insertError } = await supabase
          .from('passwords')
          .insert([{
            device_id: deviceId,
            website,
            username,
            encrypted_password: encryptedPassword
          }])
        
        if (insertError) {
          console.error('Insert error:', insertError)
          return res.status(500).json({ error: 'Database error', details: insertError.message })
        }
        
        console.log('Password saved successfully')
        return res.json({ success: true, message: 'Password saved' })
      }
    }

    if (action === 'delete') {
      const { passwordId } = req.body
      
      if (!passwordId) {
        return res.status(400).json({ error: 'Password ID required' })
      }

      const { error } = await supabase
        .from('passwords')
        .delete()
        .eq('id', passwordId)
        .eq('device_id', deviceId)
      
      if (error) {
        console.error('Delete error:', error)
        return res.status(500).json({ error: 'Database error', details: error.message })
      }
      
      console.log('Password deleted successfully')
      return res.json({ success: true })
    }

    return res.status(400).json({ error: 'Invalid action' })

  } catch (error) {
    console.error('Passwords API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    })
  }
}