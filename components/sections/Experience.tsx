import SectionWrapper from '@/components/ui/SectionWrapper';
import TimelineEntry from '@/components/ui/TimelineEntry';
import { Experience as ExperienceType } from '@/lib/types';

interface ExperienceProps {
  experience: ExperienceType[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <SectionWrapper id="experience">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title">Experience</div>
        <div className="section-line" />

        <div className="pl-2">
          {experience.map((item, i) => (
            <TimelineEntry key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
