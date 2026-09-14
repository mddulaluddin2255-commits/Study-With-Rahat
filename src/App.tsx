import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NoticeSection } from './components/NoticeSection';
import { JobSection } from './components/JobSection';
import { ResultSection } from './components/ResultSection';
import { CourseSection } from './components/CourseSection';
import { AdmissionSection } from './components/AdmissionSection';
import { SuggestionSection } from './components/SuggestionSection';
import { BookmarksView } from './components/BookmarksView';
import { AboutPage, ContactPage } from './components/AboutContactPages';
import { PostDetailPage } from './components/PostDetailPage';
import { CourseDetailPage } from './components/CourseDetailPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';

const MainContent: React.FC = () => {
  const { activeView } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900 antialiased selection:bg-blue-600 selection:text-white pb-14 md:pb-0">
      {/* 1. Sticky Navigation Header with News Ticker */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
      />

      {/* 2. Primary Views Area */}
      <main className="grow">
        {activeView === 'home' && <HomePage onOpenSearch={() => setSearchOpen(true)} />}
        {activeView === 'notices' && <NoticeSection />}
        {activeView === 'jobs' && <JobSection />}
        {activeView === 'results' && <ResultSection />}
        {activeView === 'courses' && <CourseSection />}
        {activeView === 'admissions' && <AdmissionSection />}
        {activeView === 'suggestions' && <SuggestionSection />}
        {activeView === 'bookmarks' && <BookmarksView />}
        {activeView === 'about' && <AboutPage />}
        {activeView === 'contact' && <ContactPage />}
        {activeView === 'post-detail' && <PostDetailPage />}
        {activeView === 'course-detail' && <CourseDetailPage />}
        {activeView === 'admin' && <AdminDashboard />}
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Mobile Sticky Bottom Navigation */}
      <MobileNav />

      {/* 5. Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* 6. Authentication Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
