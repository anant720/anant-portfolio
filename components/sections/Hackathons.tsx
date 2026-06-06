import SectionWrapper from '@/components/ui/SectionWrapper';
import HackathonCard from '@/components/ui/HackathonCard';
import { Hackathon } from '@/lib/types';

interface HackathonsProps {
  hackathons: Hackathon[];
}

export default function Hackathons({ hackathons }: HackathonsProps) {
  return (
    <SectionWrapper id="hackathons" className="bg-[var(--surface)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title">Hackathons</div>
        <div className="section-line" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hackathons.map((h, i) => (
            <HackathonCard key={h.id} item={h} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
