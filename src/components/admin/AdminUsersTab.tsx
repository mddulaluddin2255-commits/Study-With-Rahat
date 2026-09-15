import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  ShieldCheck,
  GraduationCap,
  CheckCircle2,
  XCircle,
  UserCheck,
  UserX,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';
import { AppUser } from '../../types';

export const AdminUsersTab: React.FC = () => {
  const { users, changeUserRole, toggleUserStatus, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'admin' | 'student'>('All');
  const [actionToast, setActionToast] = useState<string>('');

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        !searchTerm ||
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const adminCount = users.filter((u) => u.role === 'admin').length;
  const studentCount = users.filter((u) => u.role === 'student').length;

  const handleRoleToggle = (user: AppUser) => {
    const newRole = user.role === 'admin' ? 'student' : 'admin';
    changeUserRole(user.id, newRole);
    setActionToast(`"${user.name}"-কে ${newRole === 'admin' ? 'এডমিন' : 'শিক্ষার্থী'} রোলে পরিবর্তন করা হয়েছে।`);
    setTimeout(() => setActionToast(''), 3000);
  };

  const handleStatusToggle = (user: AppUser) => {
    toggleUserStatus(user.id);
    setActionToast(`"${user.name}"-এর স্ট্যাটাস পরিবর্তন করা হয়েছে।`);
    setTimeout(() => setActionToast(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {actionToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">মোট নিবন্ধিত ইউজার</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{users.length}</span>
          <span className="text-[10px] text-slate-400 mt-1 block">Cloud Firestore users কালেকশন</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">অ্যাডমিনিস্ট্রেটর</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-amber-600 mt-2 block">{adminCount}</span>
          <span className="text-[10px] text-amber-600 mt-1 block">পূর্ণাঙ্গ CMS অ্যাক্সেসপ্রাপ্ত</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">শিক্ষার্থী ও সাধারণ সদস্য</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-indigo-600 mt-2 block">{studentCount}</span>
          <span className="text-[10px] text-slate-400 mt-1 block">বুকমার্ক ও কোর্স তালিকাভুক্ত</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ইউজারের নাম বা ইমেইল দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {(['All', 'admin', 'student'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                roleFilter === r
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {r === 'All' ? 'সকল ইউজার' : r === 'admin' ? 'অ্যাডমিন' : 'শিক্ষার্থী'}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ইউজার ও তথ্য</th>
                <th className="py-3 px-4">ইমেইল ঠিকানা</th>
                <th className="py-3 px-4">রোল (Role)</th>
                <th className="py-3 px-4">নিবন্ধনের তারিখ</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">পদক্ষেপ (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    কোনো ইউজার পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isCurrent = currentUser?.email === u.email || currentUser?.id === u.id;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                            {u.avatar ? (
                              <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                            ) : (
                              u.name.slice(0, 2)
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {isCurrent && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-normal">
                                  আপনি
                                </span>
                              )}
                            </p>
                            <span className="text-[10px] font-mono text-slate-400">UID: {u.id.slice(0, 10)}...</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                        {u.email}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            u.role === 'admin'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {u.role === 'admin' ? (
                            <>
                              <ShieldCheck className="w-3 h-3 text-amber-600" />
                              <span>Admin</span>
                            </>
                          ) : (
                            <>
                              <GraduationCap className="w-3 h-3 text-blue-600" />
                              <span>Student</span>
                            </>
                          )}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-500">
                        {u.createdAt ? u.createdAt.split('T')[0] : '২০২৬-০৩-১৪'}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold ${
                            u.isActive !== false ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {u.isActive !== false ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>সক্রিয়</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>স্থগিত</span>
                            </>
                          )}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Role Toggle Button */}
                          <button
                            type="button"
                            onClick={() => handleRoleToggle(u)}
                            className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer transition-colors"
                            title={u.role === 'admin' ? 'শিক্ষার্থী বানান' : 'এডমিন বানান'}
                          >
                            {u.role === 'admin' ? 'Student করুন' : 'Admin করুন'}
                          </button>

                          {/* Status Toggle Button */}
                          <button
                            type="button"
                            onClick={() => handleStatusToggle(u)}
                            className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                              u.isActive !== false
                                ? 'border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                                : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={u.isActive !== false ? 'স্থগিত করুন' : 'সক্রিয় করুন'}
                          >
                            {u.isActive !== false ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
