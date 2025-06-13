import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase-admin';
import { validateToken, isAdmin } from '../middleware/auth';

const router = Router();

// Get all projects (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    // Support filtering by category and status
    const { category, status, year } = req.query;
    
    let query = supabaseAdmin
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Apply filters if provided
    if (category) {
      query = query.eq('category', category);
    }
    
    if (status) {
      query = query.eq('status', status);
    }
    
    if (year) {
      query = query.eq('year', year);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching projects:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get project by ID (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Project not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching project:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Admin routes

// Create a new project (admin only)
router.post('/', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { title, description, category, status, img_url, year } = req.body;
    
    // Validate input
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([{ 
        title, 
        description, 
        category,
        status: status || 'active',
        img_url,
        year,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return res.status(201).json(data);
  } catch (error: any) {
    console.error('Error creating project:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Update project (admin only)
router.put('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category, status, img_url, year } = req.body;
    
    // Validate input
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('projects')
      .update({ 
        title, 
        description, 
        category,
        status,
        img_url,
        year,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Project not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error updating project:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Delete project (admin only)
router.delete('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id);
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Project not found' });
      }
      throw error;
    }
    
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting project:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;