import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { siteSettings, navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 sm:p-12 text-white mb-10 shadow-xs text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
          <GraduationCap className="w-8 h-8 text-amber-300" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-sans mb-3">
          {siteSettings.websiteName}
        </h1>
        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto font-medium">
          “{siteSettings.tagline}”
        </p>
      </div>

      {/* Story & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>আমাদের লক্ষ্য ও উদ্দেশ্য</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed space-y-3">
            <span>
              <strong>Study With Rahat</strong> বাংলাদেশের সকল স্তরের শিক্ষার্থী ও চাকরিপ্রার্থীদের জন্য একটি নির্ভরযোগ্য শিক্ষামূলক প্ল্যাটফর্ম। শিক্ষা বোর্ডের সঠিক নোটিশ পেতে বিলম্ব, ভুল তথ্য বা গুজব এড়িয়ে এক প্ল্যাটফর্মে সঠিক তথ্য পৌঁছে দেওয়াই আমাদের মূল লক্ষ্য।
            </span>
            <br /><br />
            <span>
              আমরা বিশ্বাস করি, সঠিক সময়ে সঠিক তথ্য ও দিকনির্দেশনা একজন শিক্ষার্থীর জীবনে ইতিবাচক পরিবর্তন এনে দিতে পারে।
            </span>
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>কেন আমাদের বেছে নেবেন?</span>
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>১০০% নির্ভুল ও শিক্ষা বোর্ড অনুমোদিত অফিসিয়াল নোটিশ।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>বিসিএস, ব্যাংক ও সরকারি চাকরির হালনাগাদ সার্কুলার।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>অভিজ্ঞ শিক্ষকদের প্রস্তুতকৃত ১০০% কমন উপযোগী সাজেশন ও PDF।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>অনলাইনে যেকোনো ডিভাইস থেকে দ্রুত ও সহজে ব্যবহারের সুবিধা।</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Founder Message */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
          রাহাত
        </div>
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-xs font-bold mb-1">
            প্রতিষ্ঠাতা ও প্রধান মেন্টর
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">রাহাত হোসাইন</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            “আমরা বাংলাদেশের প্রতিটি প্রান্তের শিক্ষার্থীদের কাছে মানসম্মত ডিজিটাল শিক্ষা ও ক্যারিয়ারের পথ সুগম করতে প্রতিশ্রুতিবদ্ধ। আপনারা পাশে আছেন বলেই Study With Rahat আজ একটি আস্থার নাম।”
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigateTo('courses')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              রাহাত স্যারের কোর্সসমূহ
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              সরাসরি যোগাযোগ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { siteSettings } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      alert('আপনার বার্তা সফলভাবে গৃহীত হয়েছে! শীঘ্রই আমাদের টিম যোগাযোগ করবে।');
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 font-sans">
          যোগাযোগ করুন (Contact Us)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          যেকোনো প্রশ্ন, কোর্স সংক্রান্ত তথ্য বা পরামর্শের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase">অফিস ঠিকানা</h4>
                <p className="text-sm font-bold text-slate-800">{siteSettings.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase">হটলাইন ও হোয়াটসঅ্যাপ</h4>
                <p className="text-sm font-bold text-slate-800">{siteSettings.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase">অফিশিয়াল ইমেইল</h4>
                <p className="text-sm font-bold text-slate-800">{siteSettings.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 text-xs text-blue-900">
            <span className="font-bold block mb-1">সাপোর্ট সময়সূচি:</span>
            প্রতিদিন সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত আমাদের টিম সক্রিয় থাকে।
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>বার্তা পাঠান (Send a Message)</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="পূর্ণ নাম"
                  required
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="017XXXXXXXX"
                  required
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@gmail.com"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">বার্তার বিষয়</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="যেমন: কোর্স বা নোটিশ সংক্রান্ত তথ্য"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">আপনার বক্তব্য বা বার্তা *</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="এখানে বিস্তারিত লিখুন..."
                required
                className="w-full text-xs sm:text-sm p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{submitted ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
