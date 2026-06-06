-- ============================================================
-- ANANT SUTHAR PORTFOLIO — SEED DATA
-- Run AFTER schema.sql
-- ============================================================

-- ─────────────────────────────────────────────
-- SITE CONFIG
-- ─────────────────────────────────────────────
INSERT INTO config (key, value) VALUES
  ('jee_percentile',   '96.4'),
  ('ctfs_competed',    '3'),
  ('hackathons_won',   '1'),
  ('projects_built',   '18'),
  ('resume_url',       '/resume.pdf'),
  ('visitor_count',    '0'),
  ('github_username',  'anant720'),
  ('linkedin_url',     'https://www.linkedin.com/in/anantsuthar'),
  ('github_url',       'https://github.com/anant720'),
  ('email',            'anantjangid@outlook.com')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- ─────────────────────────────────────────────
-- SKILLS
-- ─────────────────────────────────────────────
INSERT INTO skills (name, category, proficiency_level, used_in) VALUES
  -- Cybersecurity
  ('Kali Linux',    'Cybersecurity', 90, ARRAY['ShadowTrace','PhishNetra']),
  ('Burp Suite',    'Cybersecurity', 85, ARRAY['PhishNetra','CTF Challenges']),
  ('Nmap',          'Cybersecurity', 88, ARRAY['ShadowTrace','CTF Challenges']),
  ('Wireshark',     'Cybersecurity', 80, ARRAY['ShadowTrace','Sentinel']),
  ('Netcat',        'Cybersecurity', 82, ARRAY['CTF Challenges']),
  ('Metasploit',    'Cybersecurity', 75, ARRAY['CTF Challenges']),
  ('OSINT',         'Cybersecurity', 85, ARRAY['PhishNetra','AI Guardian v3.0']),
  ('SSRF',          'Cybersecurity', 88, ARRAY['MIT ADT CTF']),
  ('JWT Attacks',   'Cybersecurity', 85, ARRAY['MIT ADT CTF']),
  ('IDOR',          'Cybersecurity', 87, ARRAY['MIT ADT CTF']),
  ('XXE',           'Cybersecurity', 83, ARRAY['MIT ADT CTF']),
  ('RCE',           'Cybersecurity', 80, ARRAY['MIT ADT CTF']),
  -- Full Stack
  ('React 18',      'Full Stack', 90, ARRAY['Sentinel','AI Guardian v3.0','GriitX']),
  ('Next.js',       'Full Stack', 92, ARRAY['GriitX','Portfolio']),
  ('TypeScript',    'Full Stack', 88, ARRAY['Sentinel','GriitX','Portfolio']),
  ('Node.js',       'Full Stack', 85, ARRAY['Sentinel']),
  ('Fastify',       'Full Stack', 80, ARRAY['Sentinel']),
  ('FastAPI',       'Full Stack', 85, ARRAY['AI Guardian v3.0']),
  ('PostgreSQL',    'Full Stack', 82, ARRAY['Sentinel','AI Guardian v3.0']),
  ('Redis',         'Full Stack', 78, ARRAY['Sentinel','AI Guardian v3.0']),
  ('Docker',        'Full Stack', 80, ARRAY['Sentinel']),
  ('WebSockets',    'Full Stack', 75, ARRAY['Sentinel']),
  -- AI / ML
  ('Groq Llama-3',    'AI / ML', 85, ARRAY['AI Guardian v3.0']),
  ('Google Gemini',   'AI / ML', 82, ARRAY['AI Guardian v3.0']),
  ('ChromaDB',        'AI / ML', 78, ARRAY['AI Guardian v3.0']),
  ('RAG',             'AI / ML', 80, ARRAY['AI Guardian v3.0']),
  ('XGBoost',         'AI / ML', 72, ARRAY['AI Guardian v3.0']),
  ('Isolation Forest','AI / ML', 70, ARRAY['AI Guardian v3.0']),
  -- Cloud & DevOps
  ('AWS',             'Cloud & DevOps', 75, ARRAY['Sentinel']),
  ('Supabase',        'Cloud & DevOps', 88, ARRAY['Sentinel','Portfolio']),
  ('Vercel',          'Cloud & DevOps', 85, ARRAY['GriitX','Portfolio']),
  ('GitHub Actions',  'Cloud & DevOps', 80, ARRAY['Sentinel']),
  ('Upstash Redis',   'Cloud & DevOps', 78, ARRAY['Sentinel']),
  ('BullMQ',          'Cloud & DevOps', 75, ARRAY['Sentinel']),
  -- Languages
  ('Python',      'Languages', 90, ARRAY['AI Guardian v3.0','PhishNetra','ShadowTrace']),
  ('JavaScript',  'Languages', 88, ARRAY['Sentinel','GriitX']),
  ('TypeScript',  'Languages', 88, ARRAY['Sentinel','Portfolio','GriitX']),
  ('Java',        'Languages', 72, ARRAY['IBM OOP Certificate']),
  ('SQL',         'Languages', 82, ARRAY['Sentinel','AI Guardian v3.0']);

