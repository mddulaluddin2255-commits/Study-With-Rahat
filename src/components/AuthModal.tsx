import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Lock,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  ShieldAlert,
  Eye,
  EyeOff,
  Loader2,
  KeyRound,
  ArrowLeft,
  Sparkles,
  Shield
} from 'lucide-react';
import { isUserAdminEmail } from '../firebase/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'admin' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const {
    currentUser,
    firebaseLogout,
    navigateTo,
    adminPassword,
    verifyAdminPassword,
    upgradeCurrentUserToAdmin,
    firebaseLogin,
    firebaseSignUp,
    firebaseGoogleLogin,
    firebaseForgotPassword
  } = useApp();

  const [tab, setTab] = useState<'login' | 'admin' | 'register' | 'forgot'>(defaultTab);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecretKey, setAdminSecretKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'admin' | 'student'>('student');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [upgradeKeyInput, setUpgradeKeyInput] = useState('');
  const [upgradeMsg, setUpgradeMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Sync tab when modal opens or defaultTab changes
  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
      setErrorMsg('');
      setSuccessMsg('');
      setUpgradeMsg(null);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  // 1. Direct Admin Master Key Login
  const handleAdminKeyAccess = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const key = (adminSecretKey || password).trim();
    if (!key) {
      setErrorMsg('অনুগ্রহ করে এডমিন সিকিউরিটি পাসওয়ার্ড লিখুন।');
      return;
    }

    const isValid = verifyAdminPassword(key);
    if (isValid) {
      upgradeCurrentUserToAdmin(key);
      setSuccessMsg('এডমিন হিসেবে সফলভাবে অনুমোদন সম্পন্ন হয়েছে!');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
        navigateTo('admin');
      }, 700);
    } else {
      setErrorMsg('ভুল এডমিন পাসওয়ার্ড! সঠিক সিকিউরিটি পাসওয়ার্ড প্রদান করুন।');
    }
  };

  // 2. Email Auth (Student, Admin, or Register)
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim()) {
      setErrorMsg('অনুগ্রহ করে ইমেইল দিন।');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('অনুগ্রহ করে পাসওয়ার্ড দিন।');
      return;
    }

    setLoading(true);

    try {
      if (tab === 'register') {
        if (!name.trim()) {
          setErrorMsg('অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।');
          setLoading(false);
          return;
        }

        // If choosing Admin during registration, require master password validation
        if (role === 'admin' && !isUserAdminEmail(email)) {
          if (adminSecretKey.trim() !== adminPassword.trim()) {
            setErrorMsg('এডমিন অ্যাকাউন্ট তৈরি করতে সঠিক এডমিন মাস্টার কী প্রদান করুন।');
            setLoading(false);
            return;
          }
        }

        const res = await firebaseSignUp(email.trim(), password, name.trim(), role);
        if (res.success) {
          setSuccessMsg('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! আপনাকে স্বাগতম।');
          setTimeout(() => {
            setSuccessMsg('');
            onClose();
            if (res.user?.role === 'admin' || role === 'admin') {
              navigateTo('admin');
            }
          }, 800);
        } else {
          setErrorMsg(res.error || 'অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে।');
        }
      } else {
        // Tab is 'login' or 'admin'
        const isRequestingAdmin = tab === 'admin';

        // Check if master password was entered in the password field directly
        if (password.trim() === adminPassword.trim()) {
          const res = await firebaseLogin(email.trim(), password, 'admin');
          setSuccessMsg('এডমিন হিসেবে সফলভাবে প্রবেশ করেছেন!');
          setTimeout(() => {
            setSuccessMsg('');
            onClose();
            navigateTo('admin');
          }, 700);
          setLoading(false);
          return;
        }

        const res = await firebaseLogin(email.trim(), password, isRequestingAdmin ? 'admin' : 'student');
        if (res.success && res.user) {
          if (res.user.role === 'admin' || isRequestingAdmin) {
            setSuccessMsg('এডমিন ড্যাশবোর্ডে আপনাকে স্বাগতম!');
            setTimeout(() => {
              setSuccessMsg('');
              onClose();
              navigateTo('admin');
            }, 700);
          } else {
            setSuccessMsg('সফলভাবে লগইন সম্পন্ন হয়েছে!');
            setTimeout(() => {
              setSuccessMsg('');
              onClose();
            }, 700);
          }
        } else {
          setErrorMsg(res.error || 'লগইন ব্যর্থ হয়েছে। ইমেইল এবং পাসওয়ার্ড পরীক্ষা করুন।');
        }
      }
    } catch (err: any) {
      setErrorMsg('সার্ভারে সংযোগ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  // 3. Google Sign In
  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    try {
      const res = await firebaseGoogleLogin();
      if (res.success && res.user) {
        if (res.user.role === 'admin') {
          setSuccessMsg('এডমিন হিসেবে গুগল দিয়ে সফলভাবে প্রবেশ করেছেন!');
          setTimeout(() => {
            setSuccessMsg('');
            onClose();
            navigateTo('admin');
          }, 700);
        } else {
          setSuccessMsg('গুগল অ্যাকাউন্ট দিয়ে সফলভাবে লগইন হয়েছে!');
          setTimeout(() => {
            setSuccessMsg('');
            onClose();
          }, 700);
        }
      } else {
        setErrorMsg(res.error || 'গুগল সাইন-ইন সম্পন্ন করা যায়নি।');
      }
    } catch (err: any) {
      setErrorMsg('গুগল সাইন ইন ত্রুটি।');
    } finally {
      setLoading(false);
    }
  };

  // 4. Password Reset
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('পাসওয়ার্ড রিসেটের জন্য আপনার ইমেইল প্রদান করুন।');
      return;
    }
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await firebaseForgotPassword(email.trim());
      if (res.success) {
        setSuccessMsg(res.message);
      } else {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setErrorMsg('পাসওয়ার্ড রিসেট ইমেইল পাঠাতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  // 5. Upgrade existing logged in student to Admin
  const handleUpgradeToAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setUpgradeMsg(null);
    if (!upgradeKeyInput.trim()) {
      setUpgradeMsg({ text: 'অনুগ্রহ করে এডমিন পাসওয়ার্ড লিখুন', isError: true });
      return;
    }

    const success = upgradeCurrentUserToAdmin(upgradeKeyInput.trim());
    if (success) {
      setUpgradeMsg({ text: 'অভিনন্দন! আপনার অ্যাকাউন্টটি সফলভাবে এডমিন হিসেবে উন্নীত হয়েছে।', isError: false });
      setUpgradeKeyInput('');
      setTimeout(() => {
        onClose();
        navigateTo('admin');
      }, 900);
    } else {
      setUpgradeMsg({ text: 'ভুল এডমিন মাস্টার পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div
          className={`p-5 sm:p-6 text-white text-center relative transition-colors ${
            tab === 'admin'
              ? 'bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900'
              : 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800'
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 mx-auto mb-2.5 bg-white/15 rounded-2xl flex items-center justify-center shadow-inner">
            {tab === 'admin' ? (
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            ) : (
              <Lock className="w-6 h-6 text-white" />
            )}
          </div>
          
          <h3 className="text-xl font-bold tracking-tight">
            {tab === 'admin' ? 'এডমিন সিকিউরিটি পোর্টাল' : 'Study With Rahat অ্যাকাউন্ট'}
          </h3>
          <p className="text-xs text-blue-100/90 mt-1">
            {tab === 'admin'
              ? 'ওয়েবসাইট পরিচালনা ও কনটেন্ট ম্যানেজমেন্ট পোর্টাল'
              : 'Firebase Authentication ও ক্লাউড ডাটাবেজ সিকিউর্ড পোর্টাল'}
          </p>
        </div>

        {/* If already logged in */}
        {currentUser ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl mx-auto mb-3 overflow-hidden shadow-xs border-2 border-blue-200">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                currentUser.name.slice(0, 2)
              )}
            </div>
            <h4 className="font-bold text-slate-800 text-lg">{currentUser.name}</h4>
            <p className="text-sm text-slate-500 mb-2">{currentUser.email}</p>
            
            <div className="mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  currentUser.role === 'admin'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-blue-100 text-blue-900 border border-blue-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                {currentUser.role === 'admin' ? '👑 এডমিনিস্ট্রেটর (Admin)' : '🎓 শিক্ষার্থী সদস্য (Student)'}
              </span>
            </div>

            {/* If Student: Allow quick upgrade to Admin */}
            {currentUser.role === 'student' && (
              <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-left">
                <div className="flex items-center gap-2 mb-1.5 text-amber-900 font-bold text-xs">
                  <KeyRound className="w-4 h-4 text-amber-700" />
                  <span>এডমিন একাউন্টে পরিবর্তন করবেন?</span>
                </div>
                <p className="text-[11px] text-amber-800 mb-2.5 leading-relaxed">
                  আপনার কাছে এডমিন মাস্টার পাসওয়ার্ড থাকলে নিচে প্রদান করে অ্যাকাউন্টটিকে তাৎক্ষণিক <strong>Admin</strong> বানিয়ে নিন:
                </p>
                <form onSubmit={handleUpgradeToAdmin} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={upgradeKeyInput}
                      onChange={(e) => setUpgradeKeyInput(e.target.value)}
                      placeholder="মাস্টার পাসওয়ার্ড দিন"
                      className="grow px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
                    >
                      এডমিন বানান
                    </button>
                  </div>
                  {upgradeMsg && (
                    <p className={`text-[11px] font-medium ${upgradeMsg.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {upgradeMsg.text}
                    </p>
                  )}
                </form>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => {
                    onClose();
                    navigateTo('admin');
                  }}
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-bold transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Shield className="w-4 h-4" />
                  <span>এডমিন ড্যাশবোর্ডে প্রবেশ করুন</span>
                </button>
              )}
              
              <button
                onClick={async () => {
                  await firebaseLogout();
                  setSuccessMsg('লগআউট সম্পন্ন হয়েছে');
                  setTimeout(() => setSuccessMsg(''), 1000);
                }}
                className="w-full py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                লগআউট করুন
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            
            {/* 3 Main Tabs: Student Login | Admin Login | Sign Up */}
            {tab !== 'forgot' && (
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl mb-5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`py-2 px-1 text-center rounded-lg transition-all cursor-pointer ${
                    tab === 'login'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🎓 শিক্ষার্থী
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('admin');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`py-2 px-1 text-center rounded-lg transition-all cursor-pointer ${
                    tab === 'admin'
                      ? 'bg-amber-600 text-white shadow-xs font-bold'
                      : 'text-amber-800 hover:text-amber-900 font-bold bg-amber-50/70'
                  }`}
                >
                  🛡️ এডমিন
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('register');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`py-2 px-1 text-center rounded-lg transition-all cursor-pointer ${
                    tab === 'register'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📝 রেজিস্ট্রেশন
                </button>
              </div>
            )}

            {/* Forgot password back banner */}
            {tab === 'forgot' && (
              <div className="mb-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    setTab('login');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>লগইনে ফিরে যান</span>
                </button>
                <span className="text-xs font-bold text-slate-600">পাসওয়ার্ড পুনরুদ্ধার</span>
              </div>
            )}

            {/* Notifications */}
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span className="leading-relaxed font-medium">{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span className="leading-relaxed font-medium">{errorMsg}</span>
              </div>
            )}

            {/* =========================================================
                TAB 1: ADMIN LOGIN (Specialized Admin Authentication)
               ========================================================= */}
            {tab === 'admin' && (
              <div className="space-y-4">
                {/* Method 1: Instant Admin Key (Master Password) */}
                <div className="p-3.5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs mb-1">
                    <KeyRound className="w-4 h-4 text-amber-600" />
                    <span>মাস্টার সিকিউরিটি কী (সরাসরি এডমিন প্রবেশ)</span>
                  </div>
                  <p className="text-[11px] text-amber-700/90 mb-2.5 leading-relaxed">
                    এডমিন পাসওয়ার্ড দিয়ে ১-ক্লিকে তাৎক্ষণিক এডমিন প্যানেলে প্রবেশ করুন:
                  </p>
                  <form onSubmit={handleAdminKeyAccess} className="space-y-2.5">
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-amber-600/70" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={adminSecretKey}
                        onChange={(e) => setAdminSecretKey(e.target.value)}
                        placeholder="সিকিউরিটি পাসওয়ার্ড লিখুন"
                        className="w-full pl-9 pr-10 py-2 text-xs bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-amber-600/70 hover:text-amber-900 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>মাস্টার কী দিয়ে এডমিন প্রবেশ</span>
                    </button>
                  </form>
                </div>

                <div className="relative my-3 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium">
                    অথবা অনুমোদিত এডমিন ইমেইল দিয়ে
                  </span>
                </div>

                {/* Method 2: Authorized Admin Email Login */}
                <form onSubmit={handleEmailAuth} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">এডমিন ইমেইল</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@studywithrahat.com"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">অ্যাকাউন্ট পাসওয়ার্ড</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="আপনার পাসওয়ার্ড দিন"
                        className="w-full pl-9 pr-10 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-hidden"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>এডমিন একাউন্টে সাইন ইন করুন</span>
                  </button>
                </form>
              </div>
            )}

            {/* =========================================================
                TAB 2: STUDENT LOGIN
               ========================================================= */}
            {tab === 'login' && (
              <div>
                {/* Google Sign In */}
                <div className="mb-4">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Google দিয়ে দ্রুত প্রবেশ করুন</span>
                  </button>

                  <div className="relative my-4 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium">
                      অথবা ইমেইল দিয়ে
                    </span>
                  </div>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-slate-700">পাসওয়ার্ড</label>
                      <button
                        type="button"
                        onClick={() => {
                          setTab('forgot');
                          setErrorMsg('');
                          setSuccessMsg('');
                        }}
                        className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                      >
                        পাসওয়ার্ড ভুলে গেছেন?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="পাসওয়ার্ড দিন"
                        className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shadow-xs mt-3 cursor-pointer disabled:opacity-50"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>শিক্ষার্থী হিসেবে লগইন করুন</span>
                  </button>
                </form>

                {/* Quick link to switch to Admin portal */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setTab('admin');
                      setErrorMsg('');
                    }}
                    className="text-xs text-amber-800 hover:text-amber-900 font-bold hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>এডমিন লগইন করতে চান? এখানে ক্লিক করুন</span>
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================
                TAB 3: REGISTRATION (Sign Up)
               ========================================================= */}
            {tab === 'register' && (
              <form onSubmit={handleEmailAuth} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">পূর্ণ নাম</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="আপনার নাম লিখুন"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">পাসওয়ার্ড</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="কমপক্ষে ৬টি অক্ষরের পাসওয়ার্ড"
                      className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
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
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden bg-white text-slate-700"
                  >
                    <option value="student">🎓 শিক্ষার্থী / চাকরিপ্রার্থী (Student)</option>
                    <option value="admin">🛡️ এডমিনিস্ট্রেটর (Admin)</option>
                  </select>
                </div>

                {role === 'admin' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <label className="block text-xs font-bold text-amber-900 mb-1">
                      এডমিন মাস্টার সিকিউরিটি কী
                    </label>
                    <input
                      type="password"
                      value={adminSecretKey}
                      onChange={(e) => setAdminSecretKey(e.target.value)}
                      placeholder="মাস্টার কী দিন"
                      className="w-full px-3 py-1.5 text-xs border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden bg-white"
                      required
                    />
                    <p className="text-[10px] text-amber-700 mt-1">
                      অননুমোদিত রেজিস্ট্রেশন ঠেকাতে এডমিন সিকিউরিটি পিন প্রয়োজন।
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shadow-xs mt-3 cursor-pointer disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>রেজিস্ট্রেশন সম্পূর্ণ করুন</span>
                </button>
              </form>
            )}

            {/* =========================================================
                TAB 4: FORGOT PASSWORD
               ========================================================= */}
            {tab === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">আপনার নিবন্ধিত ইমেইল</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    আমরা এই ইমেইলে একটি নিরাপদ পাসওয়ার্ড রিসেট লিংক পাঠাব।
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>পাসওয়ার্ড রিসেট লিংক পাঠান</span>
                </button>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
