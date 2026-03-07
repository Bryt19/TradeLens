"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}: {
  value: number | string;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  
  const parseValue = (val: string | number) => {
    if (typeof val === "number") return { number: val, suffix: "" };
    const match = val.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return { number: 0, suffix: val };
    return { number: parseFloat(match[1]), suffix: match[2] };
  };

  const { number: targetNumber, suffix } = parseValue(value);

  const motionValue = useMotionValue(direction === "down" ? targetNumber : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : targetNumber);
      }, delay * 1000);
  }, [motionValue, isInView, delay, targetNumber, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = 
            Intl.NumberFormat("en-US").format(Number(latest.toFixed(0))) + suffix;
        }
      }),
    [springValue, suffix],
  );

  return <span className={className} ref={ref} />;
}
