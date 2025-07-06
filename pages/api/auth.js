import { supabase } from '../../lib/supabase'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, masterPassword, deviceId } = req.body

  try {
    if (action === 'setup') {
      const hash = await bcrypt.hash(masterPassword, 12)
      const { error } = await supabase
        .from('master_password')
        .insert([{ device_id: deviceId, password_hash: hash }])
      
      if (error) throw error
      return res.json({ success: true })
    }

    if (action === 'login') {
      const { data, error } = await supabase
        .from('master_password')
        .select('password_hash')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false })
        .limit(1)
      
      if (error) throw error
      
      if (data.length === 0) {
        return res.json({ success: false, isFirstTime: true })
      }
      
      const isValid = await bcrypt.compare(masterPassword, data[0].password_hash)
      return res.json({ success: isValid })
    }

    if (action === 'check') {
      const { data, error } = await supabase
        .from('master_password')
        .select('id')
        .eq('device_id', deviceId)
      
      if (error) throw error
      return res.json({ isFirstTime: data.length === 0 })
    }

    if (action === 'reset') {
      await supabase.from('master_password').delete().eq('device_id', deviceId)
      await supabase.from('passwords').delete().eq('device_id', deviceId)
      return res.json({ success: true })
    }

  } catch (error) {
    console.error('Auth error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}