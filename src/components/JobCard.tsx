import React from 'react';
import { JobPost } from '../types';
import { useApp } from '../context/AppContext';
import { Briefcase, Building2, Users, Calendar, MapPin, Share2, Bookmark, ArrowRight, Clock, Banknote } from 'lucide-react';

interface JobCardProps {
  job: JobPost;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { navigateToPost, toggleBookmark, isBookmarked, openShareModal } = useApp();
  const bookmarked = isBookmarked(job.id);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    openShareModal({
      id: job.id,
      type: 'job',
      title: job.title,
      category: job.jobType,
      summary: `${job.orgName} • পদ: ${job.vacancies} • বেতন: ${job.salary} • শেষ তারিখ: ${job.deadline}`
    });
  };

  return (
    <article
      id={`job-card-${job.id}`}
      onClick={() => navigateToPost('job', job.id)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer group relative"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            {job.jobType}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(job.id);
              }}
              className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors ${
                bookmarked ? 'text-blue-600 fill-blue-600' : 'text-slate-400 hover:text-blue-600'
              }`}
              title="সেভ করুন"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors"
              title="শেয়ার করুন"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Title & Organization */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-1.5 leading-snug">
          {job.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3 font-medium">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{job.orgName}</span>
        </div>

        {/* Job Details Chips */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">পদ: {job.vacancies}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Banknote className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{job.salary.slice(0, 18)}</span>
          </div>

          <div className="flex items-center gap-1.5 col-span-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">লোকেশন: {job.location}</span>
          </div>
        </div>
      </div>

      {/* Prominent Deadline Banner & Read More */}
      <div>
        <div className="mb-3 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200/80 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-amber-900 font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            আবেদনের শেষ তারিখ:
          </span>
          <span className="font-bold text-amber-700">{job.deadline}</span>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
          <span>বিস্তারিত সার্কুলার ও আবেদন</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </article>
  );
};
