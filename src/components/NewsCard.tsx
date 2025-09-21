import { ExternalLink, Calendar, User } from "lucide-react";
import { NewsArticle } from "../types";
import {
  formatDateTime,
  getRelativeTime,
  truncateText,
} from "../utils/helpers";

interface NewsCardProps {
  article: NewsArticle;
  className?: string;
}

const NewsCard = ({ article, className = "" }: NewsCardProps) => {
  const handleClick = () => {
    window.open(article.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden ${className}`}
      onClick={handleClick}
    >
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
      <div className="p-3 sm:p-4">
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
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-tight">
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {truncateText(article.description, 120)}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
            {formatDateTime(article.publishedAt)}
          </span>
          <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium">
            <span>Read more</span>
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
