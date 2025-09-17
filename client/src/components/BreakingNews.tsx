import { useEffect, useState } from "react";

interface BreakingNewsProps {
  news: string[];
}

export default function BreakingNews({ news }: BreakingNewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (news.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  if (news.length === 0) return null;

  return (
    <div className="bg-time-red text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="breaking-news-ticker whitespace-nowrap">
          {news.map((item, index) => (
            <span 
              key={index}
              className={`inline-block font-semibold text-sm transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
