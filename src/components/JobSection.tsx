import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { JobCard } from './JobCard';
import { Search, Briefcase, Filter } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const JobSection: React.FC = () => {
  const { jobs, jobCategories } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      if (!j.isPublished) return false;
      const matchesCat = selectedCategory === 'All' || j.jobType === selectedCategory;
      const matchesSearch = !searchTerm || 
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.orgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [jobs, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider mb-2">
          <Briefcase className="w-4 h-4" />
          <span>নিয়োগ বিজ্ঞপ্তি ও ক্যারিয়ার পোর্টাল</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans mb-3">
          চাকরির খবর (Job Circulars in Bangladesh)
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          সরকারি চাকরি, ব্যাংক জব, প্রাথমিক শিক্ষক নিয়োগ, বিসিএস, এনজিও, পুলিশ ও ডিফেন্স সহ বাংলাদেশের সকল নির্ভরযোগ্য চাকরির সার্কুলার ও অনলাইন আবেদনের লিংক।
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="পদবী বা প্রতিষ্ঠানের নাম খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            মোট <strong className="text-emerald-700">{filteredJobs.length}</strong> টি সার্কুলার সক্রিয় রয়েছে
          </div>
        </div>

        {/* Job Category Pills */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
            <Filter className="w-3.5 h-3.5" />
            <span>চাকরির ধরন নির্বাচন করুন:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {jobCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'All' ? 'সবগুলো চাকরি' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AdBanner placementId="home_middle" className="mb-6" />

      {/* Job Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">কোনো সার্কুলার পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 mt-1">অন্য কোনো ক্যাটাগরি বেছে নিন অথবা সার্চ মুছুন</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
          >
            সব চাকরি দেখুন
          </button>
        </div>
      )}
    </div>
  );
};
