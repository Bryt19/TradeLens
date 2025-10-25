import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2000, 
  className = "" 
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Extract numeric value and suffix from the string
  const parseValue = (val: string) => {
    const match = val.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return { number: 0, suffix: val };
    
    const number = parseFloat(match[1]);
    const suffix = match[2];
    return { number, suffix };
  };

  const { number: targetNumber, suffix } = parseValue(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      // Reset to 0 when not visible
      setDisplayValue('0' + suffix);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentNumber = targetNumber * easeOutCubic;
      
      // Format the number based on its magnitude
      let formattedNumber: string;
      if (targetNumber >= 1000000) {
        formattedNumber = (currentNumber / 1000000).toFixed(1);
        if (formattedNumber.endsWith('.0')) {
          formattedNumber = Math.floor(currentNumber / 1000000).toString();
        }
        setDisplayValue(formattedNumber + 'M' + suffix);
      } else if (targetNumber >= 1000) {
        formattedNumber = (currentNumber / 1000).toFixed(1);
        if (formattedNumber.endsWith('.0')) {
          formattedNumber = Math.floor(currentNumber / 1000).toString();
        }
        setDisplayValue(formattedNumber + 'K' + suffix);
      } else {
        formattedNumber = Math.floor(currentNumber).toString();
        setDisplayValue(formattedNumber + suffix);
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, targetNumber, suffix, duration]);

  return (
    <div ref={elementRef} className={className}>
      {displayValue}
    </div>
  );
};

export default AnimatedCounter;