# Anant Suthar - Cybersecurity Portfolio

**Live Website:** [https://anant-portfolio-mauve.vercel.app/](https://anant-portfolio-mauve.vercel.app/)

A dynamic, terminal-themed personal portfolio built for Anant Suthar, showcasing cybersecurity projects, hackathon achievements, certifications, and experience.

**Live**: [Deploy to Vercel](#deployment)  
**Stack**: Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Supabase

---

## Features

- 🖥️ **Hacker/Terminal aesthetic** — dark background, green/cyan accents, JetBrains Mono, glitch animations
- ⚡ **Fully dynamic** — all content served from Supabase; no hardcoded data
- 🐙 **GitHub API** — live stars, forks, and push dates on project cards (ISR cached 1hr)
- 📊 **Visitor analytics** — anonymous tracking with admin dashboard at `/admin`
- 📬 **Contact form** — saves to Supabase + email via Resend
- 🔒 **Admin panel** — password-protected analytics at `/admin`
- 🌐 **SEO optimized** — Open Graph, meta description, semantic HTML

---

## Sections

| Section | Data Source |
|---------|------------|
| Hero | Supabase `config` table |
| About | Static (hardcoded bespoke content) |
| Skills | Supabase `skills` table |
| Projects | Supabase `projects` + GitHub API |
| Experience | Supabase `experience` table |
| Hackathons | Supabase `hackathons` table |
| CTFs | Supabase `ctfs` table |
| Certifications | Supabase `certifications` table |
| Activities | Supabase `activities` table |
| Contact | Supabase `contacts` table |
| Analytics | Supabase `page_views` table |

---

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/anant720/portfolio
cd portfolio
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Fill in your values in `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key (server-only) |
| `GITHUB_TOKEN` | Recommended | GitHub PAT for higher API rate limits |
| `ADMIN_SECRET` | ✅ | Password for `/admin` dashboard |
| `RESEND_API_KEY` | Optional | Resend API key for email notifications |
| `NOTIFY_EMAIL` | Optional | Email to receive contact form submissions |

### 3. Database Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
2. Run `supabase/schema.sql` — creates all 10 tables with RLS policies
3. Run `supabase/seed.sql` — populates all tables with real data

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com/new)
3. Add all environment variables in Vercel dashboard
4. Deploy — Vercel Analytics is automatically enabled

```bash
# Or use Vercel CLI
npx vercel deploy --prod
```

### Admin Dashboard

Access at `/admin` — enter your `ADMIN_SECRET` to view:
- Total views & unique sessions
- Views per day chart (last 30 days)
- Top referrers
- Country breakdown
- Device breakdown

---

## Resume

Replace `public/resume.pdf` with your actual resume PDF. The download button links to `/resume.pdf`.

---

## Updating Content

All content is managed through Supabase. Use the Supabase dashboard or Table Editor:

- **Add a new skill**: Insert into `skills` table
- **Add a project**: Insert into `projects` table, then the GitHub API auto-populates stars/forks
- **Add a certification**: Insert into `certifications` table
- **Update quick stats**: Update the `config` table keys

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework with ISR |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Supabase | Database + storage |
| Vercel Analytics | Page view tracking |
| GitHub REST API | Live repo data |
| Resend | Contact email notifications |

---

## License

MIT — open source. Attribution appreciated but not required.

---

Built with ☕ and too many CTF challenges by [Anant Suthar](https://github.com/anant720)
