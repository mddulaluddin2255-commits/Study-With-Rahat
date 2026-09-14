import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  Bell,
  Briefcase,
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
  Layers,
  DollarSign,
  Settings,
  Users,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Check,
  X,
  FileText,
  Upload,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  KeyRound,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { NoticePost, JobPost, ResultPost, CoursePost, AdmissionPost, SuggestionPost } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    adminPassword,
    isAdminAuthenticated,
    verifyAdminPassword,
    setAdminPassword,
    lockAdmin,
    notices,
    jobs,
    results,
    courses,
    admissions,
    suggestions,
    ads,
    siteSettings,
    websiteViews,
    classes,
    jobCategories,
    addNotice,
    updateNotice,
    deleteNotice,
    addJob,
    updateJob,
    deleteJob,
    addResult,
    updateResult,
    deleteResult,
    addCourse,
    updateCourse,
    deleteCourse,
    addAdmission,
    updateAdmission,
    deleteAdmission,
    addSuggestion,
    updateSuggestion,
    deleteSuggestion,
    updateAd,
    updateSiteSettings,
    navigateTo
  } = useApp();

  type TabKey = 'overview' | 'notices' | 'jobs' | 'results' | 'courses' | 'admissions' | 'suggestions' | 'ads' | 'settings';
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  // Modal State for Adding/Editing
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'notice' | 'job' | 'result' | 'course' | 'admission' | 'suggestion'>('notice');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State for dynamic post creation
  const [formData, setFormData] = useState<any>({});

  // In-app Delete Confirmation Modal State (Fully working inside iframe/webviews)
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'notice' | 'job' | 'result' | 'course' | 'admission' | 'suggestion';
    id: string;
    title: string;
  } | null>(null);
  const [deleteToast, setDeleteToast] = useState<string>('');

  // Site Settings local state
  const [localSettings, setLocalSettings] = useState(siteSettings);
  const [savedSettingsMsg, setSavedSettingsMsg] = useState(false);

  // Admin Password Gate State
  const [enteredPass, setEnteredPass] = useState('');
  const [passError, setPassError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Settings tab: Change password state
  const [newAdminPass, setNewAdminPass] = useState('');
  const [showCurrentAdminPass, setShowCurrentAdminPass] = useState(false);
  const [passChangeSuccess, setPassChangeSuccess] = useState(false);

  const openCreateModal = (type: 'notice' | 'job' | 'result' | 'course' | 'admission' | 'suggestion') => {
    setModalType(type);
    setEditingId(null);

    // Default form values based on type
    if (type === 'notice') {
      setFormData({
        title: '',
        classCategory: 'SSC',
        description: '',
        fullContent: '',
        publishedDate: new Date().toISOString().split('T')[0],
        isImportant: false,
        isPublished: true,
        attachments: [{ name: 'অফিশিয়াল বিজ্ঞপ্তি PDF', url: 'https://example.com/notice.pdf', type: 'pdf' }]
      });
    } else if (type === 'job') {
      setFormData({
        title: '',
        orgName: '',
        jobType: 'Government',
        vacancies: '৫০ জন',
        qualification: 'স্নাতক / সমমান',
        ageLimit: '১৮-৩০ বছর',
        salary: '২২,০০০ - ৫৩,০৬০ টাকা',
        deadline: '৩০ এপ্রিল ২০২৬',
        location: 'ঢাকা',
        description: '',
        instructions: 'অনলাইনে আবেদন ফরম পূরণ করুন।',
        officialLink: 'http://teletalk.com.bd',
        isPublished: true
      });
    } else if (type === 'result') {
      setFormData({
        title: '',
        examName: 'SSC',
        year: '2026',
        boardOrUniversity: 'ঢাকা শিক্ষা বোর্ড',
        publishedDate: new Date().toISOString().split('T')[0],
        checkInstructions: 'অনলাইনে রোল ও রেজিস্ট্রেশন নম্বর দিয়ে রেজাল্ট দেখুন।',
        officialLink: 'https://eboardresults.com',
        smsFormat: 'SSC DHA 123456 2026',
        category: 'SSC Result',
        isPublished: true
      });
    } else if (type === 'course') {
      setFormData({
        title: '',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
        shortDesc: '',
        instructorName: 'রাহাত হোসাইন',
        instructorRole: 'মাস্টার ট্রেইনার ও আইসিটি এক্সপার্ট',
        duration: '৩ মাস (৬০+ লাইভ ক্লাস)',
        isPaid: false,
        price: 0,
        originalPrice: 1500,
        category: 'ICT',
        rating: 4.9,
        enrollCount: 120,
        isPublished: true,
        curriculum: [
          { module: 'মডিউল ১: প্রাথমিক পরিচিতি', topics: ['লেকচার ০১: পরিচিতি', 'লেকচার ০২: বেসিক ধারণা'] }
        ]
      });
    } else if (type === 'admission') {
      setFormData({
        title: '',
        institutionName: '',
        category: 'University',
        startDate: '০১ মে ২০২৬',
        deadline: '২৫ মে ২০২৬',
        eligibility: 'এসএসসি ও এইচএসসি উভয় পরীক্ষায় ন্যূনতম জিপিএ ৩.৫',
        applicationProcess: 'অনলাইনে আবেদন ফরম পূরণ করে ফি জমা দিন।',
        fee: '১০০০ ৳',
        officialLink: 'https://admission.ac.bd',
        isPublished: true
      });
    } else if (type === 'suggestion') {
      setFormData({
        title: '',
        classCategory: 'SSC',
        subject: 'Bangla',
        content: '',
        importantQuestions: ['গুরুত্বপূর্ণ সৃজনশীল প্রশ্ন ১', 'গুরুত্বপূর্ণ সৃজনশীল প্রশ্ন ২'],
        creativeQuestions: ['সৃজনশীল মডেল প্রশ্ন ক'],
        examTips: ['পয়েন্ট ভিত্তিক উত্তর লিখবেন'],
        downloadCount: 450,
        isPublished: true
      });
    }
    setModalOpen(true);
  };

  const handleEdit = (type: 'notice' | 'job' | 'result' | 'course' | 'admission' | 'suggestion', post: any) => {
    setModalType(type);
    setEditingId(post.id);
    setFormData({ ...post });
    setModalOpen(true);
  };

  const promptDelete = (type: 'notice' | 'job' | 'result' | 'course' | 'admission' | 'suggestion', id: string, title: string) => {
    setDeleteTarget({ type, id, title });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const { type, id, title } = deleteTarget;
    if (type === 'notice') deleteNotice(id);
    else if (type === 'job') deleteJob(id);
    else if (type === 'result') deleteResult(id);
    else if (type === 'course') deleteCourse(id);
    else if (type === 'admission') deleteAdmission(id);
    else if (type === 'suggestion') deleteSuggestion(id);

    setDeleteTarget(null);
    setDeleteToast(`"${title}" সফলভাবে মুছে ফেলা হয়েছে!`);
    setTimeout(() => {
      setDeleteToast('');
    }, 3500);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 50) || `post-${Date.now()}`;
    const payload = { ...formData, slug };

    if (modalType === 'notice') {
      if (editingId) updateNotice(editingId, payload);
      else addNotice(payload);
    } else if (modalType === 'job') {
      if (editingId) updateJob(editingId, payload);
      else addJob(payload);
    } else if (modalType === 'result') {
      if (editingId) updateResult(editingId, payload);
      else addResult(payload);
    } else if (modalType === 'course') {
      if (editingId) updateCourse(editingId, payload);
      else addCourse(payload);
    } else if (modalType === 'admission') {
      if (editingId) updateAdmission(editingId, payload);
      else addAdmission(payload);
    } else if (modalType === 'suggestion') {
      if (editingId) updateSuggestion(editingId, payload);
      else addSuggestion(payload);
    }

    setModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(localSettings);
    setSavedSettingsMsg(true);
    setTimeout(() => setSavedSettingsMsg(false), 2500);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setIsAuthenticating(true);
    setTimeout(() => {
      const isValid = verifyAdminPassword(enteredPass);
      if (!isValid) {
        setPassError('ভুল পাসওয়ার্ড! সঠিক এডমিন পাসওয়ার্ড প্রদান করুন।');
      } else {
        setEnteredPass('');
        setPassError('');
      }
      setIsAuthenticating(false);
    }, 200);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPass.trim()) return;
    setAdminPassword(newAdminPass.trim());
    setPassChangeSuccess(true);
    setNewAdminPass('');
    setTimeout(() => setPassChangeSuccess(false), 3000);
  };

  // PASSWORD PROTECTED GATE
  if (!isAdminAuthenticated || currentUser?.role !== 'admin') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 text-white text-center relative overflow-hidden">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xs border border-white/20 shadow-inner">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold font-sans tracking-tight">অ্যাডমিন ড্যাশবোর্ড সিকিউরিটি</h2>
            <p className="text-xs text-slate-300 mt-2">
              Study With Rahat এডমিন প্যানেলে প্রবেশ করতে এডমিন পাসওয়ার্ড দিন
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handlePasswordSubmit} className="p-8 space-y-5">
            {passError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="font-medium">{passError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                এডমিন পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={enteredPass}
                  onChange={(e) => {
                    setEnteredPass(e.target.value);
                    if (passError) setPassError('');
                  }}
                  placeholder="পাসওয়ার্ড লিখুন..."
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-hidden font-medium pr-11"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 transition-colors p-0.5 cursor-pointer"
                  title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAuthenticating ? 'যাচাই করা হচ্ছে...' : 'ড্যাশবোর্ডে প্রবেশ করুন'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="w-full py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              ← মূল ওয়েবসাইটে ফিরে যান
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Admin Top Navigation & Header */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>অ্যাডমিন কন্ট্রোল সেন্টার • Study With Rahat CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-sans">
            অ্যাডমিন ড্যাশবোর্ড (Admin Management)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            নোটিশ, চাকরির সার্কুলার, কোর্স, সাজেশন ও সাইটের বিজ্ঞাপন ও সেটিংস নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>অ্যাডমিন: সক্রিয় (রাহাত)</span>
          </div>

          <button
            onClick={() => lockAdmin()}
            className="px-3.5 py-2 bg-rose-600/90 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="ড্যাশবোর্ড লক করুন"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>লক করুন (Logout)</span>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>লাইভ সাইট দেখুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Post Delete Confirmation Toast */}
      {deleteToast && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <span>{deleteToast}</span>
          </div>
          <button
            onClick={() => setDeleteToast('')}
            className="text-emerald-600 hover:text-emerald-900 p-1 cursor-pointer transition-colors"
            title="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs Menu */}
      <div className="flex items-center gap-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs mb-8 overflow-x-auto">
        {[
          { key: 'overview', label: 'ওভারভিউ', icon: BarChart3 },
          { key: 'notices', label: `নোটিশ (${notices.length})`, icon: Bell },
          { key: 'jobs', label: `চাকরির খবর (${jobs.length})`, icon: Briefcase },
          { key: 'results', label: `রেজাল্ট (${results.length})`, icon: Award },
          { key: 'courses', label: `কোর্স (${courses.length})`, icon: BookOpen },
          { key: 'admissions', label: `ভর্তি (${admissions.length})`, icon: GraduationCap },
          { key: 'suggestions', label: `সাজেশন (${suggestions.length})`, icon: Sparkles },
          { key: 'ads', label: 'বিজ্ঞাপন (Ads)', icon: DollarSign },
          { key: 'settings', label: 'সাইট সেটিংস', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">মোট নোটিশ</span>
              <span className="text-2xl font-black text-blue-600">{notices.length}</span>
              <span className="text-[10px] text-emerald-600 block mt-1 font-medium">১০টি শ্রেণিতে সক্রিয়</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">চাকরির পোস্ট</span>
              <span className="text-2xl font-black text-emerald-600">{jobs.length}</span>
              <span className="text-[10px] text-slate-400 block mt-1">নিয়োগ বিজ্ঞপ্তি</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">প্রকাশিত রেজাল্ট</span>
              <span className="text-2xl font-black text-purple-600">{results.length}</span>
              <span className="text-[10px] text-slate-400 block mt-1">বোর্ড রেজাল্ট</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">অনলাইন কোর্স</span>
              <span className="text-2xl font-black text-blue-800">{courses.length}</span>
              <span className="text-[10px] text-slate-400 block mt-1">লাইভ ও রেকর্ডেড</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">বোর্ড সাজেশন</span>
              <span className="text-2xl font-black text-teal-600">{suggestions.length}</span>
              <span className="text-[10px] text-slate-400 block mt-1">CQ ও MCQ নোটস</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">ওয়েবসাইট ভিজিটর</span>
              <span className="text-2xl font-black text-slate-900">{websiteViews.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-600 block mt-1 font-semibold">+১২% দৈনিক বৃদ্ধি</span>
            </div>
          </div>

          {/* Quick Action Buttons for Admin */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">দ্রুত নতুন তথ্য প্রকাশ করুন (Publish Content)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <button
                onClick={() => openCreateModal('notice')}
                className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border border-blue-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ নতুন নোটিশ</span>
              </button>

              <button
                onClick={() => openCreateModal('job')}
                className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border border-emerald-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ চাকরির সার্কুলার</span>
              </button>

              <button
                onClick={() => openCreateModal('result')}
                className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border border-purple-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ পরীক্ষার রেজাল্ট</span>
              </button>

              <button
                onClick={() => openCreateModal('course')}
                className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border border-indigo-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ নতুন কোর্স</span>
              </button>

              <button
                onClick={() => openCreateModal('admission')}
                className="p-3 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border border-rose-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ ভর্তি তথ্য</span>
              </button>

              <button
                onClick={() => openCreateModal('suggestion')}
                className="p-3 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 border border-teal-200 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ পরীক্ষার সাজেশন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NOTICES */}
      {activeTab === 'notices' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">সকল ক্লাস নোটিশ তালিকা</h3>
            <button
              onClick={() => openCreateModal('notice')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন নোটিশ যোগ করুন</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">শিরোনাম</th>
                  <th className="p-3">শ্রেণি</th>
                  <th className="p-3">প্রকাশের তারিখ</th>
                  <th className="p-3">গুরুত্ব</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {notices.map(n => (
                  <tr key={n.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">{n.title}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700">{n.classCategory}</span></td>
                    <td className="p-3">{n.publishedDate}</td>
                    <td className="p-3">
                      {n.isImportant ? (
                        <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">জরুরি</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">সাধারণ</span>
                      )}
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit('notice', n)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        title="এডিট"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => promptDelete('notice', n.id, n.title)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: JOBS */}
      {activeTab === 'jobs' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">সকল চাকরির সার্কুলার তালিকা</h3>
            <button
              onClick={() => openCreateModal('job')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন চাকরির খবর পোস্ট করুন</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">পদের নাম ও সার্কুলার</th>
                  <th className="p-3">প্রতিষ্ঠান</th>
                  <th className="p-3">ক্যাটাগরি</th>
                  <th className="p-3">শেষ তারিখ</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map(j => (
                  <tr key={j.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">{j.title}</td>
                    <td className="p-3">{j.orgName}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">{j.jobType}</span></td>
                    <td className="p-3 font-bold text-amber-700">{j.deadline}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit('job', j)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        title="এডিট"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => promptDelete('job', j.id, j.title)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: RESULTS */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">ফলাফল ও রেজাল্ট পোস্ট তালিকা</h3>
            <button
              onClick={() => openCreateModal('result')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন রেজাল্ট যুক্ত করুন</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">শিরোনাম</th>
                  <th className="p-3">পরীক্ষা ও সাল</th>
                  <th className="p-3">বোর্ড / বিশ্ববিদ্যালয়</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">{r.title}</td>
                    <td className="p-3">{r.examName} ({r.year})</td>
                    <td className="p-3">{r.boardOrUniversity}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit('result', r)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        title="এডিট"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => promptDelete('result', r.id, r.title)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: COURSES */}
      {activeTab === 'courses' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">অনলাইন কোর্সসমূহ</h3>
            <button
              onClick={() => openCreateModal('course')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন কোর্স যোগ করুন</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">কোর্সের নাম</th>
                  <th className="p-3">ইন্সট্রাক্টর</th>
                  <th className="p-3">ক্যাটাগরি</th>
                  <th className="p-3">ফি</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">{c.title}</td>
                    <td className="p-3">{c.instructorName}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700">{c.category}</span></td>
                    <td className="p-3 font-bold">{c.isPaid ? `${c.price} ৳` : 'ফ্রি'}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit('course', c)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        title="এডিট"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => promptDelete('course', c.id, c.title)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: ADMISSIONS */}
      {activeTab === 'admissions' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">ভর্তি বিজ্ঞপ্তি তালিকা</h3>
            <button
              onClick={() => openCreateModal('admission')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ভর্তি তথ্য যোগ করুন</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">প্রতিষ্ঠানের নাম</th>
                  <th className="p-3">ক্যাটাগরি</th>
                  <th className="p-3">আবেদনের শেষ তারিখ</th>
                  <th className="p-3">ফি</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admissions.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">{a.institutionName}</td>
                    <td className="p-3">{a.category}</td>
                    <td className="p-3 font-bold text-rose-700">{a.deadline}</td>
                    <td className="p-3">{a.fee}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit('admission', a)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        title="এডিট"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => promptDelete('admission', a.id, a.institutionName)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: SUGGESTIONS */}
      {activeTab === 'suggestions' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">ক্লাস ভিত্তিক পরীক্ষার সাজেশন</h3>
            <button
              onClick={() => openCreateModal('suggestion')}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন সাজেশন যুক্ত করুন</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">শিরোনাম</th>
                  <th className="p-3">শ্রেণি</th>
                  <th className="p-3">বিষয়</th>
                  <th className="p-3">ডাউনলোড সংখ্যা</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suggestions.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">{s.title}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-medium">{s.classCategory}</span></td>
                    <td className="p-3">{s.subject}</td>
                    <td className="p-3 font-semibold">{s.downloadCount}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit('suggestion', s)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        title="এডিট"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => promptDelete('suggestion', s.id, s.title)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: ADS MANAGER */}
      {activeTab === 'ads' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">বিজ্ঞাপন ব্যবস্থাপনা (Ads Manager)</h3>
            <p className="text-xs text-slate-500">
              গুগল অ্যাডসেন্স (Google AdSense) কোড বা কাস্টম ব্যানার বিজ্ঞাপন প্রদর্শন এবং নিয়ন্ত্রণ করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ads.map(ad => (
              <div key={ad.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">{ad.title}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ad.enabled}
                        onChange={(e) => updateAd(ad.id, { enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono block mb-2">{ad.slotName} ({ad.placement})</span>
                  <textarea
                    rows={3}
                    value={ad.code}
                    onChange={(e) => updateAd(ad.id, { code: e.target.value })}
                    className="w-full text-xs font-mono p-2 border border-slate-200 rounded-lg bg-white"
                    placeholder="AdSense / HTML Script কোড লিখুন"
                  />
                </div>
                <div className="mt-3 text-right">
                  <span className="text-[11px] text-emerald-600 font-medium">✓ পরিবর্তন স্বয়ংক্রিয়ভাবে সংরক্ষিত</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: SITE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 max-w-3xl">
          <h3 className="text-base font-bold text-slate-900 mb-2">ওয়েবসাইট ব্র্যান্ডিং ও সেটিংস</h3>
          <p className="text-xs text-slate-500 mb-6">সাইটের নাম, ট্যাগলাইন, হটলাইন ও সোশ্যাল লিংক পরিবর্তন করুন।</p>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">ওয়েবসাইটের নাম</label>
              <input
                type="text"
                value={localSettings.websiteName}
                onChange={(e) => setLocalSettings({ ...localSettings, websiteName: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">ট্যাগলাইন (Tagline)</label>
              <input
                type="text"
                value={localSettings.tagline}
                onChange={(e) => setLocalSettings({ ...localSettings, tagline: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">যোগাযোগ ফোন / হটলাইন</label>
                <input
                  type="text"
                  value={localSettings.phone}
                  onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">অফিসিয়াল ইমেইল</label>
                <input
                  type="email"
                  value={localSettings.email}
                  onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">অফিসের ঠিকানা</label>
              <input
                type="text"
                value={localSettings.address}
                onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={localSettings.facebook}
                  onChange={(e) => setLocalSettings({ ...localSettings, facebook: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">YouTube URL</label>
                <input
                  type="text"
                  value={localSettings.youtube}
                  onChange={(e) => setLocalSettings({ ...localSettings, youtube: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Telegram URL</label>
                <input
                  type="text"
                  value={localSettings.telegram}
                  onChange={(e) => setLocalSettings({ ...localSettings, telegram: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                সেটিংস সংরক্ষণ করুন
              </button>

              {savedSettingsMsg && (
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4" /> সেটিংস সফলভাবে আপডেট হয়েছে!
                </span>
              )}
            </div>
          </form>

          {/* Admin Security Password Card */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">অ্যাডমিন পাসওয়ার্ড ও সিকিউরিটি</h3>
                <p className="text-xs text-slate-500">ড্যাশবোর্ড সুরক্ষার জন্য বর্তমান পাসওয়ার্ড বা নতুন পাসওয়ার্ড নির্ধারণ করুন</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 max-w-xl">
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200 text-xs sm:text-sm">
                <span className="text-slate-600">বর্তমান এডমিন পাসওয়ার্ড:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-300">
                    {showCurrentAdminPass ? adminPassword : '••••••••••••'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCurrentAdminPass(!showCurrentAdminPass)}
                    className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg cursor-pointer transition-colors"
                    title={showCurrentAdminPass ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                  >
                    {showCurrentAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    পাসওয়ার্ড পরিবর্তন করতে নতুন পাসওয়ার্ড লিখুন
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={newAdminPass}
                      onChange={(e) => setNewAdminPass(e.target.value)}
                      placeholder="নতুন পাসওয়ার্ড লিখুন..."
                      className="grow px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                    <button
                      type="submit"
                      disabled={!newAdminPass.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      পাসওয়ার্ড পরিবর্তন করুন
                    </button>
                  </div>
                </div>

                {passChangeSuccess && (
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-2">
                    <Check className="w-4 h-4" /> এডমিন পাসওয়ার্ড সফলভাবে আপডেট হয়েছে!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-600" />
              <span>{editingId ? 'পোস্ট সম্পাদনা করুন' : 'নতুন তথ্য প্রকাশ করুন'}</span>
            </h3>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-slate-700 mb-1">পোস্টের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="শিরোনাম লিখুন..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Notice Specific Fields */}
              {modalType === 'notice' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">শ্রেণি / ক্যাটাগরি</label>
                      <select
                        value={formData.classCategory || 'SSC'}
                        onChange={e => setFormData({ ...formData, classCategory: e.target.value })}
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      >
                        {classes.filter(c => c !== 'All').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">বিজ্ঞপ্তির গুরুত্ব</label>
                      <label className="flex items-center gap-2 p-2 border border-slate-200 rounded-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isImportant || false}
                          onChange={e => setFormData({ ...formData, isImportant: e.target.checked })}
                          className="rounded text-blue-600"
                        />
                        <span className="font-semibold text-red-600">জরুরি নোটিশ হিসেবে মার্ক করুন</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
                    <textarea
                      rows={2}
                      value={formData.description || ''}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="নোটিশের সারসংক্ষেপ..."
                      className="w-full p-2.5 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">পূর্ণাঙ্গ নোটিশের বিবরণ</label>
                    <textarea
                      rows={5}
                      value={formData.fullContent || ''}
                      onChange={e => setFormData({ ...formData, fullContent: e.target.value })}
                      placeholder="বিস্তারিত নোটিশের লেখা..."
                      className="w-full p-2.5 border border-slate-200 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* Job Specific Fields */}
              {modalType === 'job' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">প্রতিষ্ঠানের নাম *</label>
                      <input
                        type="text"
                        required
                        value={formData.orgName || ''}
                        onChange={e => setFormData({ ...formData, orgName: e.target.value })}
                        placeholder="যেমন: বাংলাদেশ রেলওয়ে"
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">চাকরির ধরন</label>
                      <select
                        value={formData.jobType || 'Government'}
                        onChange={e => setFormData({ ...formData, jobType: e.target.value })}
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      >
                        {jobCategories.filter(c => c !== 'All').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">পদসংখ্যা</label>
                      <input
                        type="text"
                        value={formData.vacancies || ''}
                        onChange={e => setFormData({ ...formData, vacancies: e.target.value })}
                        placeholder="যেমন: ৩৫০ জন"
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">আবেদনের শেষ তারিখ *</label>
                      <input
                        type="text"
                        required
                        value={formData.deadline || ''}
                        onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                        placeholder="যেমন: ৩০ মে ২০২৬"
                        className="w-full p-2 border border-slate-200 rounded-xl font-bold text-amber-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">অনলাইন আবেদনের অফিশিয়াল লিংক</label>
                    <input
                      type="text"
                      value={formData.officialLink || ''}
                      onChange={e => setFormData({ ...formData, officialLink: e.target.value })}
                      placeholder="https://..."
                      className="w-full p-2 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">বিস্তারিত সার্কুলার বিবরণ</label>
                    <textarea
                      rows={4}
                      value={formData.description || ''}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* Result Specific */}
              {modalType === 'result' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">বোর্ড বা বিশ্ববিদ্যালয়</label>
                      <input
                        type="text"
                        value={formData.boardOrUniversity || ''}
                        onChange={e => setFormData({ ...formData, boardOrUniversity: e.target.value })}
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">রেজাল্ট চেক নির্দেশিকা</label>
                      <input
                        type="text"
                        value={formData.smsFormat || ''}
                        onChange={e => setFormData({ ...formData, smsFormat: e.target.value })}
                        placeholder="SSC DHA 123456 2026"
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Course Specific */}
              {modalType === 'course' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">কোর্স ফি (টাকা)</label>
                      <input
                        type="number"
                        value={formData.price || 0}
                        onChange={e => {
                          const val = Number(e.target.value);
                          setFormData({ ...formData, price: val, isPaid: val > 0 });
                        }}
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">ইন্সট্রাক্টর</label>
                      <input
                        type="text"
                        value={formData.instructorName || ''}
                        onChange={e => setFormData({ ...formData, instructorName: e.target.value })}
                        className="w-full p-2 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal (Reliable across all browser environments) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 text-center overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">আপনি কি এই পোস্টটি মুছে ফেলতে চান?</h3>
            <p className="text-xs text-slate-500 mb-4">
              এটি ড্যাশবোর্ড এবং মূল ওয়েবসাইট থেকে মুছে ফেলা হবে।
            </p>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-6 text-left">
              <span className="text-slate-400 font-semibold block text-[11px] uppercase mb-1">পোস্টের নাম / শিরোনাম:</span>
              <p className="text-xs font-bold text-slate-800 line-clamp-2">"{deleteTarget.title}"</p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                বাতিল করুন
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>হ্যাঁ, মুছে ফেলুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
