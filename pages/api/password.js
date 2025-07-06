import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, deviceId, website, username, encryptedPassword, passwordId } = req.body

  try {
    if (action === 'load') {
      const { data, error } = await supabase
        .from('passwords')
        .select('*')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return res.json({ success: true, data: data || [] })
    }

    if (action === 'save') {
      // Check for existing entry
      const { data: existing, error: checkError } = await supabase
        .from('passwords')
        .select('id')
        .eq('device_id', deviceId)
        .ilike('website', website)
        .ilike('username', username)
      
      if (checkError) throw checkError

      if (existing.length > 0) {
        // Update existing
        const { error } = await supabase
          .from('passwords')
          .update({ 
            encrypted_password: encryptedPassword, 
            updated_at: new Date().toISOString() 
          })
          .eq('id', existing[0].id)
        
        if (error) throw error
        return res.json({ success: true, message: 'Password updated' })
      } else {
        // Create new
        const { error } = await supabase
          .from('passwords')
          .insert([{
            device_id: deviceId,
            website,
            username,
            encrypted_password: encryptedPassword
          }])
        
        if (error) throw error
        return res.json({ success: true, message: 'Password saved' })
      }
    }

    if (action === 'delete') {
      const { error } = await supabase
        .from('passwords')
        .delete()
        .eq('id', passwordId)
        .eq('device_id', deviceId)
      
      if (error) throw error
      return res.json({ success: true })
    }

  } catch (error) {
    console.error('Passwords error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}