import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SuggestionCard } from './SuggestionCard';
import { Sparkles, Search, Filter, BookOpen } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const SuggestionSection: React.FC = () => {
  const { suggestions, classes, subjects } = useApp();
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const suggestionClasses = ['All', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'SSC', 'Class 11', 'Class 12', 'HSC', 'Polytechnic'];

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter(s => {
      if (!s.isPublished) return false;
      const matchesClass = selectedClass === 'All' || s.classCategory === selectedClass;
      const matchesSub = selectedSubject === 'All' || s.subject.toLowerCase().includes(selectedSubject.toLowerCase());
      const matchesSearch = !searchTerm ||
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesClass && matchesSub && matchesSearch;
    });
  }, [suggestions, selectedClass, selectedSubject, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-900 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xs">
        <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>১০০% কমন উপযোগী বোর্ড সাজেশন</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans mb-3">
          ক্লাস ভিত্তিক সাজেশন (Exam Suggestions ২০২৬)
        </h1>
        <p className="text-xs sm:text-sm text-teal-100 max-w-2xl leading-relaxed">
          ৬ষ্ঠ শ্রেণি থেকে এইচএসসি ও পলিটেকনিক পর্যন্ত সকল বিষয়ের চূড়ান্ত সৃজনশীল (CQ), বহুনির্বাচনী (MCQ) ও গুরুত্বপূর্ণ প্রশ্নের ফ্রি PDF হ্যান্ডনোট।
        </p>
      </div>

      {/* Filter and Category Pills */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="বিষয় বা সাজেশনের নাম খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            মোট <strong className="text-teal-700">{filteredSuggestions.length}</strong> টি সাজেশন রয়েছে
          </div>
        </div>

        {/* Class Filter */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
            <Filter className="w-3.5 h-3.5" />
            <span>শ্রেণি নির্বাচন করুন:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {suggestionClasses.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedClass === cls
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cls === 'All' ? 'সব শ্রেণি' : cls}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Filter inside Class */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>নির্দিষ্ট বিষয় নির্বাচন করুন (Subject):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['All', ...subjects.slice(0, 8)].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {sub === 'All' ? 'সকল বিষয়' : sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AdBanner placementId="home_middle" className="mb-6" />

      {/* Suggestion Grid */}
      {filteredSuggestions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSuggestions.map((sug) => (
            <SuggestionCard key={sug.id} suggestion={sug} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">কোনো সাজেশন পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 mt-1">অন্য শ্রেণি বা বিষয় সিলেক্ট করুন</p>
        </div>
      )}
    </div>
  );
};
