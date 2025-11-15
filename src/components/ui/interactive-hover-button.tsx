import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface InteractiveHoverButtonProps {
  text?: string;
  to?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
  as?: "button" | "link";
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, to, href, onClick, as = "link", ...props }, ref) => {
  const baseClasses = cn(
    "group relative w-auto min-w-[140px] cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold inline-flex items-center justify-center",
    className,
  );

  const content = (
    <>
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 whitespace-nowrap">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span className="whitespace-nowrap">{text}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8]"></div>
    </>
  );

  if (as === "link" && (to || href)) {
    if (to) {
      return (
        <Link
          to={to}
          className={baseClasses}
          onClick={onClick}
          {...(props as any)}
        >
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick}
        {...(props as any)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={baseClasses}
      onClick={onClick}
      {...(props as any)}
    >
      {content}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };

