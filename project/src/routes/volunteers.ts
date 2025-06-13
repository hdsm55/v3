import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase-admin';
import { validateToken, isAdmin, optionalToken } from '../middleware/auth';

const router = Router();

// Submit volunteer application (public)
router.post('/', optionalToken, async (req: Request, res: Response) => {
  try {
    const { name, email, phone, resume_url } = req.body;
    const userId = req.user?.id; // Optional - authenticated users will have their ID linked
    
    // Validate input
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('volunteers')
      .insert([{ 
        profile_id: userId || null,
        name,
        email,
        phone,
        resume_url,
        status: 'pending',
        applied_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    return res.status(201).json(data);
  } catch (error: any) {
    console.error('Error submitting volunteer application:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get user's volunteer applications
router.get('/me', validateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('volunteers')
      .select('*')
      .eq('profile_id', userId)
      .order('applied_at', { ascending: false });
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching volunteer applications:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Admin routes

// Get all volunteer applications (admin only)
router.get('/', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    // Support filtering by status
    const { status } = req.query;
    
    let query = supabaseAdmin
      .from('volunteers')
      .select('*')
      .order('applied_at', { ascending: false });
    
    // Apply filter if provided
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query;
      
    if (error) throw error;
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching volunteer applications:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Get volunteer application by ID (admin only)
router.get('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabaseAdmin
      .from('volunteers')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Volunteer application not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching volunteer application:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Update volunteer application status (admin only)
router.patch('/:id/status', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        error: 'Status must be one of: pending, approved, rejected' 
      });
    }
    
    const { data, error } = await supabaseAdmin
      .from('volunteers')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Volunteer application not found' });
      }
      throw error;
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error updating volunteer application:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Delete volunteer application (admin only)
router.delete('/:id', validateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabaseAdmin
      .from('volunteers')
      .delete()
      .eq('id', id);
      
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Volunteer application not found' });
      }
      throw error;
    }
    
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting volunteer application:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;