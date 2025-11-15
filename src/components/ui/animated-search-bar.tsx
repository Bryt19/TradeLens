import React, { useState, useEffect, useRef } from "react";
import { Input } from "./input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send } from "lucide-react";

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface AnimatedSearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onResultSelect?: (result: any) => void;
  results?: any[];
  renderResult?: (result: any, index: number) => React.ReactNode;
  className?: string;
  inputClassName?: string;
  debounceDelay?: number;
  showResults?: boolean;
}

export function AnimatedSearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onResultSelect,
  results = [],
  renderResult,
  className = "",
  inputClassName = "",
  debounceDelay = 200,
  showResults = true,
}: AnimatedSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const debouncedValue = useDebounce(value, debounceDelay);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 300);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    if (isFocused) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
  };

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: {
          duration: 0.4,
        },
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  const shouldShowResults = showResults && isFocused && results.length > 0;

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg focus-visible:ring-offset-0 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${inputClassName}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
          <AnimatePresence mode="popLayout">
            {value.length > 0 ? (
              <motion.div
                key="send"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Send className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {shouldShowResults && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-1 border rounded-md shadow-lg overflow-hidden dark:border-gray-800 bg-white dark:bg-black z-50 max-h-60 overflow-y-auto"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.ul>
              {results.map((result, index) => (
                <motion.li
                  key={index}
                  className="px-3 py-2 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-zinc-900 cursor-pointer"
                  variants={item}
                  layout
                  onClick={() => {
                    if (onResultSelect) {
                      onResultSelect(result);
                    }
                    setIsFocused(false);
                  }}
                >
                  {renderResult ? renderResult(result, index) : (
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {typeof result === "string" ? result : JSON.stringify(result)}
                    </span>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

