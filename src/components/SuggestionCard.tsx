import React from 'react';
import { SuggestionPost } from '../types';
import { useApp } from '../context/AppContext';
import { Sparkles, BookOpen, Download, ArrowRight, Bookmark, HelpCircle, CheckSquare } from 'lucide-react';

interface SuggestionCardProps {
  suggestion: SuggestionPost;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => {
  const { navigateToPost, toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(suggestion.id);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`"${suggestion.title}" সাজেশনটির পিডিএফ ডাউনলোড শুরু হচ্ছে...`);
  };

  return (
    <article
      id={`suggestion-card-${suggestion.id}`}
      onClick={() => navigateToPost('suggestion', suggestion.id)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-teal-400 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer group relative"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200/80">
              {suggestion.classCategory}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
              {suggestion.subject}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(suggestion.id);
            }}
            className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-teal-600 text-teal-600' : 'text-slate-400'}`} />
          </button>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 mb-2 leading-snug">
          {suggestion.title}
        </h3>

        {/* Highlights */}
        <div className="space-y-1.5 mb-4 bg-teal-50/50 p-3 rounded-xl border border-teal-100 text-xs text-slate-700">
          <div className="flex items-center gap-1.5 font-medium text-teal-900">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate">গুরুত্বপূর্ণ সৃজনশীল ও MCQ প্রশ্ন অন্তর্ভুক্ত</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <CheckSquare className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>১০০% কমন উপযোগী বোর্ড স্ট্যান্ডার্ড নোটস</span>
          </div>
        </div>
      </div>

      <div>
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg font-bold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF ডাউনলোড ({suggestion.downloadCount})</span>
          </button>

          <span className="inline-flex items-center gap-1 font-semibold text-teal-700 group-hover:translate-x-0.5 transition-transform">
            <span>সাজেশন দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
