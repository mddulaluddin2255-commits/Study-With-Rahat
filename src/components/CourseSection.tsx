import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CourseCard } from './CourseCard';
import { BookOpen, Search, Filter, Sparkles } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const CourseSection: React.FC = () => {
  const { courses, courseCategories } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      if (!c.isPublished) return false;
      const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch = !searchTerm ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.instructorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = priceFilter === 'all' || (priceFilter === 'free' ? !c.isPaid : c.isPaid);
      return matchesCat && matchesSearch && matchesPrice;
    });
  }, [courses, selectedCategory, priceFilter, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xs">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>স্কিল ও পরীক্ষা প্রস্তুতি কোর্স</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans mb-3">
          অনলাইন কোর্সসমূহ (Courses by Rahat Sir)
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
          এসএসসি, এইচএসসি আইসিটি ও গণিত, বিসিএস ও ব্যাংক ইংরেজি, কম্পিউটার বেসিক ও ফ্রিল্যান্সিং এর মানসম্মত লাইভ ও রেকর্ডেড কোর্স।
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
              placeholder="কোর্স বা শিক্ষকের নাম খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">ফি ফিল্টার:</span>
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setPriceFilter('all')}
                className={`px-3 py-1 rounded-lg cursor-pointer transition-colors ${
                  priceFilter === 'all' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                সব
              </button>
              <button
                onClick={() => setPriceFilter('free')}
                className={`px-3 py-1 rounded-lg cursor-pointer transition-colors ${
                  priceFilter === 'free' ? 'bg-white text-emerald-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                ফ্রি কোর্স
              </button>
              <button
                onClick={() => setPriceFilter('paid')}
                className={`px-3 py-1 rounded-lg cursor-pointer transition-colors ${
                  priceFilter === 'paid' ? 'bg-white text-amber-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                পেইড কোর্স
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
            <Filter className="w-3.5 h-3.5" />
            <span>ক্যাটাগরি নির্বাচন করুন:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {courseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'All' ? 'সব কোর্স' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AdBanner placementId="home_middle" className="mb-6" />

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">কোনো কোর্স পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 mt-1">অন্য ক্যাটাগরি বেছে নিন</p>
        </div>
      )}
    </div>
  );
};
