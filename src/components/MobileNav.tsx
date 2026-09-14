import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Bell, Briefcase, Sparkles, Bookmark, ShieldCheck } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeView, navigateTo, bookmarks, currentUser } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="grid grid-cols-5 gap-1">
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
            activeView === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">হোম</span>
        </button>

        <button
          onClick={() => navigateTo('notices')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
            activeView === 'notices' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">নোটিশ</span>
        </button>

        <button
          onClick={() => navigateTo('jobs')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
            activeView === 'jobs' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">চাকরি</span>
        </button>

        <button
          onClick={() => navigateTo('suggestions')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
            activeView === 'suggestions' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">সাজেশন</span>
        </button>

        <button
          onClick={() => navigateTo(currentUser?.role === 'admin' ? 'admin' : 'bookmarks')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg relative transition-colors ${
            activeView === 'bookmarks' || activeView === 'admin' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {currentUser?.role === 'admin' ? (
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
          <span className="text-[10px] mt-0.5">
            {currentUser?.role === 'admin' ? 'এডমিন' : 'সেভড'}
          </span>
          {currentUser?.role !== 'admin' && bookmarks.length > 0 && (
            <span className="absolute top-1 right-3.5 w-3.5 h-3.5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
              {bookmarks.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
