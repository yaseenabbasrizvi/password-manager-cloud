import { createClient } from '@supabase/supabase-js'

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

  const { action, deviceId, website, username, encryptedPassword, passwordId } = req.body

  console.log('Passwords API called:', { action, deviceId, website, username })

  try {
    if (action === 'load') {
      const { data, error } = await supabase
        .from('passwords')
        .select('*')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Load error:', error)
        throw error
      }
      
      console.log('Load successful:', data?.length, 'passwords')
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
      
      if (checkError) {
        console.error('Check existing error:', checkError)
        throw checkError
      }

      console.log('Existing check result:', existing)

      if (existing && existing.length > 0) {
        // Update existing
        const { data, error } = await supabase
          .from('passwords')
          .update({ 
            encrypted_password: encryptedPassword, 
            updated_at: new Date().toISOString() 
          })
          .eq('id', existing[0].id)
          .select()
        
        if (error) {
          console.error('Update error:', error)
          throw error
        }
        
        console.log('Update successful:', data)
        return res.json({ success: true, message: 'Password updated' })
      } else {
        // Create new
        const { data, error } = await supabase
          .from('passwords')
          .insert([{
            device_id: deviceId,
            website,
            username,
            encrypted_password: encryptedPassword
          }])
          .select()
        
        if (error) {
          console.error('Insert error:', error)
          throw error
        }
        
        console.log('Insert successful:', data)
        return res.json({ success: true, message: 'Password saved' })
      }
    }

    if (action === 'delete') {
      const { data, error } = await supabase
        .from('passwords')
        .delete()
        .eq('id', passwordId)
        .eq('device_id', deviceId)
        .select()
      
      if (error) {
        console.error('Delete error:', error)
        throw error
      }
      
      console.log('Delete successful:', data)
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