import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PostType } from '../types';
import { Search, X, Calendar, ArrowRight, BookOpen, Briefcase, Award, GraduationCap, FileText, Sparkles } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const {
    notices,
    jobs,
    results,
    courses,
    admissions,
    suggestions,
    navigateToPost
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  const filteredItems = useMemo(() => {
    if (!query.trim() && selectedType === 'all' && selectedClass === 'all') {
      return [];
    }

    const q = query.toLowerCase().trim();

    const items: Array<{
      id: string;
      title: string;
      type: PostType;
      subtitle: string;
      date?: string;
      badge: string;
    }> = [];

    // Notices
    if (selectedType === 'all' || selectedType === 'notice') {
      notices.forEach(n => {
        const matchesQuery = !q || n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q) || n.classCategory.toLowerCase().includes(q);
        const matchesClass = selectedClass === 'all' || n.classCategory === selectedClass;
        if (matchesQuery && matchesClass) {
          items.push({
            id: n.id,
            title: n.title,
            type: 'notice',
            subtitle: `${n.classCategory} • ${n.description.slice(0, 80)}...`,
            date: n.publishedDate,
            badge: n.classCategory
          });
        }
      });
    }

    // Jobs
    if (selectedType === 'all' || selectedType === 'job') {
      jobs.forEach(j => {
        const matchesQuery = !q || j.title.toLowerCase().includes(q) || j.orgName.toLowerCase().includes(q) || j.description.toLowerCase().includes(q);
        if (matchesQuery) {
          items.push({
            id: j.id,
            title: j.title,
            type: 'job',
            subtitle: `${j.orgName} • পদসংখ্যা: ${j.vacancies} • শেষ তারিখ: ${j.deadline}`,
            date: j.deadline,
            badge: j.jobType
          });
        }
      });
    }

    // Results
    if (selectedType === 'all' || selectedType === 'result') {
      results.forEach(r => {
        const matchesQuery = !q || r.title.toLowerCase().includes(q) || r.examName.toLowerCase().includes(q) || r.boardOrUniversity.toLowerCase().includes(q);
        if (matchesQuery) {
          items.push({
            id: r.id,
            title: r.title,
            type: 'result',
            subtitle: `${r.boardOrUniversity} (${r.year})`,
            date: r.publishedDate,
            badge: r.category
          });
        }
      });
    }

    // Courses
    if (selectedType === 'all' || selectedType === 'course') {
      courses.forEach(c => {
        const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.shortDesc.toLowerCase().includes(q) || c.instructorName.toLowerCase().includes(q);
        if (matchesQuery) {
          items.push({
            id: c.id,
            title: c.title,
            type: 'course',
            subtitle: `${c.instructorName} • ${c.duration} • ${c.isPaid ? `${c.price} ৳` : 'ফ্রি'}`,
            badge: c.category
          });
        }
      });
    }

    // Admissions
    if (selectedType === 'all' || selectedType === 'admission') {
      admissions.forEach(a => {
        const matchesQuery = !q || a.title.toLowerCase().includes(q) || a.institutionName.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
        if (matchesQuery) {
          items.push({
            id: a.id,
            title: a.title,
            type: 'admission',
            subtitle: `${a.institutionName} • শেষ সময়: ${a.deadline}`,
            date: a.deadline,
            badge: a.category
          });
        }
      });
    }

    // Suggestions
    if (selectedType === 'all' || selectedType === 'suggestion') {
      suggestions.forEach(s => {
        const matchesQuery = !q || s.title.toLowerCase().includes(q) || s.subject.toLowerCase().includes(q) || s.classCategory.toLowerCase().includes(q);
        const matchesClass = selectedClass === 'all' || s.classCategory === selectedClass;
        if (matchesQuery && matchesClass) {
          items.push({
            id: s.id,
            title: s.title,
            type: 'suggestion',
            subtitle: `${s.classCategory} • বিষয়: ${s.subject}`,
            badge: s.subject
          });
        }
      });
    }

    return items;
  }, [query, selectedType, selectedClass, notices, jobs, results, courses, admissions, suggestions]);

  if (!isOpen) return null;

  const getIcon = (type: PostType) => {
    switch (type) {
      case 'notice': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'job': return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'result': return <Award className="w-4 h-4 text-purple-600" />;
      case 'course': return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'admission': return <GraduationCap className="w-4 h-4 text-rose-600" />;
      case 'suggestion': return <Sparkles className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 backdrop-blur-xs p-4 pt-16 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="নোটিশ, চাকরির সার্কুলার, রেজাল্ট, কোর্স বা সাজেশন খুঁজুন..."
            className="w-full text-base placeholder-slate-400 focus:outline-hidden text-slate-800"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded-md hover:bg-slate-100"
            >
              মুছুন
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Badges */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-1.5 text-xs">
          <span className="text-slate-500 font-medium py-1">বিভাগ:</span>
          {[
            { id: 'all', label: 'সবগুলো' },
            { id: 'notice', label: 'নোটিশ' },
            { id: 'job', label: 'চাকরি' },
            { id: 'result', label: 'রেজাল্ট' },
            { id: 'course', label: 'কোর্স' },
            { id: 'admission', label: 'ভর্তি' },
            { id: 'suggestion', label: 'সাজেশন' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedType(f.id)}
              className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                selectedType === f.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-slate-100">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => {
                  onClose();
                  navigateToPost(item.type, item.id);
                }}
                className="py-3 px-3 hover:bg-blue-50/60 rounded-xl transition-all cursor-pointer group flex items-start gap-3"
              >
                <div className="mt-1 p-2 rounded-lg bg-slate-100 group-hover:bg-white transition-colors">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                      {item.badge}
                    </span>
                    {item.date && (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all self-center" />
              </div>
            ))
          ) : query ? (
            <div className="py-12 text-center text-slate-500">
              <Search className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-sm text-slate-700">“{query}” দিয়ে কোনো ফলাফল পাওয়া যায়নি</p>
              <p className="text-xs text-slate-400 mt-1">অন্য কোনো কিওয়ার্ড বা ফিল্টার পরিবর্তন করে চেষ্টা করুন</p>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              <p className="font-medium text-slate-600 mb-2">জনপ্রিয় সার্চসমূহ:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['এসএসসি ২০২৬', '৪৭তম বিসিএস', 'এইচএসসি রুটিন', 'ঢাকা বিশ্ববিদ্যালয় ভর্তি', 'আইসিটি কোর্স', 'উচ্চতর গণিত সাজেশন'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
