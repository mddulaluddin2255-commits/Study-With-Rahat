import React from 'react';
import { useApp } from '../context/AppContext';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { NoticeCard } from './NoticeCard';
import { JobCard } from './JobCard';
import { ResultCard } from './ResultCard';
import { CourseCard } from './CourseCard';
import { AdmissionCard } from './AdmissionCard';
import { SuggestionCard } from './SuggestionCard';

export const BookmarksView: React.FC = () => {
  const {
    bookmarks,
    toggleBookmark,
    notices,
    jobs,
    results,
    courses,
    admissions,
    suggestions,
    navigateTo
  } = useApp();

  const savedNotices = notices.filter(n => bookmarks.includes(n.id));
  const savedJobs = jobs.filter(j => bookmarks.includes(j.id));
  const savedResults = results.filter(r => bookmarks.includes(r.id));
  const savedCourses = courses.filter(c => bookmarks.includes(c.id));
  const savedAdmissions = admissions.filter(a => bookmarks.includes(a.id));
  const savedSuggestions = suggestions.filter(s => bookmarks.includes(s.id));

  const totalSaved = bookmarks.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
            <Bookmark className="w-4 h-4 fill-amber-300" />
            <span>শিক্ষার্থীর ব্যক্তিগত বুকমার্ক</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-sans mb-2">
            সংরক্ষিত পোস্টসমূহ (Saved Bookmarks)
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            আপনার পরবর্তীতে পড়ার জন্য সংরক্ষিত জরুরি নোটিশ, চাকরির সার্কুলার ও সাজেশন এক নজরে দেখুন।
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-center">
          <span className="text-2xl font-black text-amber-300 block">{totalSaved}</span>
          <span className="text-[11px] text-blue-100">টি আইটেম সংরক্ষিত</span>
        </div>
      </div>

      {totalSaved === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">এখনো কোনো পোস্ট সেভ করা হয়নি</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            যেকোনো নোটিশ, চাকরির খবর বা সাজেশনের কার্ডে থাকা বুকমার্ক আইকনে ক্লিক করে সহজেই এখানে সেভ করে রাখতে পারেন।
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            হোমপেজে পোস্ট দেখুন
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Saved Notices */}
          {savedNotices.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                সংরক্ষিত নোটিশ ({savedNotices.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedNotices.map(n => (
                  <NoticeCard key={n.id} notice={n} />
                ))}
              </div>
            </div>
          )}

          {/* Saved Jobs */}
          {savedJobs.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                সংরক্ষিত চাকরির সার্কুলার ({savedJobs.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedJobs.map(j => (
                  <JobCard key={j.id} job={j} />
                ))}
              </div>
            </div>
          )}

          {/* Saved Results */}
          {savedResults.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                সংরক্ষিত রেজাল্ট ({savedResults.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedResults.map(r => (
                  <ResultCard key={r.id} result={r} />
                ))}
              </div>
            </div>
          )}

          {/* Saved Courses */}
          {savedCourses.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                সংরক্ষিত কোর্স ({savedCourses.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedCourses.map(c => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </div>
          )}

          {/* Saved Suggestions */}
          {savedSuggestions.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                সংরক্ষিত সাজেশন ({savedSuggestions.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedSuggestions.map(s => (
                  <SuggestionCard key={s.id} suggestion={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
