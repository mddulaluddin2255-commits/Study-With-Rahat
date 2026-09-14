import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AdmissionCard } from './AdmissionCard';
import { GraduationCap, Search, Filter } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const AdmissionSection: React.FC = () => {
  const { admissions, admissionCategories } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredAdmissions = useMemo(() => {
    return admissions.filter(a => {
      if (!a.isPublished) return false;
      const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
      const matchesSearch = !searchTerm ||
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [admissions, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xs">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>স্কুল, কলেজ ও বিশ্ববিদ্যালয় ভর্তি তথ্য</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans mb-3">
          ভর্তি তথ্য (Admission Updates ২০২৬)
        </h1>
        <p className="text-xs sm:text-sm text-rose-100 max-w-2xl leading-relaxed">
          একাদশ শ্রেণিতে কলেজ ভর্তি, পলিটেকনিক ডিপ্লোমা, পাবলিক বিশ্ববিদ্যালয় (ঢাকা, বুয়েট, মেডিকেল) এবং জাতীয় বিশ্ববিদ্যালয়ের ভর্তি বিজ্ঞপ্তি ও আবেদন প্রক্রিয়া।
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
              placeholder="শিক্ষা প্রতিষ্ঠানের নাম খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            মোট <strong className="text-rose-700">{filteredAdmissions.length}</strong> টি ভর্তি বিজ্ঞপ্তি রয়েছে
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
            <Filter className="w-3.5 h-3.5" />
            <span>ভর্তির ক্যাটাগরি:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {admissionCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'All' ? 'সব ভর্তি তথ্য' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AdBanner placementId="home_middle" className="mb-6" />

      {/* Admission Grid */}
      {filteredAdmissions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAdmissions.map((adm) => (
            <AdmissionCard key={adm.id} admission={adm} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">কোনো ভর্তি বিজ্ঞপ্তি পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 mt-1">অন্য ক্যাটাগরি বেছে নিন</p>
        </div>
      )}
    </div>
  );
};
