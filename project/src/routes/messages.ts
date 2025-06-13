import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase-admin';
import { validateToken, isAdmin, optionalToken } from '../middleware/auth';

const router = Router();

// Create a new message (public)
router.post('/', optionalToken, async (req: Request, res: Response) => {
  try {
    const { type, subject, content, amount } = req.body;
    const userId = req.user?.id; // Optional - authenticated users will have their ID linked
    
    // Validate input
    if (!type || !content) {
      return res.status(400).json({ error: 'Type and content are required' });
    }
    
    // Validate message type
    if (!['contact', 'donation', 'volunteer'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be one of: contact, donation, volunteer' 
      });
    }
    
    const { data, error } = await supabaseAdmin
      .from('messages')
      .insert([{ 
        profile_id: userId || null,
        type,
        subject,
        content,
        amount: amount || 0,
        is_read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return res.status(201).json(data);
  } catch (error: any) {
    console.error('Error creating message:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get user's own messages
router.get('/me', validateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('messages')
      .select('*')
      .eq('profile_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching messages:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Admin routes

// Get all messages (admin only)
router.get('/', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    // Support filtering by type and read status
    const { type, is_read } = req.query;
    
    let query = supabaseAdmin
      .from('messages')
      .select('*, profiles(full_name, avatar_url)')
      .order('created_at', { ascending: false });
    
    // Apply filters if provided
    if (type) {
      query = query.eq('type', type);
    }
    
    if (is_read !== undefined) {
      query = query.eq('is_read', is_read === 'true');
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching messages:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get message by ID (admin only)
router.get('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabaseAdmin
      .from('messages')
      .select('*, profiles(full_name, avatar_url)')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Message not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching message:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Mark message as read (admin only)
router.patch('/:id/read', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabaseAdmin
      .from('messages')
      .update({ 
        is_read: true,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Message not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error updating message:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Delete message (admin only)
router.delete('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabaseAdmin
      .from('messages')
      .delete()
      .eq('id', id);
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Message not found' });
      }
      throw error;
    }
    
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting message:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;