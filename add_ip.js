const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: 'postgresql://postgres.sxamqxnxbopnonxztwcy:Anant982989@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'
  });

  try {
    await client.connect();
    console.log('Adding ip_address column...');
    await client.query('ALTER TABLE page_views ADD COLUMN IF NOT EXISTS ip_address TEXT;');
    console.log('✅ Added ip_address');
  } catch (err) {
    console.error('❌ Error executing SQL:', err);
  } finally {
    await client.end();
  }
}

run();
