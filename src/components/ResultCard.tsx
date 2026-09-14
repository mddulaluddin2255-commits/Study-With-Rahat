import React from 'react';
import { ResultPost } from '../types';
import { useApp } from '../context/AppContext';
import { Award, Calendar, ExternalLink, ArrowRight, Bookmark, Building, MessageSquare } from 'lucide-react';

interface ResultCardProps {
  result: ResultPost;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { navigateToPost, toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(result.id);

  return (
    <article
      id={`result-card-${result.id}`}
      onClick={() => navigateToPost('result', result.id)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer group relative"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200/80">
            {result.category}
          </span>

          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
              {result.year}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(result.id);
              }}
              className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-purple-600 text-purple-600' : 'text-slate-400'}`} />
            </button>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 mb-2 leading-snug">
          {result.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3 font-medium">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{result.boardOrUniversity}</span>
        </div>

        {/* Short check instruction pill */}
        {result.smsFormat && (
          <div className="mb-4 p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1 mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
              এসএমএস ফরম্যাট:
            </span>
            <code className="text-[11px] font-mono bg-white px-2 py-1 rounded-md border border-slate-200 block text-purple-900">
              {result.smsFormat}
            </code>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          প্রকাশ: {result.publishedDate}
        </span>

        <span className="inline-flex items-center gap-1 font-semibold text-purple-700 group-hover:translate-x-0.5 transition-transform">
          <span>রেজাল্ট চেক করুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
