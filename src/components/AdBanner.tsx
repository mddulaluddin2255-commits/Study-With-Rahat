import React from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdBannerProps {
  placementId: 'header' | 'home_middle' | 'sidebar' | 'article_top' | 'article_bottom' | 'footer';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placementId, className = '' }) => {
  const { ads, navigateTo } = useApp();
  const ad = ads.find(a => a.id === placementId);

  if (!ad || !ad.isEnabled) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    if (ad.targetUrl.startsWith('#courses')) {
      e.preventDefault();
      navigateTo('courses');
    } else if (ad.targetUrl.startsWith('#suggestions')) {
      e.preventDefault();
      navigateTo('suggestions');
    } else if (ad.targetUrl.startsWith('#jobs')) {
      e.preventDefault();
      navigateTo('jobs');
    } else if (ad.targetUrl.startsWith('http')) {
      window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      id={`ad-placement-${placementId}`}
      className={`relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50/70 to-blue-50/80 p-3.5 transition-all hover:border-blue-300 shadow-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="shrink-0 rounded-md bg-blue-600/90 px-2 py-0.5 text-[11px] font-semibold text-white tracking-wider uppercase">
            বিজ্ঞাপন
          </span>
          <p className="text-sm font-medium text-slate-800 line-clamp-2">
            {ad.adText}
          </p>
        </div>

        <button
          onClick={handleClick}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>বিস্তারিত দেখুন</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
