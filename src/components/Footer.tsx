import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Heart,
  ExternalLink,
  Shield,
  FileText,
  HelpCircle,
  X
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteSettings, navigateTo } = useApp();
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'disclaimer' | 'sitemap' | null>(null);

  const classesList = [
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'SSC', 'Class 11', 'Class 12', 'HSC', 'Polytechnic'
  ];

  return (
    <>
      <footer className="bg-slate-950 text-slate-300 pt-12 pb-16 md:pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            {/* Branding Column */}
            <div className="lg:col-span-2 space-y-4">
              <div
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-black text-white font-sans tracking-tight">
                    Study With <span className="text-amber-400">Rahat</span>
                  </span>
                  <span className="block text-[10px] text-blue-300 font-medium">
                    এডুকেশন ও ক্যারিয়ার ইনফো
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                “{siteSettings.tagline}” — বাংলাদেশের নির্ভরযোগ্য অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। শিক্ষা বোর্ড নোটিশ, পরীক্ষার ফলাফল ও চাকরির সঠিক খবর জানুন সবার আগে।
              </p>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={siteSettings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  title="Facebook Page"
                >
                  <span className="text-xs font-black">f</span>
                </a>
                <a
                  href={siteSettings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  title="YouTube Channel"
                >
                  <span className="text-xs font-black">YT</span>
                </a>
                <a
                  href={siteSettings.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#229ED9] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  title="Telegram Channel"
                >
                  <span className="text-xs font-black">TG</span>
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                জরুরি মেনু
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => navigateTo('notices')} className="hover:text-blue-400 transition-colors">
                    ক্লাস নোটিশ
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('results')} className="hover:text-blue-400 transition-colors">
                    পরীক্ষার রেজাল্ট
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('jobs')} className="hover:text-blue-400 transition-colors">
                    চাকরির খবর (Job News)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('courses')} className="hover:text-blue-400 transition-colors">
                    অনলাইন কোর্সসমূহ
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('admissions')} className="hover:text-blue-400 transition-colors">
                    ভর্তি তথ্য
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('suggestions')} className="hover:text-blue-400 transition-colors">
                    ক্লাস ভিত্তিক সাজেশন
                  </button>
                </li>
              </ul>
            </div>

            {/* Class Links */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                শ্রেণি ও বোর্ড
              </h3>
              <ul className="space-y-1.5 text-xs">
                {classesList.slice(0, 7).map((c) => (
                  <li key={c}>
                    <button onClick={() => navigateTo('suggestions')} className="hover:text-blue-400 transition-colors">
                      {c} সাজেশন ও গাইড
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Legal */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                যোগাযোগ ও নীতি
              </h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{siteSettings.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{siteSettings.email}</span>
                </li>
                <li className="pt-2 border-t border-slate-800 space-y-1.5">
                  <div>
                    <button onClick={() => setModalType('privacy')} className="hover:text-slate-200">
                      Privacy Policy
                    </button>
                  </div>
                  <div>
                    <button onClick={() => setModalType('terms')} className="hover:text-slate-200">
                      Terms & Conditions
                    </button>
                  </div>
                  <div>
                    <button onClick={() => setModalType('disclaimer')} className="hover:text-slate-200">
                      Disclaimer
                    </button>
                  </div>
                  <div>
                    <button onClick={() => setModalType('sitemap')} className="hover:text-slate-200">
                      Sitemap (সাইটম্যাপ)
                    </button>
                  </div>
                  <div className="pt-1.5 border-t border-slate-800/80">
                    <button
                      onClick={() => navigateTo('admin')}
                      className="text-amber-400/90 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Shield className="w-3 h-3 text-amber-400" />
                      <span>এডমিন প্যানেল</span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright bar */}
          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <p>© 2026 Study With Rahat. All Rights Reserved.</p>
            <p className="flex items-center gap-1">
              বাংলাদেশের শিক্ষার্থীদের জন্য তৈরি <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Study With Rahat Desk
            </p>
          </div>
        </div>
      </footer>

      {/* Legal / Policy Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white text-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'privacy' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Privacy Policy (গোপনীয়তা নীতি)</span>
                </h3>
                <div className="text-xs leading-relaxed space-y-2 text-slate-600">
                  <p>
                    <strong>Study With Rahat</strong> ওয়েবসাইটে আপনার তথ্যের সর্বোচ্চ নিরাপত্তা রক্ষা করা হয়।
                  </p>
                  <p>
                    ১. আমরা শিক্ষার্থীদের ব্যক্তিগত কোনো গোপন তথ্য তাদের সম্মতি ব্যতীত তৃতীয় পক্ষের কাছে শেয়ার করি না।
                  </p>
                  <p>
                    ২. ওয়েবসাইটের ব্রাউজিং অভিজ্ঞতা উন্নয়নের জন্য স্ট্যান্ডার্ড কুকিজ এবং এনালিটিক্স ব্যবহৃত হতে পারে।
                  </p>
                  <p>
                    ৩. বিজ্ঞাপন প্রদর্শন এবং সাইট পারফরম্যান্স ট্র্যাক করার জন্য গুগল এডসেন্স এর মতো মানসম্মত নেটওয়ার্ক নীতি অনুসরণ করা হয়।
                  </p>
                </div>
              </div>
            )}

            {modalType === 'terms' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Terms & Conditions (শর্তাবলী)</span>
                </h3>
                <div className="text-xs leading-relaxed space-y-2 text-slate-600">
                  <p>
                    Study With Rahat প্ল্যাটফর্মে প্রকাশিত সকল স্টাডি নোটস, লেকচার ও সাজেশন শিক্ষার্থীদের ব্যক্তিগত শিক্ষার উদ্দেশ্যে উন্মুক্ত।
                  </p>
                  <p>
                    অনুমতি ব্যতীত সাইটের কোনো কনটেন্ট বাণিজ্যিক উদ্দেশ্যে নকল বা পুনঃবিক্রয় করা সম্পূর্ণ নিষিদ্ধ।
                  </p>
                </div>
              </div>
            )}

            {modalType === 'disclaimer' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  <span>Disclaimer (দায়মুক্তি নোটিশ)</span>
                </h3>
                <div className="text-xs leading-relaxed space-y-2 text-slate-600">
                  <p>
                    Study With Rahat কোনো সরকারি প্রতিষ্ঠান নয়। এটি একটি স্বতন্ত্র শিক্ষা ও ক্যারিয়ার তথ্য বিষয়ক অনলাইন পোর্টাল।
                  </p>
                  <p>
                    আমরা বাংলাদেশের বিভিন্ন শিক্ষা বোর্ড, বিশ্ববিদ্যালয় ও মন্ত্রণালয়ের অফিশিয়াল ওয়েবসাইট থেকে যাচাইকৃত তথ্য শিক্ষার্থীদের সুবিধার্থে সহজ ভাষায় পরিবেশন করি।
                  </p>
                </div>
              </div>
            )}

            {modalType === 'sitemap' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Sitemap (ওয়েবসাইট সাইটম্যাপ)
                </h3>
                <ul className="grid grid-cols-2 gap-2 text-xs text-blue-600 font-medium">
                  <li><button onClick={() => { setModalType(null); navigateTo('home'); }}>হোমপেজ</button></li>
                  <li><button onClick={() => { setModalType(null); navigateTo('notices'); }}>ক্লাস নোটিশ</button></li>
                  <li><button onClick={() => { setModalType(null); navigateTo('results'); }}>পরীক্ষার রেজাল্ট</button></li>
                  <li><button onClick={() => { setModalType(null); navigateTo('jobs'); }}>চাকরির সার্কুলার</button></li>
                  <li><button onClick={() => { setModalType(null); navigateTo('courses'); }}>সকল কোর্স</button></li>
                  <li><button onClick={() => { setModalType(null); navigateTo('admissions'); }}>ভর্তি বিজ্ঞপ্তি</button></li>
                  <li><button onClick={() => { setModalType(null); navigateTo('suggestions'); }}>পরীক্ষার সাজেশন</button></li>
                  <li><button onClick={() => { setModalType(null); navigateTo('about'); }}>আমাদের সম্পর্কে</button></li>
                  <li><button onClick={() => { setModalType(null); navigateTo('contact'); }}>যোগাযোগ</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
