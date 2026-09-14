import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostType, AnyPost } from '../types';
import {
  Calendar,
  User,
  Share2,
  Bookmark,
  ArrowLeft,
  Download,
  ExternalLink,
  Building2,
  MapPin,
  Clock,
  Banknote,
  GraduationCap,
  FileText,
  AlertCircle,
  Copy,
  Check,
  Send,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { AdBanner } from './AdBanner';

export const PostDetailPage: React.FC = () => {
  const { selectedPost, getPostById, navigateTo, navigateToPost, toggleBookmark, isBookmarked, notices, jobs, suggestions, openShareModal } = useApp();
  const [copied, setCopied] = useState(false);

  if (!selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 mb-4">কোনো পোস্ট নির্বাচন করা হয়নি।</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold cursor-pointer"
        >
          হোমপেজে ফিরে যান
        </button>
      </div>
    );
  }

  const post = getPostById(selectedPost.type, selectedPost.id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 mb-4">পোস্টটি পাওয়া যায়নি।</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold cursor-pointer"
        >
          হোমপেজে ফিরে যান
        </button>
      </div>
    );
  }

  const bookmarked = isBookmarked(post.id);
  const shareUrl = `${window.location.origin}${window.location.pathname}?type=${selectedPost.type}&id=${post.id}`;

  const handleOpenShare = () => {
    openShareModal({
      id: post.id,
      type: selectedPost.type,
      title: post.title,
      category: 'classCategory' in post ? post.classCategory : ('jobType' in post ? post.jobType : undefined),
      summary: 'description' in post ? post.description : undefined
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    handleOpenShare();
  };

  // Related posts from same type
  const relatedPosts = (
    selectedPost.type === 'notice' ? notices.filter(n => n.id !== post.id).slice(0, 3) :
    selectedPost.type === 'job' ? jobs.filter(j => j.id !== post.id).slice(0, 3) :
    suggestions.filter(s => s.id !== post.id).slice(0, 3)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>পেছনে যান</span>
        </button>

        <div className="text-xs text-slate-400 font-mono hidden sm:block truncate max-w-sm">
          {`studywithrahat.com/${selectedPost.type}/${post.slug}`}
        </div>
      </div>

      {/* Top Ad banner */}
      <AdBanner placementId="article_top" className="mb-6" />

      {/* Main Article Container */}
      <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header Content */}
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800">
              {selectedPost.type === 'notice' ? 'নোটিশ' :
               selectedPost.type === 'job' ? 'চাকরির সার্কুলার' :
               selectedPost.type === 'result' ? 'রেজাল্ট' :
               selectedPost.type === 'admission' ? 'ভর্তি তথ্য' : 'সাজেশন'}
            </span>

            {'classCategory' in post && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                {post.classCategory}
              </span>
            )}

            {'jobType' in post && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
                {post.jobType}
              </span>
            )}

            {'isImportant' in post && post.isImportant && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-700 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                জরুরি বিজ্ঞপ্তি
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4 font-sans">
            {post.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-4 h-4 text-blue-600" />
                <span>Study With Rahat টিম</span>
              </span>
              {'publishedDate' in post && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>প্রকাশ: {post.publishedDate}</span>
                </span>
              )}
              {'deadline' in post && (
                <span className="flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>আবেদনের শেষ তারিখ: {post.deadline}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(post.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  bookmarked
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
                <span>{bookmarked ? 'সংরক্ষিত' : 'সেভ করুন'}</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>শেয়ার</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image if available */}
        {'circularFileUrl' in post && post.circularFileUrl && (
          <div className="w-full max-h-96 overflow-hidden bg-slate-100 border-b border-slate-100">
            <img
              src={post.circularFileUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Key Information Box for Jobs / Admissions / Results */}
        {'orgName' in post && (
          <div className="m-6 sm:m-8 p-5 bg-gradient-to-r from-emerald-50/70 to-teal-50/70 rounded-2xl border border-emerald-200">
            <h3 className="text-sm font-bold text-emerald-950 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>নিয়োগ সংক্রান্ত সংক্ষেপ তথ্য</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
              <div><strong>প্রতিষ্ঠানের নাম:</strong> {post.orgName}</div>
              <div><strong>পদসংখ্যা:</strong> {post.vacancies}</div>
              <div><strong>শিক্ষাগত যোগ্যতা:</strong> {post.qualification}</div>
              <div><strong>বয়সসীমা:</strong> {post.ageLimit}</div>
              <div><strong>বেতন স্কেল:</strong> {post.salary}</div>
              <div><strong>কর্মস্থল:</strong> {post.location}</div>
            </div>
          </div>
        )}

        {'institutionName' in post && (
          <div className="m-6 sm:m-8 p-5 bg-rose-50/70 rounded-2xl border border-rose-200">
            <h3 className="text-sm font-bold text-rose-950 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-rose-700" />
              <span>ভর্তি সংক্রান্ত মূল তথ্য</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
              <div><strong>শিক্ষা প্রতিষ্ঠান:</strong> {post.institutionName}</div>
              <div><strong>আবেদন শুরু:</strong> {post.startDate}</div>
              <div><strong>আবেদনের শেষ তারিখ:</strong> {post.deadline}</div>
              <div><strong>আবেদন ফি:</strong> {post.fee}</div>
              <div className="sm:col-span-2"><strong>ভর্তির ন্যূনতম যোগ্যতা:</strong> {post.eligibility}</div>
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
            {'fullContent' in post ? post.fullContent :
             'description' in post ? post.description :
             'detailedArticle' in post ? post.detailedArticle :
             'content' in post ? post.content : ''}
          </div>

          {/* If Result: SMS & Online Guide */}
          {'checkInstructions' in post && (
            <div className="p-5 bg-purple-50/80 rounded-2xl border border-purple-200">
              <h4 className="text-sm font-bold text-purple-950 mb-2">ফলাফল দেখার সহজ নিয়মাবলী:</h4>
              <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed mb-4">
                {post.checkInstructions}
              </p>
              {post.officialLink && (
                <a
                  href={post.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <span>অনলাইনে অফিশিয়াল রেজাল্ট দেখুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* If Suggestion: CQ, MCQ, Tips */}
          {'importantQuestions' in post && post.importantQuestions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                <h4 className="text-xs font-bold text-teal-950 uppercase tracking-wider mb-2">
                  📌 অতি গুরুত্বপূর্ণ প্রশ্নসমূহ (১০০% কমন উপযোগী)
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-800">
                  {post.importantQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

              {post.creativeQuestions && post.creativeQuestions.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">
                    📝 মডেল সৃজনশীল প্রশ্ন (Creative Questions)
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-800">
                    {post.creativeQuestions.map((cq, i) => (
                      <li key={i} className="bg-white p-2.5 rounded-lg border border-blue-100">{cq}</li>
                    ))}
                  </ul>
                </div>
              )}

              {post.examTips && post.examTips.length > 0 && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2">
                    💡 রাহাত স্যারের এক্সাম প্রিপারেশন টিপস
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-800">
                    {post.examTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Official Apply Button if available */}
          {'officialLink' in post && post.officialLink && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <a
                href={post.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                <span>অফিশিয়াল ওয়েবসাইটে আবেদন / তথ্য দেখুন</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {'attachments' in post && post.attachments && post.attachments[0] && (
                <a
                  href={post.attachments[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>অফিশিয়াল নোটিশ (PDF) ডাউনলোড</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Social Share Bar */}
        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold text-slate-700">পোস্টটি শেয়ার করে বন্ধুদের জানিয়ে দিন:</span>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title}\n\n${shareUrl}`)}`, '_blank')}
              className="px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-xs font-semibold hover:opacity-90 flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
              className="px-3 py-1.5 bg-[#1877F2] text-white rounded-lg text-xs font-semibold hover:opacity-90 flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              Facebook
            </button>
            <button
              onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, '_blank')}
              className="px-3 py-1.5 bg-[#229ED9] text-white rounded-lg text-xs font-semibold hover:opacity-90 flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" /> Telegram
            </button>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে!' : 'লিংক কপি'}</span>
            </button>
            <button
              onClick={handleOpenShare}
              className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>আরও শেয়ার অপশন</span>
            </button>
          </div>
        </div>
      </article>

      {/* Bottom Ad banner */}
      <AdBanner placementId="article_bottom" className="mt-8" />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>আরও সম্পর্কিত তথ্য ও নোটিশ</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map(rel => (
              <div
                key={rel.id}
                onClick={() => navigateToPost(selectedPost.type, rel.id)}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
              >
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {rel.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {'description' in rel ? rel.description : ('content' in rel ? rel.content : '')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
