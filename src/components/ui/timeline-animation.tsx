"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "../../lib/utils";

interface TimelineContentProps {
  children: ReactNode;
  animationNum: number;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  customVariants?: Variants;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  customVariants,
  className = "",
  as = "div",
}: TimelineContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    root: timelineRef,
    margin: "-100px",
    once: true,
  });

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: animationNum * 0.1,
      },
    },
  };

  const variants = customVariants || defaultVariants;

  if (as === "div") {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        className={cn(className)}
      >
        {children}
      </motion.div>
    );
  }

  if (as === "p") {
    return (
      <motion.p
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        className={cn(className)}
      >
        {children}
      </motion.p>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
