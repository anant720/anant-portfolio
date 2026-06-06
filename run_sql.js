const { Client } = require('pg');
const fs = require('fs');

async function run() {
  const client = new Client({
    connectionString: 'postgresql://postgres.sxamqxnxbopnonxztwcy:Anant982989@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'
  });

  try {
    console.log('Connecting to Supabase via Session Pooler...');
    await client.connect();

    console.log('Adding description column if it does not exist...');
    try {
      await client.query('ALTER TABLE certifications ADD COLUMN description TEXT;');
    } catch (e) {
      console.log('Column probably exists already:', e.message);
    }
    
    console.log('Reading seed.sql...');
    const seed = fs.readFileSync('supabase/seed.sql', 'utf8');

    console.log('Deleting existing rows to ensure clean seed...');
    await client.query('TRUNCATE TABLE config, skills, projects, experience, hackathons, ctfs, certifications, activities CASCADE;');
    
    console.log('Executing seed.sql...');
    await client.query(seed);
    
    console.log('✅ Successfully seeded the database!');
  } catch (err) {
    console.error('❌ Error executing SQL:', err);
  } finally {
    await client.end();
  }
}

run();
