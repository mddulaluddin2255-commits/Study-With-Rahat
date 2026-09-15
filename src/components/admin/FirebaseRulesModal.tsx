import React, { useState } from 'react';
import { Shield, Copy, Check, X, FileCode2, ExternalLink } from 'lucide-react';

interface FirebaseRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseRulesModal: React.FC<FirebaseRulesModalProps> = ({ isOpen, onClose }) => {
  const [copiedFirestore, setCopiedFirestore] = useState(false);
  const [copiedStorage, setCopiedStorage] = useState(false);
  const [activeRuleTab, setActiveRuleTab] = useState<'firestore' | 'storage'>('firestore');

  if (!isOpen) return null;

  const firestoreRulesText = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() && 
        (
          request.auth.token.email == 'admin@studywithrahat.com' ||
          request.auth.token.email == 'mdsojibhossain96714496@gmail.com' ||
          (exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin')
        );
    }

    // Users Collection
    match /users/{userId} {
      allow read: if isAuthenticated() && (isOwner(userId) || isAdmin());
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isAuthenticated() && (
        isAdmin() || 
        (isOwner(userId) && (!request.resource.data.diff(resource.data).affectedKeys().hasAny(['role'])))
      );
      allow delete: if isAdmin();
    }

    // Public Educational Content
    match /notices/{noticeId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /results/{resultId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /jobs/{jobId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /courses/{courseId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /admissions/{admissionId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /suggestions/{suggestionId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /settings/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /ads/{adId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}`;

  const storageRulesText = `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`;

  const copyRules = (type: 'firestore' | 'storage') => {
    const text = type === 'firestore' ? firestoreRulesText : storageRulesText;
    navigator.clipboard.writeText(text);
    if (type === 'firestore') {
      setCopiedFirestore(true);
      setTimeout(() => setCopiedFirestore(false), 2500);
    } else {
      setCopiedStorage(true);
      setTimeout(() => setCopiedStorage(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Firebase সিকিউরিটি রুলস (Security Rules)</h3>
              <p className="text-xs text-slate-500">Firebase Console-এ পেস্ট করার জন্য প্রস্তুত নিয়মাবলী</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 pt-4 shrink-0">
          <button
            onClick={() => setActiveRuleTab('firestore')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeRuleTab === 'firestore'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Firestore Rules</span>
          </button>

          <button
            onClick={() => setActiveRuleTab('storage')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeRuleTab === 'storage'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Storage Rules</span>
          </button>
        </div>

        {/* Code Container */}
        <div className="mt-4 grow overflow-y-auto rounded-2xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 border border-slate-800">
          <pre className="whitespace-pre overflow-x-auto">
            {activeRuleTab === 'firestore' ? firestoreRulesText : storageRulesText}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex items-center justify-between shrink-0">
          <a
            href="https://console.firebase.google.com/project/study-with-rahat-pvt/firestore/rules"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Firebase Console খুলুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => copyRules(activeRuleTab)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              {(activeRuleTab === 'firestore' ? copiedFirestore : copiedStorage) ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>কপি সম্পন্ন হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>রুলস কপি করুন</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
