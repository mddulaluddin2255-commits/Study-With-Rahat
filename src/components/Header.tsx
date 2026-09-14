import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Search,
  Bell,
  Bookmark,
  User,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Send,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Check
} from 'lucide-react';

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth, onOpenSearch }) => {
  const {
    activeView,
    navigateTo,
    siteSettings,
    currentUser,
    bookmarks,
    notifications,
    unreadNotifCount,
    markNotifAsRead,
    markAllNotifsAsRead,
    navigateToPost
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'হোম' },
    { id: 'notices', label: 'ক্লাস ভিত্তিক নোটিশ' },
    { id: 'results', label: 'রেজাল্ট' },
    { id: 'jobs', label: 'চাকরির খবর' },
    { id: 'courses', label: 'কোর্স' },
    { id: 'admissions', label: 'ভর্তি তথ্য' },
    { id: 'suggestions', label: 'সাজেশন' },
    { id: 'about', label: 'আমাদের সম্পর্কে' },
    { id: 'contact', label: 'যোগাযোগ' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs border-b border-slate-200">
      {/* 1. Top Mini Bar - Breaking Updates & Quick Contact */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Breaking Ticker */}
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <span className="shrink-0 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded-full font-bold text-[10px] tracking-wider uppercase animate-pulse">
              <Sparkles className="w-3 h-3" /> জরুরি নোটিশ
            </span>
            <div className="overflow-hidden whitespace-nowrap text-blue-100 text-xs truncate">
              <span className="cursor-pointer hover:underline" onClick={() => navigateTo('notices')}>
                এসএসসি পরীক্ষা ২০২৬ ফরম পূরণ চলছে • ৪৭তম বিসিএস পরীক্ষার ৩,৪৮০ পদের বিজ্ঞপ্তি প্রকাশিত • ঢাকা বিশ্ববিদ্যালয় ভর্তি আবেদন শুরু
              </span>
            </div>
          </div>

          {/* Social / Helpline Links */}
          <div className="hidden md:flex items-center gap-4 shrink-0 text-blue-200">
            <a
              href={siteSettings.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>টেলিগ্রাম চ্যানেল</span>
            </a>
            <span className="text-blue-400">|</span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>{siteSettings.phone}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Branding & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 border-2 border-white/20">
            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-900 font-sans group-hover:text-blue-600 transition-colors">
                {siteSettings.websiteName}
              </span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                PORTAL
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-tight line-clamp-1">
              {siteSettings.tagline}
            </p>
          </div>
        </div>

        {/* Global Search Input Button (Middle on desktop) */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 bg-slate-100/90 hover:bg-slate-100 hover:text-slate-600 rounded-xl border border-slate-200 transition-all cursor-pointer group"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
              <span>নোটিশ, রেজাল্ট, চাকরির খবর বা কোর্স খুঁজুন...</span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-300 rounded-md shadow-2xs">
              Search
            </kbd>
          </button>
        </div>

        {/* Actions (Search icon mobile, Notification, Bookmarks, Login/Admin) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search button */}
          <button
            onClick={onOpenSearch}
            className="lg:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
            title="অনুসন্ধান"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Bookmarks Quick Trigger */}
          <button
            onClick={() => navigateTo('bookmarks')}
            className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
              activeView === 'bookmarks'
                ? 'bg-blue-100 text-blue-700'
                : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
            title="সংরক্ষিত পোস্টসমূহ"
          >
            <Bookmark className="w-5 h-5" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {bookmarks.length}
              </span>
            )}
          </button>

          {/* Notification Popover Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
              title="নোটিফিকেশন"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-xs">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3.5 bg-blue-50/80 border-b border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-blue-700" />
                    <h4 className="text-xs font-bold text-blue-950">গুরুত্বপূর্ণ নোটিফিকেশন</h4>
                  </div>
                  {unreadNotifCount > 0 && (
                    <button
                      onClick={markAllNotifsAsRead}
                      className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 cursor-pointer"
                    >
                      <Check className="w-3 h-3" /> সব পঠিত
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length > 0 ? (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotifAsRead(n.id);
                          setIsNotifOpen(false);
                          navigateToPost(n.type, n.linkPostId);
                        }}
                        className={`p-3 text-xs hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-2.5 ${
                          !n.isRead ? 'bg-blue-50/40 font-semibold text-slate-900' : 'text-slate-600'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.isRead ? 'bg-blue-600' : 'bg-slate-300'}`} />
                        <div className="flex-1">
                          <p className="line-clamp-2 leading-relaxed">{n.title}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.date}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-400">
                      কোনো নতুন নোটিফিকেশন নেই
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Account / Admin Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              {currentUser.role === 'admin' ? (
                <button
                  onClick={() => navigateTo('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                    activeView === 'admin'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span className="hidden sm:inline">এডমিন ড্যাশবোর্ড</span>
                  <span className="sm:hidden">এডমিন</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-semibold border border-blue-200 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>লগইন / এডমিন</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="মেনু"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Primary Navigation Bar (Desktop) */}
      <nav className="hidden md:block bg-blue-700 text-white border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <ul className="flex items-center gap-1 py-1 overflow-x-auto scrollbar-none text-xs font-semibold tracking-wide">
            {navLinks.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => navigateTo(link.id as any)}
                  className={`px-3 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeView === link.id
                      ? 'bg-white text-blue-900 shadow-2xs font-bold'
                      : 'text-blue-100 hover:bg-blue-600/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2 text-xs text-blue-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>সরাসরি আপডেট ২০২৬</span>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  navigateTo(link.id as any);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  activeView === link.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-blue-50'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenAuth();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold text-center"
            >
              {currentUser ? 'অ্যাকাউন্ট প্রোফাইল' : 'লগইন / এডমিন প্যানেল'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
