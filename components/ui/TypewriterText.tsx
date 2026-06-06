'use client';
import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  className?: string;
  loop?: boolean;
  prefix?: string;
}

export default function TypewriterText({
  lines,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  showCursor = true,
  className = '',
  loop = true,
  prefix = '',
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const currentLine = lines[lineIndex];

    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        if (loop || lineIndex < lines.length - 1) {
          setIsDeleting(true);
        }
      }, pauseDuration);
      return () => clearTimeout(timeoutRef.current);
    }

    if (!isDeleting && displayText === currentLine) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setLineIndex((prev) => (prev + 1) % lines.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timeoutRef.current = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentLine.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, isPaused, lineIndex, lines, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return (
    <span className={`font-mono ${className}`}>
      {prefix}{displayText}
      {showCursor && <span className="cursor-blink" />}
    </span>
  );
}
