"use client";

import { useEffect, useState } from "react";

const ACCENT = "#F4F4E1";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  /** Number of characters for the first word to render in accent color */
  accentPrefixLength?: number;
}

export function TypewriterText({ text, speed = 60, className = "", accentPrefixLength }: TypewriterTextProps) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplay("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplay(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  const prefixLen = accentPrefixLength ?? 0;
  const prefix = prefixLen > 0 ? display.slice(0, prefixLen) : "";
  const rest = prefixLen > 0 ? display.slice(prefixLen) : display;

  return (
    <span className={className}>
      {prefixLen > 0 && prefix && <span style={{ color: ACCENT }}>{prefix}</span>}
      {rest}
      {!done && <span className="animate-pulse" style={{ opacity: 0.7 }}>|</span>}
    </span>
  );
}