-- ─────────────────────────────────────────────
-- PROJECTS
-- ─────────────────────────────────────────────
INSERT INTO projects (slug, github_repo, demo_url, featured, hackathon_won, achievement_metric, display_order) VALUES
  ('sentinel',      'Sentinel',     NULL,                       true,  NULL,                   'Multi-tenant SOC dashboard with 9-rule heuristic detection engine', 1),
  ('ai-guardian',   'AI-GUARDIAN',  NULL,                       true,  'IdeaSpark Hackathon 2026', '93% accuracy across 510 test cases, 73% LLM call reduction', 2),
  ('griitx',        'GriitX',       NULL,                       true,  NULL,                   'Full SSR e-commerce with Razorpay/Stripe payment integration',   3),
  ('phishnetra',    'PhishNetra',   NULL,                       false, NULL,                   'Real-time phishing URL detection and analysis',                  4),
  ('shadowtrace',   'ShadowTrace',  NULL,                       false, NULL,                   'Network traffic analysis and threat hunting tool',               5),
  ('gigflow',       'GigFlow',      NULL,                       true,  NULL,                   'Full stack freelance marketplace with Razorpay integration',     6),
  ('peblo-notes',   'Peblo-AI-Notes',NULL,                      true,  NULL,                   'High-performance AI workspace with Google Gemini 2.0',           7),
  ('securepass',    'SecurePass-Analyzer', NULL,                false, NULL,                   'Cybersecurity password strength & breach detection',             8),
  ('rayeva-ai',     'rayeva-ai-backend', NULL,                  false, NULL,                   'AI-powered classification backend with threat detection',        9);

-- ─────────────────────────────────────────────
-- EXPERIENCE
-- ─────────────────────────────────────────────
INSERT INTO experience (role, company, type, start_date, end_date, bullets, repo_url, display_order) VALUES
  (
    'Fundraising Head',
    'Aapka Sahara Foundation',
    'part-time',
    '2026-01-01',
    '2026-02-28',
    ARRAY[
      'Led the fundraising campaigns for the foundation, managing strategies and outreach',
      'Coordinated with teams to execute successful donation drives'
    ],
    '/certs/ASF Fundraising Head LOA_Anant Suthar.pdf',
    0
  ),
  (
    'Full Stack Developer Intern',
    'Cognifyz',
    'internship',
    '2026-05-01',
    NULL,
    ARRAY[
      'Developing and maintaining full-stack web applications using modern web technologies',
      'Implementing secure authentication and optimizing database queries',
      'Collaborating with cross-functional teams to deliver scalable features'
    ],
    '/Cognifyz_Offer_Letter.pdf',
    1
  ),
  (
    'Cybersecurity Analyst Intern',
    'Sumerix Global',
    'internship',
    '2026-06-01',
    NULL,
    ARRAY[
      'Completed cybersecurity training and hands-on internship program at Sumerix',
      'Worked on security assessments, vulnerability analysis, and defensive tooling',
      'Gained practical experience with industry-standard cybersecurity frameworks and tools'
    ],
    '/Sumerix_Internship_Offer_Letter.pdf',
    2
  ),
  (
    'Cybersecurity Analyst Intern',
    'Simulation Program',
    'internship',
    '2025-06-01',
    '2025-08-31',
    ARRAY[
      'Authored comprehensive Threat Intelligence Report covering the 2024–25 global cybersecurity threat landscape',
      'Analyzed APT groups, ransomware trends, and zero-day exploitation patterns across major sectors',
      'Documented MITRE ATT&CK techniques and defensive countermeasures for enterprise environments'
    ],
    'https://github.com/anant720/cybersecurity-internship-tasks',
    3
  ),
  (
    'Freelancer — Full Stack & Cybersecurity',
    'Contra',
    'freelance',
    '2025-01-01',
    NULL,
    ARRAY[
      'Delivered full-stack web applications for clients including REST API design, frontend development, and deployment',
      'Conducted security audits and vulnerability assessments for small business web applications',
      'Maintained 5-star client rating across multiple completed projects'
    ],
    NULL,
    4
  ),
  (
    'AI Evaluator',
    'Outlier',
    'ai-evaluation',
    '2024-09-01',
    '2025-03-31',
    ARRAY[
      'Created high-quality AI evaluation prompts and detailed rubrics for LLM training datasets',
      'Evaluated model outputs for accuracy, safety, and reasoning quality across cybersecurity and programming domains',
      'Contributed to improving RLHF pipelines for leading AI models'
    ],
    NULL,
    5
  );

