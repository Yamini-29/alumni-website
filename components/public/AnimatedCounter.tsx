"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 3,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
  if (!isInView) return;

  let start: number | null = null;
  let animationFrame: number;

  // Cubic ease-out
  const easeOutCubic = (t: number) => {
    return 1 - Math.pow(1 - t, 3);
  };

  const animateCounter = (timestamp: number) => {
    if (!start) start = timestamp;

    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / (duration * 1000), 1);

    const eased = easeOutCubic(progress);

    setCount(Math.floor(eased * value));

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animateCounter);
    } else {
      setCount(value);
    }
  };

  animationFrame = requestAnimationFrame(animateCounter);

  return () => cancelAnimationFrame(animationFrame);
}, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}