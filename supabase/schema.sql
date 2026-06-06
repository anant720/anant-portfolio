-- ============================================================
-- ANANT SUTHAR PORTFOLIO — SUPABASE SCHEMA
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- 1. SITE CONFIG
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS config (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- ─────────────────────────────────────────────
-- 2. SKILLS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT NOT NULL,
  category          TEXT NOT NULL,   -- e.g. 'Cybersecurity', 'Full Stack', 'AI / ML'
  proficiency_level INTEGER NOT NULL CHECK (proficiency_level BETWEEN 1 AND 100),
  used_in           TEXT[] DEFAULT '{}'
);

-- ─────────────────────────────────────────────
-- 3. PROJECTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                TEXT UNIQUE NOT NULL,
  github_repo         TEXT NOT NULL,    -- repo name only, e.g. 'Sentinel'
  demo_url            TEXT,
  featured            BOOLEAN DEFAULT false,
  hackathon_won       TEXT,
  achievement_metric  TEXT,
  display_order       INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────────
-- 4. EXPERIENCE
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS experience (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role          TEXT NOT NULL,
  company       TEXT NOT NULL,
  type          TEXT NOT NULL,   -- internship | freelance | part-time | ai-evaluation
  start_date    DATE NOT NULL,
  end_date      DATE,
  bullets       TEXT[] DEFAULT '{}',
  repo_url      TEXT,
  display_order INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────────
-- 5. HACKATHONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hackathons (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  year          INTEGER NOT NULL,
  outcome       TEXT NOT NULL CHECK (outcome IN ('Won','Finalist','Participated')),
  project_name  TEXT NOT NULL,
  skills        TEXT[] DEFAULT '{}',
  teammates     TEXT[] DEFAULT '{}',
  mentor        TEXT,
  display_order INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────────
-- 6. CTFs
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ctfs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name    TEXT NOT NULL,
  year          INTEGER NOT NULL,
  role          TEXT NOT NULL,    -- Player | Organizer | Author | Co-organizer
  notable       TEXT[] DEFAULT '{}',
  skills_used   TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────────
-- 7. CERTIFICATIONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certifications (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           TEXT NOT NULL,
  issuer         TEXT NOT NULL,
  date_earned    DATE,
  credential_url TEXT,
  status         TEXT NOT NULL DEFAULT 'Planned' CHECK (status IN ('Completed','In Progress','Planned')),
  description    TEXT,
  display_order  INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────────
-- 8. CLUBS & ACTIVITIES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activities (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  org           TEXT NOT NULL,
  description   TEXT NOT NULL,
  year          INTEGER NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- ─────────────────────────────────────────────
-- 9. VISITOR ANALYTICS (no personal data stored)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS page_views (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id  TEXT NOT NULL,
  path        TEXT NOT NULL,
  referrer    TEXT,
  country     TEXT,
  device_type TEXT CHECK (device_type IN ('mobile','desktop','tablet')),
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views (session_id);

-- ─────────────────────────────────────────────
-- 10. CONTACT FORM
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read       BOOLEAN DEFAULT false
);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────

-- Config: public read
ALTER TABLE config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read config" ON config FOR SELECT USING (true);

-- Skills: public read
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);

-- Projects: public read
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);

-- Experience: public read
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read experience" ON experience FOR SELECT USING (true);

-- Hackathons: public read
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hackathons" ON hackathons FOR SELECT USING (true);

-- CTFs: public read
ALTER TABLE ctfs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read ctfs" ON ctfs FOR SELECT USING (true);

-- Certifications: public read
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read certifications" ON certifications FOR SELECT USING (true);

-- Activities: public read
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read activities" ON activities FOR SELECT USING (true);

-- Page views: anyone can INSERT (for tracking), only service role reads
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert page_views" ON page_views FOR INSERT WITH CHECK (true);

-- Contacts: anyone can INSERT, only service role reads
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert contacts" ON contacts FOR INSERT WITH CHECK (true);
