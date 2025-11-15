import { useState } from "react";
import { ExternalLink, Calendar, User } from "lucide-react";
import { NewsArticle } from "../types";
import {
  formatDateTime,
  getRelativeTime,
  truncateText,
} from "../utils/helpers";
import { cn } from "../lib/utils";

interface NewsCardProps {
  article: NewsArticle;
  className?: string;
}

const NewsCard = ({ article, className = "" }: NewsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(article.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={cn(
        "relative group bg-white dark:bg-gray-900 rounded-lg cursor-pointer overflow-hidden transition-all duration-300 ease-in-out",
        isHovered
          ? "border-2 border-blue-600 shadow-lg shadow-blue-600/20 bg-blue-50/50 dark:bg-blue-900/10"
          : "border border-gray-200 dark:border-gray-700 shadow-md hover:border-blue-600/50",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner brackets that appear on hover */}
      {isHovered && (
        <>
          <div className="absolute top-3 left-3 w-6 h-6 z-10">
            <div className="absolute top-0 left-0 w-4 h-0.5 bg-blue-600" />
            <div className="absolute top-0 left-0 w-0.5 h-4 bg-blue-600" />
          </div>
          <div className="absolute bottom-3 right-3 w-6 h-6 z-10">
            <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-blue-600" />
            <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-blue-600" />
          </div>
        </>
      )}
      {/* Image */}
      {article.urlToImage && (
        <div className="relative h-40 sm:h-48 w-full overflow-hidden">
          <img
            src={article.urlToImage}
            alt={`News article image: ${article.title}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-3 sm:p-4 relative">
        {/* Source and Date */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 min-w-0 flex-1">
            <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{article.source.name}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">
              {getRelativeTime(article.publishedAt)}
            </span>
            <span className="sm:hidden">
              {getRelativeTime(article.publishedAt).split(" ")[0]}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-base sm:text-lg font-semibold mb-2 line-clamp-2 transition-colors duration-300 leading-tight",
            isHovered
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-900 dark:text-white"
          )}
        >
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p
            className={cn(
              "text-xs sm:text-sm mb-3 line-clamp-2 sm:line-clamp-3 leading-relaxed transition-colors duration-300",
              isHovered
                ? "text-gray-700 dark:text-gray-200"
                : "text-gray-600 dark:text-gray-300"
            )}
          >
            {truncateText(article.description, 120)}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
            {formatDateTime(article.publishedAt)}
          </span>
          <div
            className={cn(
              "flex items-center space-x-1 text-xs sm:text-sm font-medium transition-opacity duration-300",
              isHovered
                ? "text-blue-600 dark:text-blue-400 opacity-100"
                : "text-blue-600 dark:text-blue-400 opacity-70"
            )}
          >
            <span>Read more</span>
            <ExternalLink
              className={cn(
                "w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300",
                isHovered ? "translate-x-1" : ""
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
