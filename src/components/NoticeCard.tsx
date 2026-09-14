import React from 'react';
import { NoticePost } from '../types';
import { useApp } from '../context/AppContext';
import { Calendar, FileText, Share2, Bookmark, ArrowRight, AlertCircle, Eye } from 'lucide-react';

interface NoticeCardProps {
  notice: NoticePost;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice }) => {
  const { navigateToPost, toggleBookmark, isBookmarked, openShareModal } = useApp();
  const bookmarked = isBookmarked(notice.id);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    openShareModal({
      id: notice.id,
      type: 'notice',
      title: notice.title,
      category: notice.classCategory,
      summary: notice.description
    });
  };

  return (
    <article
      id={`notice-card-${notice.id}`}
      onClick={() => navigateToPost('notice', notice.id)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer group relative"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
              {notice.classCategory}
            </span>

            {notice.isImportant ? (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1 animate-pulse">
                <AlertCircle className="w-3 h-3 text-red-600" />
                জরুরি নোটিশ
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
                সাধারণ
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(notice.id);
              }}
              className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors ${
                bookmarked ? 'text-blue-600 fill-blue-600' : 'text-slate-400 hover:text-blue-600'
              }`}
              title={bookmarked ? 'সংরক্ষিত থেকে সরান' : 'সেভ করুন'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors"
              title="শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
          {notice.title}
        </h3>

        {/* Description snippet */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {notice.description}
        </p>
      </div>

      {/* Footer Meta & Button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {notice.publishedDate}
          </span>
          {notice.attachments && notice.attachments.length > 0 && (
            <span className="flex items-center gap-1 text-blue-600 font-medium bg-blue-50/80 px-1.5 py-0.5 rounded-md">
              <FileText className="w-3 h-3" />
              PDF নোটিশ
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
          <span>বিস্তারিত দেখুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
