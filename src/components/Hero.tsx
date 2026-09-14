import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Briefcase,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onOpenSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSearch }) => {
  const { navigateTo, websiteViews, notices, jobs, suggestions } = useApp();

  const quickClasses = [
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'SSC', 'HSC', 'Polytechnic', 'Honours'
  ];

  return (
    <section className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden py-10 sm:py-16">
      {/* Background Graphic elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200 mb-5 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>বাংলাদেশের শীর্ষস্থানীয় অনলাইন এডুকেশন পোর্টাল</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-sans text-white mb-4">
            Study With <span className="text-amber-400">Rahat</span>
          </h1>

          {/* Subtitle / Tagline from Prompt */}
          <p className="text-base sm:text-xl text-blue-100 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
            “শিক্ষার্থীদের জন্য নোটিশ, রেজাল্ট, সাজেশন, ভর্তি তথ্য, কোর্স ও চাকরির খবর—সব একসাথে।”
          </p>

          {/* 4 Requested Primary Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <button
              onClick={() => navigateTo('notices')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-blue-900 hover:bg-blue-50 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Bell className="w-4 h-4 text-blue-600 shrink-0" />
              <span>সর্বশেষ নোটিশ</span>
            </button>

            <button
              onClick={() => navigateTo('jobs')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-slate-900 shrink-0" />
              <span>চাকরির খবর</span>
            </button>

            <button
              onClick={() => navigateTo('admissions')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/90 hover:bg-blue-600 text-white border border-blue-400/40 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-white shrink-0" />
              <span>ভর্তি তথ্য</span>
            </button>

            <button
              onClick={() => navigateTo('courses')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-white shrink-0" />
              <span>কোর্স দেখুন</span>
            </button>
          </div>

          {/* Quick Class Selector strip */}
          <div className="pt-4 border-t border-blue-800/80">
            <p className="text-xs text-blue-300 font-medium mb-2.5">
              আপনার শ্রেণি বা ক্যাটাগরি বেছে নিন:
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {quickClasses.map(cls => (
                <button
                  key={cls}
                  onClick={() => navigateTo('notices')}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white rounded-lg text-xs font-medium border border-white/10 transition-colors cursor-pointer"
                >
                  {cls}
                </button>
              ))}
              <button
                onClick={() => navigateTo('suggestions')}
                className="px-2.5 py-1 bg-amber-500/30 hover:bg-amber-500/50 text-amber-200 hover:text-white rounded-lg text-xs font-semibold border border-amber-400/30 transition-colors cursor-pointer"
              >
                + সকল সাজেশন
              </button>
            </div>
          </div>
        </div>

        {/* Live Portal Stats Bar */}
        <div className="mt-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/15">
            <span className="block text-xl sm:text-2xl font-black text-amber-400">
              {notices.length * 15}+
            </span>
            <span className="text-[11px] text-blue-200">শিক্ষা বোর্ড নোটিশ</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/15">
            <span className="block text-xl sm:text-2xl font-black text-emerald-400">
              {jobs.length * 20}+
            </span>
            <span className="text-[11px] text-blue-200">চাকরির সার্কুলার</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/15">
            <span className="block text-xl sm:text-2xl font-black text-amber-300">
              {suggestions.length * 12}+
            </span>
            <span className="text-[11px] text-blue-200">পরীক্ষার সাজেশন</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/15">
            <span className="block text-xl sm:text-2xl font-black text-white">
              {(websiteViews).toLocaleString()}+
            </span>
            <span className="text-[11px] text-blue-200">পোর্টাল ভিজিটর</span>
          </div>
        </div>
      </div>
    </section>
  );
};
