// scripts/seed.ts
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config();


console.log('SUPABASE_URL=', process.env.SUPABASE_URL);
console.log('SERVICE_ROLE=', process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  // 1) إنشاء مستخدمي Auth
  const { data: adminUser, error: adminErr } = await supabase.auth.admin.createUser({
    email: 'admin@test.com',
    password: 'Test@1234',
    email_confirm: true
  });
  if (adminErr) throw adminErr;

  const { data: normalUser, error: userErr } = await supabase.auth.admin.createUser({
    email: 'user@test.com',
    password: 'User@1234',
    email_confirm: true
  });
  if (userErr) throw userErr;

  // 2) إدراجهم في profiles
  const { error: profErr } = await supabase
    .from('profiles')
    .insert([
      { id: adminUser.id, full_name: 'Admin Test', role: 'admin' },
      { id: normalUser.id, full_name: 'User Test', role: 'user' }
    ]);
  if (profErr) throw profErr;

  console.log('🔰 Seed complete:', { admin: adminUser.id, user: normalUser.id });
}

seed().catch(console.error);
