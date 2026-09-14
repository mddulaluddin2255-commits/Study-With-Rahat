import React from 'react';
import { AdmissionPost } from '../types';
import { useApp } from '../context/AppContext';
import { GraduationCap, Calendar, Clock, DollarSign, ArrowRight, Bookmark, Share2 } from 'lucide-react';

interface AdmissionCardProps {
  admission: AdmissionPost;
}

export const AdmissionCard: React.FC<AdmissionCardProps> = ({ admission }) => {
  const { navigateToPost, toggleBookmark, isBookmarked, openShareModal } = useApp();
  const bookmarked = isBookmarked(admission.id);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    openShareModal({
      id: admission.id,
      type: 'admission',
      title: admission.title,
      category: admission.category,
      summary: `${admission.institutionName} • ফি: ${admission.fee} • শেষ তারিখ: ${admission.deadline}`
    });
  };

  return (
    <article
      id={`admission-card-${admission.id}`}
      onClick={() => navigateToPost('admission', admission.id)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-rose-300 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer group relative"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200/80">
            {admission.category}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(admission.id);
              }}
              className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
              title="সেভ করুন"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-rose-600 text-rose-600' : 'text-slate-400'}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-1 rounded-lg hover:bg-slate-100 hover:text-rose-600 transition-colors text-slate-400"
              title="শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-rose-700 transition-colors line-clamp-2 mb-1.5 leading-snug">
          {admission.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3 font-semibold">
          <GraduationCap className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span className="truncate">{admission.institutionName}</span>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
          <strong className="text-slate-800">যোগ্যতা:</strong> {admission.eligibility}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-slate-600 mb-3 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
            ফি: {admission.fee}
          </span>
          <span className="flex items-center gap-1 text-rose-700 font-bold">
            <Clock className="w-3.5 h-3.5 text-rose-500" />
            শেষ: {admission.deadline}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs font-bold text-rose-700 pt-1">
          <span>ভর্তি নির্দেশিকা ও আবেদন লিংক</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </article>
  );
};
