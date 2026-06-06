import SectionWrapper from '@/components/ui/SectionWrapper';
import CTFCard from '@/components/ui/CTFCard';
import { CTF } from '@/lib/types';

interface CTFsProps {
  ctfs: CTF[];
}

export default function CTFs({ ctfs }: CTFsProps) {
  return (
    <SectionWrapper id="ctfs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title">CTF Competitions</div>
        <div className="section-line" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ctfs.map((c, i) => (
            <CTFCard key={c.id} item={c} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
