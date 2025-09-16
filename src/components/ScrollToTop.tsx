import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const ScrollToTop = () => {
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollButtons(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let timeoutId: number;

    if (showScrollButtons && !isHovering) {
      timeoutId = setTimeout(() => {
        setShowScrollButtons(false);
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showScrollButtons, isHovering]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleButtonClick = () => {
    setShowScrollButtons(true);
    setIsHovering(false);
  };

  return (
    <>
      {showScrollButtons && (
        <div
          className="fixed right-6 bottom-6 flex flex-col gap-3 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => {
              scrollToTop();
              handleButtonClick();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              scrollToBottom();
              handleButtonClick();
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group"
            title="Scroll to bottom"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
