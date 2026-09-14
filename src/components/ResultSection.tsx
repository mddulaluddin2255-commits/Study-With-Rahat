import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ResultCard } from './ResultCard';
import { Award, Search, MessageSquare, Copy, Check, ExternalLink, Filter } from 'lucide-react';
import { RESULT_CATEGORIES } from '../data/initialData';
import { AdBanner } from './AdBanner';

export const ResultSection: React.FC = () => {
  const { results } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Interactive SMS tool state
  const [smsExam, setSmsExam] = useState<'SSC' | 'HSC' | 'Dakhil'>('SSC');
  const [smsBoard, setSmsBoard] = useState('DHA');
  const [smsRoll, setSmsRoll] = useState('123456');
  const [smsYear, setSmsYear] = useState('2026');
  const [copied, setCopied] = useState(false);

  const generatedSms = `${smsExam} ${smsBoard} ${smsRoll || 'ROLL'} ${smsYear}`;

  const copySms = () => {
    navigator.clipboard.writeText(generatedSms);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredResults = useMemo(() => {
    return results.filter(r => {
      if (!r.isPublished) return false;
      const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
      const matchesSearch = !searchTerm ||
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.boardOrUniversity.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [results, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xs">
        <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>শিক্ষা ও ভর্তি পরীক্ষার ফলাফল</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-sans mb-3">
          রেজাল্ট (Exam Results Portal)
        </h1>
        <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
          এসএসসি, এইচএসসি, পলিটেকনিক সেমিস্টার, বিশ্ববিদ্যালয় ভর্তি ও সরকারি চাকরির পরীক্ষার অফিশিয়াল রেজাল্ট, মার্কশিট ডাউনলোডের লিংক ও এসএমএস নির্দেশিকা।
        </p>
      </div>

      {/* SMS Fast Result Checker Tool Widget */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 sm:p-6 mb-8 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-purple-900 text-sm sm:text-base mb-2">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          <span>এসএমএসের মাধ্যমে রেজাল্ট দেখার তাৎক্ষণিক নিয়ম (SMS Guide)</span>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          অনলাইন সার্ভার ডাউন থাকলে যে কোনো মোবাইল ফোন থেকে <strong>16222</strong> নম্বরে মেসেজ পাঠিয়ে সহজেই রেজাল্ট জানতে পারবেন:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">পরীক্ষার নাম</label>
            <select
              value={smsExam}
              onChange={(e) => setSmsExam(e.target.value as any)}
              className="w-full text-xs font-semibold p-2 bg-white border border-purple-200 rounded-xl"
            >
              <option value="SSC">SSC (এসএসসি)</option>
              <option value="HSC">HSC (এইচএসসি)</option>
              <option value="Dakhil">DAKHIL (দাখিল)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">বোর্ডের কোড</label>
            <select
              value={smsBoard}
              onChange={(e) => setSmsBoard(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-white border border-purple-200 rounded-xl"
            >
              <option value="DHA">ঢাকা (DHA)</option>
              <option value="CHI">চট্টগ্রাম (CHI)</option>
              <option value="RAJ">রাজশাহী (RAJ)</option>
              <option value="COM">কুমিল্লা (COM)</option>
              <option value="JES">যশোর (JES)</option>
              <option value="BAR">বরিশাল (BAR)</option>
              <option value="SYL">সিলেট (SYL)</option>
              <option value="DIN">দিনাজপুর (DIN)</option>
              <option value="MYM">ময়মনসিংহ (MYM)</option>
              <option value="MAD">মাদ্রাসা (MAD)</option>
              <option value="TEC">কারিগরি (TEC)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">রোল নম্বর</label>
            <input
              type="text"
              value={smsRoll}
              onChange={(e) => setSmsRoll(e.target.value)}
              placeholder="রোল নম্বর"
              className="w-full text-xs p-2 bg-white border border-purple-200 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">পাশের সাল</label>
            <input
              type="text"
              value={smsYear}
              onChange={(e) => setSmsYear(e.target.value)}
              className="w-full text-xs p-2 bg-white border border-purple-200 rounded-xl font-mono"
            />
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">এসএমএস ফরম্যাট:</span>
            <code className="text-xs sm:text-sm font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg border border-purple-100">
              {generatedSms} <span className="text-slate-400 font-normal">→ 16222</span>
            </code>
          </div>

          <button
            onClick={copySms}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
          </button>
        </div>
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
              placeholder="পরীক্ষার নাম বা বোর্ড খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <a
            href="https://eboardresults.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <span>অফিশিয়াল রেজাল্ট সার্ভার (eBoardResults)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
            <Filter className="w-3.5 h-3.5" />
            <span>রেজাল্টের ক্যাটাগরি:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {RESULT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'All' ? 'সকল রেজাল্ট' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AdBanner placementId="home_middle" className="mb-6" />

      {/* Results Grid */}
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResults.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">কোনো ফলাফল পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 mt-1">অন্য ক্যাটাগরি সিলেক্ট করুন</p>
        </div>
      )}
    </div>
  );
};
