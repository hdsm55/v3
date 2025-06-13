import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase-admin';
import { validateToken, isAdmin } from '../middleware/auth';

const router = Router();

// Get all programs (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching programs:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get program by ID (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabaseAdmin
      .from('programs')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Program not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching program:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Admin routes

// Create a new program (admin only)
router.post('/', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { title, description, goal_amount, image_url } = req.body;
    
    // Validate input
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('programs')
      .insert([{ 
        title, 
        description, 
        goal_amount: goal_amount || 0,
        image_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return res.status(201).json(data);
  } catch (error: any) {
    console.error('Error creating program:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Update program (admin only)
router.put('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, goal_amount, image_url } = req.body;
    
    // Validate input
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('programs')
      .update({ 
        title, 
        description, 
        goal_amount: goal_amount || 0,
        image_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Program not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error updating program:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Delete program (admin only)
router.delete('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabaseAdmin
      .from('programs')
      .delete()
      .eq('id', id);
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Program not found' });
      }
      throw error;
    }
    
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting program:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;