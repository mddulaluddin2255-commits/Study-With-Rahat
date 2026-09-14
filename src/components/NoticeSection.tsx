import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { NoticeCard } from './NoticeCard';
import { Search, Filter, AlertCircle, Bell } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const NoticeSection: React.FC = () => {
  const { notices, classes } = useApp();
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [onlyImportant, setOnlyImportant] = useState<boolean>(false);

  const filteredNotices = useMemo(() => {
    return notices.filter(n => {
      if (!n.isPublished) return false;
      const matchesClass = selectedClass === 'All' || n.classCategory === selectedClass;
      const matchesSearch = !searchTerm || 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesImportant = !onlyImportant || n.isImportant;
      return matchesClass && matchesSearch && matchesImportant;
    });
  }, [notices, selectedClass, searchTerm, onlyImportant]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xs">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
          <Bell className="w-4 h-4" />
          <span>শিক্ষা ও পরীক্ষা বোর্ড বিজ্ঞপ্তি</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans mb-3">
          ক্লাস ভিত্তিক নোটিশ (Class Notices)
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
          ৬ষ্ঠ শ্রেণি থেকে শুরু করে এসএসসি, এইচএসসি, পলিটেকনিক ও বিশ্ববিদ্যালয়ের সকল পরীক্ষা, ফরম পূরণ, রেজিস্ট্রেশন ও অ্যাকাডেমিক ছুটির অফিশিয়াল নোটিশ সবার আগে পান।
        </p>
      </div>

      {/* Filter Bar & Search */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="নোটিশের শিরোনাম বা বিষয় খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Important toggle */}
          <button
            onClick={() => setOnlyImportant(!onlyImportant)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              onlyImportant
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>শুধু জরুরি নোটিশ ({notices.filter(n => n.isImportant).length})</span>
          </button>
        </div>

        {/* Class Filter Badges */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
            <Filter className="w-3.5 h-3.5" />
            <span>শ্রেণি বা ক্যাটাগরি নির্বাচন করুন:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedClass === cls
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cls === 'All' ? 'সবগুলো শ্রেণি' : cls}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AdBanner placementId="home_middle" className="mb-6" />

      {/* Notice Cards Grid */}
      {filteredNotices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">কোনো নোটিশ পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 mt-1">অন্য কোনো শ্রেণি নির্বাচন করুন অথবা সার্চ ক্লিয়ার করুন</p>
          <button
            onClick={() => {
              setSelectedClass('All');
              setSearchTerm('');
              setOnlyImportant(false);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
          >
            সব নোটিশ দেখুন
          </button>
        </div>
      )}
    </div>
  );
};
