import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CoursePost } from '../types';
import {
  ArrowLeft,
  Clock,
  User,
  Star,
  Users,
  CheckCircle2,
  BookOpen,
  Award,
  Video,
  FileCheck,
  Share2,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { AdBanner } from './AdBanner';

export const CourseDetailPage: React.FC = () => {
  const {
    selectedPost,
    getPostById,
    navigateTo,
    enrolledCourseIds,
    enrollInCourse,
    toggleBookmark,
    isBookmarked
  } = useApp();

  const [activeTab, setActiveTab] = useState<'syllabus' | 'instructor' | 'faq'>('syllabus');

  if (!selectedPost || selectedPost.type !== 'course') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 mb-4">কোর্স নির্বাচন করা হয়নি।</p>
        <button
          onClick={() => navigateTo('courses')}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold"
        >
          সকল কোর্স দেখুন
        </button>
      </div>
    );
  }

  const course = getPostById('course', selectedPost.id) as CoursePost;

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 mb-4">কোর্সটি খুঁজে পাওয়া যায়নি।</p>
        <button
          onClick={() => navigateTo('courses')}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold"
        >
          কোর্স তালিকায় ফিরে যান
        </button>
      </div>
    );
  }

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const bookmarked = isBookmarked(course.id);

  const handleEnroll = () => {
    enrollInCourse(course.id);
    alert(`অভিনন্দন! "${course.title}" কোর্সে আপনার এনরোলমেন্ট সফল হয়েছে। আপনি এখনই ক্লাস শুরু করতে পারেন।`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <button
        onClick={() => navigateTo('courses')}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>সকল কোর্সে ফিরে যান</span>
      </button>

      {/* Hero Header */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 sm:p-8">
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                  {course.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {course.rating} (৮৫০+ রিভিউ)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-3">
                {course.title}
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {course.shortDesc}
              </p>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                <div>
                  <span className="text-slate-400 block mb-0.5">ইন্সট্রাক্টর:</span>
                  <strong className="text-slate-900">{course.instructorName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">কোর্সের মেয়াদ:</span>
                  <strong className="text-slate-900">{course.duration}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">মোট শিক্ষার্থী:</span>
                  <strong className="text-slate-900">{course.enrollCount.toLocaleString()} জন</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleBookmark(course.id)}
                className="p-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                title="বুকমার্ক করুন"
              >
                <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-blue-600 text-blue-600' : 'text-slate-600'}`} />
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('কোর্সের লিংক কপি করা হয়েছে!');
                }}
                className="p-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                title="শেয়ার করুন"
              >
                <Share2 className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Pricing Card Sidebar */}
          <div className="bg-gradient-to-b from-blue-50/50 to-indigo-50/30 rounded-2xl p-6 border border-blue-200 flex flex-col justify-between">
            <div>
              <div className="rounded-xl overflow-hidden aspect-video mb-4 shadow-xs">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-blue-900">
                    {course.isPaid ? `${course.price} ৳` : 'সম্পূর্ণ ফ্রি'}
                  </span>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <span className="text-sm text-slate-400 line-through">
                      {course.originalPrice} ৳
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-700 font-semibold">
                  ✓ এককালীন ফি • আজীবন এক্সেস
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>৮০+ হাই-কোয়ালিটি ভিডিও লেকচার</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span>ক্লাস নোট ও প্র্যাকটিস শিট PDF</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>কোর্স সমাপ্তি সনদপত্র (Certificate)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleEnroll}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                isEnrolled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isEnrolled ? '✓ আপনার ভর্তি নিশ্চিত হয়েছে' : (course.isPaid ? 'এখনই এনরোল করুন' : 'সম্পূর্ণ ফ্রিতে যুক্ত হোন')}
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-t border-slate-200 px-6 sm:px-8 bg-slate-50 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'syllabus' ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-slate-900'
            }`}
          >
            কোর্স কারিকুলাম ও সিলেবাস
          </button>
          <button
            onClick={() => setActiveTab('instructor')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'instructor' ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-slate-900'
            }`}
          >
            ইন্সট্রাক্টর পরিচিতি
          </button>
        </div>

        {/* Tab contents */}
        <div className="p-6 sm:p-8">
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>সিলেবাস সূচিপত্র</span>
              </h3>
              {course.curriculum && course.curriculum.length > 0 ? (
                course.curriculum.map((mod, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 font-semibold text-xs sm:text-sm text-slate-800 flex items-center justify-between">
                      <span>{mod.module}</span>
                      <span className="text-xs text-slate-500 font-normal">{mod.topics.length} টি টপিক</span>
                    </div>
                    <ul className="divide-y divide-slate-100 px-4 py-2 text-xs text-slate-600">
                      {mod.topics.map((t, tidx) => (
                        <li key={tidx} className="py-2 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">সিলেবাসের বিস্তারিত শীঘ্রই আপলোড করা হবে।</p>
              )}
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl shrink-0">
                রাহাত
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{course.instructorName}</h4>
                <p className="text-xs text-blue-600 font-medium mb-2">{course.instructorRole}</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  বিগত ৮ বছর ধরে বাংলাদেশে মাধ্যমিক, উচ্চমাধ্যমিক ও চাকরিপ্রার্থীদের আইসিটি, গণিত ও প্রিপারেশনে পাঠদান করছেন। শিক্ষার্থীদের সহজ পদ্ধতিতে শিখিয়ে বোর্ড পরীক্ষায় সর্বোচ্চ ফলাফল নিশ্চিত করার জন্য সুপরিচিত।
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <AdBanner placementId="article_bottom" />
    </div>
  );
};
