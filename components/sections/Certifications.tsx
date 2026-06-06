import SectionWrapper from '@/components/ui/SectionWrapper';
import CertCard from '@/components/ui/CertCard';
import { Certification } from '@/lib/types';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <SectionWrapper id="certifications" className="bg-[var(--surface)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title">Certifications</div>
        <div className="section-line" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((c, i) => (
            <CertCard key={c.id} item={c} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
