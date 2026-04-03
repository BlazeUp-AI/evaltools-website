import { useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";

const FONT_MONO: string = "'JetBrains Mono', 'Fira Code', monospace";interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function Counter({ end, suffix = "", duration = 1800 }: CounterProps) {
  const [val, setVal] = useState<number>(0);
  const [ref, visible] = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start: number = 0;
    const step: number = end / (duration / 16);
    const id: ReturnType<typeof setInterval> = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [visible, end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}