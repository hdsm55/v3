// server/routes/api.js
import express from 'express';
import supabaseAdmin from '../lib/supabaseAdminClient.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// === Login via Supabase Auth ===
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({
    success: true,
    token: data.session.access_token,
    user: data.user
  });
});

// === Protected routes ===
router.use('/dashboard/stats', authenticateToken);
router.use('/projects/stats', authenticateToken);
router.use('/analytics', authenticateToken);
router.use('/users', authenticateToken);

// === Dashboard stats ===
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Total users
    const { count: total_users } = await supabaseAdmin
      .from('profiles')
      .select('id', { count: 'exact' })
      .eq('role', 'user');

    // Active projects
    const { count: active_projects } = await supabaseAdmin
      .from('projects')
      .select('id', { count: 'exact' })
      .eq('status', 'active');

    // Total projects
    const { count: total_projects } = await supabaseAdmin
      .from('projects')
      .select('id', { count: 'exact' });

    res.json({
      success: true,
      stats: { total_users, active_projects, total_projects }
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === Projects stats ===
router.get('/projects/stats', async (req, res) => {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from('projects')
      .select('id, title, status, created_at')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, projects });
  } catch (err) {
    console.error('Projects stats error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === Record analytics ===
router.post('/analytics', async (req, res) => {
  try {
    const { metric_type, metric_value, country = 'SA', date } = req.body;
    const entryDate = date || new Date().toISOString().split('T')[0];
    const { error } = await supabaseAdmin
      .from('analytics')
      .upsert({ date: entryDate, metric_type, metric_value, country }, { onConflict: ['date','metric_type'] });
    if (error) throw error;
    res.json({ success: true, message: 'Analytics recorded' });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === List users ===
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role } = req.query;
    const offset = (page - 1) * limit;
    let query = supabaseAdmin.from('profiles').select('id, full_name, role, created_at');
    if (search) query = query.ilike('full_name', `%${search}%`);
    if (role) query = query.eq('role', role);
    const { data: users, count, error } = await query.range(offset, offset + +limit - 1).order('created_at', { ascending: false }).select({ count: 'exact' });
    if (error) throw error;
    res.json({ success: true, users, total: count, page: +page, limit: +limit });
  } catch (err) {
    console.error('Users fetch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
