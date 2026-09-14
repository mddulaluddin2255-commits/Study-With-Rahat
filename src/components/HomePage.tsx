import React from 'react';
import { useApp } from '../context/AppContext';
import { Hero } from './Hero';
import { NoticeCard } from './NoticeCard';
import { JobCard } from './JobCard';
import { ResultCard } from './ResultCard';
import { CourseCard } from './CourseCard';
import { AdmissionCard } from './AdmissionCard';
import { SuggestionCard } from './SuggestionCard';
import { AdBanner } from './AdBanner';
import {
  Bell,
  Briefcase,
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MessageCircle,
  Send,
  CheckCircle,
  Clock
} from 'lucide-react';

interface HomePageProps {
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch }) => {
  const {
    notices,
    jobs,
    results,
    courses,
    admissions,
    suggestions,
    classes,
    navigateTo,
    siteSettings
  } = useApp();

  // Pick top recent items
  const recentNotices = notices.slice(0, 4);
  const recentJobs = jobs.slice(0, 3);
  const recentResults = results.slice(0, 3);
  const featuredCourses = courses.slice(0, 3);
  const recentAdmissions = admissions.slice(0, 3);
  const recentSuggestions = suggestions.slice(0, 3);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. Hero Section */}
      <Hero onOpenSearch={onOpenSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Top Leaderboard Advertisement */}
        <AdBanner placementId="home_leaderboard" />

        {/* 2. Class-Based Quick Access Grid (Class 6 to Polytechnic) */}
        <section id="class-quick-access">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                সহজ নেভিগেশন
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                শ্রেণি ভিত্তিক নোটিশ ও পড়াশোনা
              </h2>
            </div>
            <button
              onClick={() => navigateTo('suggestions')}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>সকল শ্রেণি</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { name: 'Class 6', label: '৬ষ্ঠ শ্রেণি', count: 'নোটিশ ও গাইড', color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 text-blue-900' },
              { name: 'Class 7', label: '৭ম শ্রেণি', count: 'নতুন কারিকুলাম', color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-900' },
              { name: 'Class 8', label: '৮ম শ্রেণি', count: 'জেএসসি ও বার্ষিক', color: 'from-purple-500/10 to-pink-500/10 border-purple-200 text-purple-900' },
              { name: 'Class 9', label: '৯ম শ্রেণি', count: 'বোর্ড সিলেবাস', color: 'from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-900' },
              { name: 'Class 10', label: '১০ম শ্রেণি', count: 'প্রাক-নির্বাচনী', color: 'from-rose-500/10 to-red-500/10 border-rose-200 text-rose-900' },
              { name: 'SSC', label: 'এসএসসি (SSC)', count: 'চূড়ান্ত সাজেশন', color: 'from-blue-600/15 to-indigo-600/15 border-blue-300 text-blue-950 font-bold' },
              { name: 'Class 11', label: 'একাদশ শ্রেণি', count: 'কলেজ নোটিশ', color: 'from-teal-500/10 to-cyan-500/10 border-teal-200 text-teal-900' },
              { name: 'Class 12', label: 'দ্বাদশ শ্রেণি', count: 'টেস্ট পরীক্ষা', color: 'from-indigo-500/10 to-blue-500/10 border-indigo-200 text-indigo-900' },
              { name: 'HSC', label: 'এইচএসসি (HSC)', count: 'আইসিটি ও বিজ্ঞান', color: 'from-purple-600/15 to-violet-600/15 border-purple-300 text-purple-950 font-bold' },
              { name: 'Polytechnic', label: 'পলিটেকনিক', count: 'ডিপ্লোমা ইন ইঞ্জিনিয়ারিং', color: 'from-emerald-600/15 to-green-600/15 border-emerald-300 text-emerald-950 font-bold' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => navigateTo('notices')}
                className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} border text-left hover:scale-[1.02] hover:shadow-xs transition-all cursor-pointer`}
              >
                <span className="block text-xs font-mono font-semibold text-slate-500">{item.name}</span>
                <span className="block text-base sm:text-lg font-bold mt-0.5">{item.label}</span>
                <span className="block text-[11px] text-slate-500 mt-1">{item.count}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Latest Notices Section */}
        <section id="latest-notices">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  সর্বশেষ নোটিশ (Latest Notices)
                </h2>
                <p className="text-xs text-slate-500">বোর্ড ও শিক্ষা মন্ত্রণালয়ের হালনাগাদ সার্কুলার</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('notices')}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>সকল নোটিশ ({notices.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        </section>

        {/* 4. Latest Job News Section */}
        <section id="latest-jobs" className="bg-gradient-to-b from-slate-50 to-emerald-50/20 p-6 sm:p-8 rounded-3xl border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  নতুন চাকরির খবর (Job Circulars)
                </h2>
                <p className="text-xs text-slate-500">সরকারি ও বেসরকারি চাকরির সময়োপযোগী খবর</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('jobs')}
              className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              <span>সব চাকরির খবর</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* Middle Ad Banner */}
        <AdBanner placementId="home_middle" />

        {/* 5. Exam Results & SMS Checking */}
        <section id="latest-results">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  পরীক্ষার রেজাল্ট (Exam Results ২০২৬)
                </h2>
                <p className="text-xs text-slate-500">এসএসসি, এইচএসসি, পলিটেকনিক ও বিশ্ববিদ্যালয়ের ফলাফল</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('results')}
              className="text-xs sm:text-sm font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <span>সকল রেজাল্ট</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentResults.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        </section>

        {/* 6. Featured Courses by Rahat Sir */}
        <section id="featured-courses">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  অনলাইন কোর্সসমূহ (Featured Courses)
                </h2>
                <p className="text-xs text-slate-500">রাহাত স্যারের স্পেশাল কোর্স ও ফ্রি ক্লাস</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('courses')}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>সকল কোর্স দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* 7. Class-Based Suggestions & Notes */}
        <section id="latest-suggestions" className="bg-teal-50/40 p-6 sm:p-8 rounded-3xl border border-teal-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  বোর্ড পরীক্ষার সাজেশন ও PDF
                </h2>
                <p className="text-xs text-slate-500">১০০% কমন উপযোগী CQ, MCQ ও ফ্রি পিডিএফ ডাউনলোড</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('suggestions')}
              className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
            >
              <span>সকল সাজেশন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentSuggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </section>

        {/* 8. College & University Admission Circulars */}
        <section id="latest-admissions">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  ভর্তি বিজ্ঞপ্তি (Admission Updates ২০২৬)
                </h2>
                <p className="text-xs text-slate-500">একাদশ শ্রেণি, বিশ্ববিদ্যালয় ও মেডিকেল ভর্তি তথ্য</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('admissions')}
              className="text-xs sm:text-sm font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer"
            >
              <span>সব ভর্তি তথ্য</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentAdmissions.map((admission) => (
              <AdmissionCard key={admission.id} admission={admission} />
            ))}
          </div>
        </section>

        {/* 9. Telegram & Social Community CTA */}
        <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-3 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ফ্রি নোটিফিকেশন সুবিধা</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-sans mb-2">
              সবার আগে নোটিশ ও সার্কুলার পেতে যুক্ত হোন
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-xl leading-relaxed">
              আমাদের টেলিগ্রাম ও ফেসবুক গ্রুপে ১,৫০,০০০+ শিক্ষার্থী যুক্ত আছেন। পরীক্ষার রুটিন, রেজাল্ট শিট ও ফ্রি সাজেশন মুহূর্তের মধ্যেই পেয়ে যাবেন।
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={siteSettings.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#229ED9] hover:bg-[#1e8cc1] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>টেলিগ্রাম চ্যানেলে যুক্ত হোন</span>
            </a>

            <a
              href={siteSettings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <span>ফেসবুক পেজ ফলো করুন</span>
            </a>
          </div>
        </section>

        {/* Bottom Banner */}
        <AdBanner placementId="home_bottom" />
      </div>
    </div>
  );
};
