import React, { useState } from 'react';
import { ShareTarget } from '../types';
import {
  X,
  Copy,
  Check,
  Share2,
  Send,
  MessageCircle,
  Mail,
  QrCode,
  ExternalLink,
  Smartphone
} from 'lucide-react';

interface ShareModalProps {
  shareTarget: ShareTarget | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ shareTarget, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!shareTarget) return null;

  // Build canonical share URL with query parameters for direct loading
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const shareUrl = `${baseUrl}?type=${shareTarget.type}&id=${shareTarget.id}`;

  const postTypeText =
    shareTarget.type === 'notice' ? 'নোটিশ' :
    shareTarget.type === 'job' ? 'চাকরির সার্কুলার' :
    shareTarget.type === 'result' ? 'রেজাল্ট' :
    shareTarget.type === 'course' ? 'কোর্স' :
    shareTarget.type === 'admission' ? 'ভর্তি তথ্য' : 'সাজেশন';

  const postTypeBadgeColor =
    shareTarget.type === 'notice' ? 'bg-blue-100 text-blue-800 border-blue-200' :
    shareTarget.type === 'job' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
    shareTarget.type === 'result' ? 'bg-purple-100 text-purple-800 border-purple-200' :
    shareTarget.type === 'course' ? 'bg-indigo-100 text-indigo-800 border-indigo-200' :
    shareTarget.type === 'admission' ? 'bg-rose-100 text-rose-800 border-rose-200' :
    'bg-teal-100 text-teal-800 border-teal-200';

  const shareText = `Study With Rahat থেকে দেখুন: ${shareTarget.title}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: shareTarget.title,
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      banglaName: 'হোয়াটসঅ্যাপ',
      color: 'bg-[#25D366] hover:bg-[#1EBE5D] text-white',
      icon: <MessageCircle className="w-5 h-5" />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
    },
    {
      name: 'Facebook',
      banglaName: 'ফেসবুক',
      color: 'bg-[#1877F2] hover:bg-[#0d6efd] text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Telegram',
      banglaName: 'টেলিগ্রাম',
      color: 'bg-[#229ED9] hover:bg-[#1a8bc2] text-white',
      icon: <Send className="w-5 h-5" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTarget.title)}`
    },
    {
      name: 'Twitter / X',
      banglaName: 'টুইটার (X)',
      color: 'bg-black hover:bg-slate-800 text-white',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      banglaName: 'লিংকডইন',
      color: 'bg-[#0A66C2] hover:bg-[#084e96] text-white',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Email',
      banglaName: 'ইমেইল',
      color: 'bg-slate-700 hover:bg-slate-800 text-white',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=${encodeURIComponent(shareTarget.title)}&body=${encodeURIComponent(`${shareText}\n\nপোস্টটির লিংক:\n${shareUrl}`)}`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">পোস্টটি শেয়ার করুন</h3>
              <p className="text-xs text-slate-500">সোশ্যাল মিডিয়া বা সরাসরি লিংকের মাধ্যমে শেয়ার করুন</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Post Preview Summary Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${postTypeBadgeColor}`}>
                {postTypeText}
              </span>
              {shareTarget.category && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white text-slate-600 border border-slate-200">
                  {shareTarget.category}
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-slate-900 line-clamp-2 mb-1">
              {shareTarget.title}
            </h4>
            {shareTarget.summary && (
              <p className="text-xs text-slate-500 line-clamp-2">
                {shareTarget.summary}
              </p>
            )}
          </div>

          {/* 1-Click Social Media Grid */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2.5">
              সোশ্যাল মিডিয়ায় সরাসরি শেয়ার করুন:
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer text-center ${item.color}`}
                >
                  <div className="mb-1">{item.icon}</div>
                  <span className="text-xs font-bold">{item.banglaName}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Copy Direct Link Bar */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2">
              সরাসরি পোস্ট লিংক (Direct Link):
            </span>
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-transparent px-3 py-1.5 text-xs text-slate-700 font-mono select-all outline-hidden truncate"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Additional Share Actions: Device Native Share & QR Code */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>ফোনের অন্যান্য অ্যাপে শেয়ার</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-slate-600" />
              <span>{showQr ? 'QR কোড লুকান' : 'QR কোড দেখুন'}</span>
            </button>
          </div>

          {/* QR Code Section if toggled */}
          {showQr && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center animate-in fade-in zoom-in-95 duration-150">
              <p className="text-xs text-slate-600 font-semibold mb-3">
                মোবাইল ক্যামেরা দিয়ে স্ক্যান করে সরাসরি পোস্টটি ওপেন করুন:
              </p>
              <div className="inline-block p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(shareUrl)}`}
                  alt="Post QR Code"
                  className="w-36 h-36 mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
