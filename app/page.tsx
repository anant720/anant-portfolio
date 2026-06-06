import { supabase } from '@/lib/supabase';
import { fetchGitHubRepo } from '@/lib/github';
import { QuickStats, Skill, Project, Experience, Hackathon, CTF, Certification, Activity } from '@/lib/types';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import ExperienceSection from '@/components/sections/Experience';
import Hackathons from '@/components/sections/Hackathons';
import CTFs from '@/components/sections/CTFs';
import Certifications from '@/components/sections/Certifications';
import Activities from '@/components/sections/Activities';
import Contact from '@/components/sections/Contact';
import PageViewTracker from '@/components/Analytics';

export const revalidate = 3600; // ISR: refresh every hour
export const dynamic = 'force-dynamic'; // Don't statically generate — requires env vars

async function getConfig(): Promise<QuickStats> {
  const { data } = await supabase.from('config').select('key, value');
  const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  return {
    jee_percentile: map['jee_percentile'] ?? '96.4',
    ctfs_competed:  map['ctfs_competed']  ?? '3',
    hackathons_won: map['hackathons_won'] ?? '1',
    projects_built: map['projects_built'] ?? '5',
    resume_url:     map['resume_url']     ?? '/resume.pdf',
  };
}

async function getSkills(): Promise<Skill[]> {
  const { data } = await supabase
    .from('skills')
    .select('*')
    .order('category')
    .order('proficiency_level', { ascending: false });
  return (data ?? []) as Skill[];
}

async function getProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('display_order');

  const projects = (data ?? []) as Project[];

  // Enrich with GitHub API data in parallel
  const enriched = await Promise.all(
    projects.map(async (p) => {
      const gh = await fetchGitHubRepo(p.github_repo);
      return { ...p, github_data: gh ?? undefined };
    })
  );

  return enriched;
}

async function getExperience(): Promise<Experience[]> {
  const { data } = await supabase
    .from('experience')
    .select('*')
    .order('display_order');
  return (data ?? []) as Experience[];
}

async function getHackathons(): Promise<Hackathon[]> {
  const { data } = await supabase
    .from('hackathons')
    .select('*')
    .order('display_order');
  return (data ?? []) as Hackathon[];
}

async function getCTFs(): Promise<CTF[]> {
  const { data } = await supabase
    .from('ctfs')
    .select('*')
    .order('display_order');
  return (data ?? []) as CTF[];
}

async function getCertifications(): Promise<Certification[]> {
  const { data } = await supabase
    .from('certifications')
    .select('*')
    .order('display_order');
  return (data ?? []) as Certification[];
}

async function getActivities(): Promise<Activity[]> {
  const { data } = await supabase
    .from('activities')
    .select('*')
    .order('display_order');
  return (data ?? []) as Activity[];
}

export default async function Home() {
  const [stats, skills, projects, experience, hackathons, ctfs, certifications, activities] =
    await Promise.all([
      getConfig(),
      getSkills(),
      getProjects(),
      getExperience(),
      getHackathons(),
      getCTFs(),
      getCertifications(),
      getActivities(),
    ]);

  return (
    <>
      <PageViewTracker />
      <Hero stats={stats} />
      <About />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <ExperienceSection experience={experience} />
      <Hackathons hackathons={hackathons} />
      <CTFs ctfs={ctfs} />
      <Certifications certifications={certifications} />
      <Activities activities={activities} />
      <Contact />
    </>
  );
}
