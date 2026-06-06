'use client';
interface GlitchTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export default function GlitchText({ text, className = '', tag: Tag = 'h1' }: GlitchTextProps) {
  return (
    <Tag
      className={`glitch-text ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  );
}
