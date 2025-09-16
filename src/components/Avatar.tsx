import React, { useState } from "react";
import { User } from "lucide-react";
import { optimizeAvatarUrl } from "../utils/helpers";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fallbackIcon?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "md",
  className = "",
  fallbackIcon,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Optimize the avatar URL for better loading
  const optimizedSrc = optimizeAvatarUrl(src);

  // If no src or image failed to load, show fallback
  if (!optimizedSrc || imageError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-blue-600 flex items-center justify-center ${className}`}
      >
        {fallbackIcon || <User className={`${iconSizes[size]} text-white`} />}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`${
          sizeClasses[size]
        } rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover ${
          imageLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-200`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
};

export default Avatar;
