import crypto from 'crypto';

const email = process.env.ADMIN_EMAIL || 'admin@driftsai.com';
const password = process.env.ADMIN_PASSWORD || 'Admin@drifts#1513#';
const secret = process.env.ADMIN_SESSION_SECRET || crypto.randomBytes(32).toString('hex');

console.log('Admin credentials');
console.log(`Email: ${email}`);
console.log(`Password: ${password}`);
console.log('Session secret (use for ADMIN_SESSION_SECRET):');
console.log(secret);
