import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase-admin';
import { validateToken, isAdmin } from '../middleware/auth';

const router = Router();

// Get current user's profile
router.get('/me', validateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching profile:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Update current user's profile
router.put('/me', validateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { full_name, avatar_url } = req.body;
    
    // Validate input
    if (!full_name) {
      return res.status(400).json({ error: 'Full name is required' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ full_name, avatar_url, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error updating profile:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Admin routes

// Get all profiles (admin only)
router.get('/', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching profiles:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get profile by ID (admin only)
router.get('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Profile not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching profile:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Update profile by ID (admin only)
router.put('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { full_name, avatar_url, role } = req.body;
    
    // Validate input
    if (!full_name) {
      return res.status(400).json({ error: 'Full name is required' });
    }
    
    // Validate role
    if (role && !['admin', 'user'].includes(role)) {
      return res.status(400).json({ error: 'Role must be either "admin" or "user"' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ 
        full_name, 
        avatar_url, 
        role,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Profile not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error updating profile:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Delete profile by ID (admin only)
router.delete('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if trying to delete self
    if (id === req.user?.id) {
      return res.status(400).json({ error: 'You cannot delete your own profile' });
    }
    
    const { error } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', id);
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Profile not found' });
      }
      throw error;
    }
    
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting profile:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;