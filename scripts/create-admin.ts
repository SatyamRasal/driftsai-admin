import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL || 'admin@driftsai.com';
const password = process.env.ADMIN_PASSWORD || 'Admin@drifts#1513#';

if (!url || !serviceKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
}

async function main() {
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const hashed = await bcrypt.hash(password, 12);
  console.log('Admin credential hash generated for local reference:', hashed);
  console.log(`Admin email: ${email}`);
  console.log(`Admin password: ${password}`);
  console.log('Use these in the app login form.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
