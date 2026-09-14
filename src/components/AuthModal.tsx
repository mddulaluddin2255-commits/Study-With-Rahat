import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, ShieldCheck, CheckCircle2, ShieldAlert, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const { login, currentUser, logout, navigateTo, adminPassword } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'admin' | 'student'>('student');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email) return;

    if (role === 'admin') {
      if (password.trim() !== adminPassword.trim()) {
        setErrorMsg('ভুল এডমিন পাসওয়ার্ড! এডমিন ড্যাশবোর্ডে প্রবেশের সঠিক পাসওয়ার্ড প্রদান করুন।');
        return;
      }
    }

    const success = login(email, role, password);
    if (!success) {
      setErrorMsg('লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে তথ্য পুনরায় পরীক্ষা করুন।');
      return;
    }

    setSuccessMsg('সফলভাবে লগইন সম্পন্ন হয়েছে!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
      if (role === 'admin') {
        navigateTo('admin');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 mx-auto mb-3 bg-white/15 rounded-xl flex items-center justify-center shadow-inner">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">Study With Rahat অ্যাকাউন্ট</h3>
          <p className="text-xs text-blue-100 mt-1">
            শিক্ষা, চাকরি ও ভর্তি তথ্যের নির্ভরযোগ্য পোর্টালে স্বাগতম
          </p>
        </div>

        {/* If already logged in */}
        {currentUser ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl mx-auto mb-3">
              {currentUser.name.slice(0, 2)}
            </div>
            <h4 className="font-bold text-slate-800 text-lg">{currentUser.name}</h4>
            <p className="text-sm text-slate-500 mb-2">{currentUser.email}</p>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              currentUser.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              {currentUser.role === 'admin' ? 'এডমিন (Admin Privileges)' : 'শিক্ষার্থী সদস্য (Student)'}
            </span>

            <div className="mt-6 flex flex-col gap-2.5">
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => {
                    onClose();
                    navigateTo('admin');
                  }}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  এডমিন ড্যাশবোর্ডে যান
                </button>
              )}
              <button
                onClick={() => {
                  logout();
                  setSuccessMsg('লগআউট সম্পন্ন হয়েছে');
                  setTimeout(() => setSuccessMsg(''), 1000);
                }}
                className="w-full py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-medium transition-colors"
              >
                লগআউট করুন
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Tab switch */}
            <div className="flex border-b border-slate-200 mb-5">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 pb-3 text-sm font-semibold text-center border-b-2 transition-colors cursor-pointer ${
                  tab === 'login'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                লগইন (Login)
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 pb-3 text-sm font-semibold text-center border-b-2 transition-colors cursor-pointer ${
                  tab === 'register'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                রেজিস্ট্রেশন (Sign Up)
              </button>
            </div>

            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Login / Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">পূর্ণ নাম</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="আপনার নাম লিখুন"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                      required={tab === 'register'}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">পাসওয়ার্ড</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="পাসওয়ার্ড লিখুন"
                    className="w-full pl-9 pr-10 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">অ্যাকাউন্টের ধরন</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'student')}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden bg-white text-slate-700"
                >
                  <option value="student">শিক্ষার্থী / চাকরিপ্রার্থী (Student/Job Seeker)</option>
                  <option value="admin">এডমিন (Administrator Dashboard Access)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm mt-2 cursor-pointer"
              >
                {tab === 'login' ? 'লগইন করুন' : 'অ্যাকাউন্ট তৈরি করুন'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