-- ─────────────────────────────────────────────
-- HACKATHONS
-- ─────────────────────────────────────────────
INSERT INTO hackathons (name, year, outcome, project_name, skills, teammates, mentor, display_order) VALUES
  (
    'IdeaSpark Hackathon 2026',
    2026,
    'Won',
    'AI Guardian v3.0',
    ARRAY['FastAPI','Groq Llama-3','Google Gemini','ChromaDB','RAG','Redis','React 18','PostgreSQL'],
    ARRAY['Meghan Bipin Hiwale','Aarya Santosh Chaudhari','Roopamkumar Awakale'],
    'Dr. Amreen Khan',
    1
  ),
  (
    'AI for Bharat Hackathon',
    2026,
    'Finalist',
    'AI Guardian v3.0',
    ARRAY['FastAPI','AI','Python','Machine Learning'],
    ARRAY[]::TEXT[],
    NULL,
    2
  ),
  (
    'Meta PyTorch + Hugging Face Agentic RL Hackathon',
    2025,
    'Participated',
    'RL Environment for SOC Analyst Workflows',
    ARRAY['PyTorch','Hugging Face','Reinforcement Learning','Python','Gymnasium'],
    ARRAY[]::TEXT[],
    NULL,
    3
  );

-- ─────────────────────────────────────────────
-- CTFs
-- ─────────────────────────────────────────────
INSERT INTO ctfs (event_name, year, role, notable, skills_used, display_order) VALUES
  (
    'CTF Time by MIT CBC',
    2025,
    'Player',
    ARRAY[
      'Achieved AIR 23 in the nationwide CTF Time competition organized by MIT CBC',
      'Demonstrated advanced penetration testing, reverse engineering, and exploit development skills'
    ],
    ARRAY['Web Exploitation','Reverse Engineering','Forensics','Cryptography'],
    1
  ),
  (
    'BSidesSF 2026',
    2026,
    'Player',
    ARRAY[
      'Competed in web exploitation and binary challenges',
      'Focused on SSRF, deserialization, and memory corruption categories'
    ],
    ARRAY['Web Exploitation','Binary Exploitation','SSRF','Python'],
    2
  ),
  (
    'DawgCTF',
    2025,
    'Player',
    ARRAY[
      'Competed in web, crypto, and forensics challenge tracks',
      'Solved challenges involving JWT manipulation and SQL injection variants'
    ],
    ARRAY['Web Security','Cryptography','Forensics','JWT','SQLi'],
    3
  );

-- ─────────────────────────────────────────────
-- CERTIFICATIONS
-- ─────────────────────────────────────────────
INSERT INTO certifications (name, issuer, date_earned, credential_url, status, description, display_order) VALUES
  ('Google Cybersecurity Professional Certificate', 'Google / Coursera', '2024-12-01', '/certs/Google CyberSecurity.pdf', 'Completed', 'A cumulative course of 9 certifications focused on cybersecurity research, tools, and best practices.', 1),
  ('Google Cloud Computing Foundations',            'Google / Coursera', '2024-11-01', '/certs/Google Cloud Computing Foundations.png', 'Completed', NULL, 2),
  ('The Bits and Bytes of Computer Networking',     'Google / Coursera', NULL,         '/certs/The Bits and Bytes of Computer Networking.pdf', 'Completed', NULL, 3),
  ('Object-Oriented Programming in Java',           'IBM / Coursera',    '2024-10-01', '/certs/Object Oriented Programing In Java.pdf', 'Completed', NULL, 4),
  ('C++ Programming',                               'IIT Bombay',        NULL,         '/certs/CPP CERTIFICATE IIT BOMBAY.pdf', 'Completed', NULL, 5),
  ('HTML, CSS, and JS for Web Developers',          'Coursera',          NULL,         '/certs/HTML, CSS, and Javascript for Web Developers.pdf', 'Completed', NULL, 6),
  ('Introduction to Web Development',               'Coursera',          NULL,         '/certs/Introduction to web development.pdf', 'Completed', NULL, 7),
  ('TryHackMe SOC Level 1 (SAL1)',                  'TryHackMe',         NULL,         'https://tryhackme.com', 'In Progress', NULL, 8),
  ('CompTIA Security+',                             'CompTIA',           NULL,         NULL, 'Planned', NULL, 9),
  ('Splunk Core Certified User',                    'Splunk',            NULL,         NULL, 'Planned', NULL, 10);

-- ─────────────────────────────────────────────
-- CLUBS & ACTIVITIES
-- ─────────────────────────────────────────────
INSERT INTO activities (title, org, description, year, display_order) VALUES
  (
    'CTF Co-organizer & Challenge Author',
    'MIT ADT University',
    'Co-organized MIT ADT University''s first online CTF event. Authored a 5-stage exploit chain challenge demonstrating advanced web security concepts (SSRF, JWT, IDOR, XXE, RCE). Managed challenge infrastructure and participant communications.',
    2025,
    1
  ),
  (
    'CTF Team Competitor',
    'BSidesSF / DawgCTF',
    'Active CTF competitor on international platforms including BSidesSF 2026 and DawgCTF. Focus areas: web exploitation, binary exploitation, cryptography, and forensics.',
    2026,
    2
  ),
  (
    'Open Source Contributor',
    'GitHub (anant720)',
    'Creator and maintainer of Sentinel — an open-source multi-tenant SOC dashboard. Actively contributing to the cybersecurity open-source community with documented, production-ready tooling.',
    2025,
    3
  );
