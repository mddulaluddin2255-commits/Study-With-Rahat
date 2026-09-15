import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from './config';
import { AppUser } from '../types';

export interface AuthResult {
  success: boolean;
  user?: AppUser;
  error?: string;
}

// Helper to check if an email belongs to an administrator/owner
export const isUserAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return (
    clean === 'admin@studywithrahat.com' ||
    clean === 'mdsojibhossain96714496@gmail.com' ||
    clean.includes('studywithrahat') ||
    clean.startsWith('rahat')
  );
};

// Map Firestore doc to AppUser
export const formatUserData = (uid: string, data: any, firebaseUser?: FirebaseUser | null): AppUser => {
  const userEmail = data?.email || firebaseUser?.email || '';
  const isAdmin = isUserAdminEmail(userEmail) || data?.role === 'admin';

  return {
    id: uid,
    name: data?.name || firebaseUser?.displayName || (isAdmin ? 'এডমিন রাহাত' : 'ব্যবহারকারী'),
    email: userEmail,
    role: isAdmin ? 'admin' : ((data?.role as 'admin' | 'student') || 'student'),
    phone: data?.phone || '',
    avatar: data?.avatar || firebaseUser?.photoURL || '',
    bookmarkedIds: data?.bookmarkedIds || [],
    isActive: data?.isActive ?? true,
    createdAt: data?.createdAt || new Date().toISOString()
  };
};

// Sign Up with Email and Password
export const signUpWithEmail = async (
  email: string,
  pass: string,
  name: string,
  role: 'admin' | 'student' = 'student'
): Promise<AuthResult> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const fbUser = userCredential.user;

    const assignedRole = (isUserAdminEmail(email) || role === 'admin') ? 'admin' : 'student';

    // Update Firebase Auth Display Name
    if (name) {
      await updateProfile(fbUser, { displayName: name });
    }

    const userData: AppUser = {
      id: fbUser.uid,
      name: name || (assignedRole === 'admin' ? 'এডমিন রাহাত' : 'শিক্ষার্থী ব্যবহারকারী'),
      email: fbUser.email || email,
      role: assignedRole,
      phone: '',
      avatar: '',
      bookmarkedIds: [],
      isActive: true,
      createdAt: new Date().toISOString()
    };

    // Store in Firestore `users/{uid}` collection
    await setDoc(doc(db, 'users', fbUser.uid), {
      uid: fbUser.uid,
      name: userData.name,
      email: userData.email,
      role: assignedRole,
      createdAt: userData.createdAt,
      bookmarkedIds: [],
      isActive: true
    });

    return { success: true, user: userData };
  } catch (err: any) {
    console.error('Error signing up with email:', err);
    let message = 'অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
    if (err.code === 'auth/email-already-in-use') {
      message = 'এই ইমেইলটি দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে। লগইন করুন।';
    } else if (err.code === 'auth/weak-password') {
      message = 'পাসওয়ার্ডটি অত্যন্ত দুর্বল। অন্তত ৬টি অক্ষরের পাসওয়ার্ড দিন।';
    } else if (err.code === 'auth/invalid-email') {
      message = 'ইমেইল ঠিকানাটি সঠিক নয়।';
    }
    return { success: false, error: message };
  }
};

// Sign In with Email and Password
export const signInWithEmail = async (email: string, pass: string): Promise<AuthResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const fbUser = userCredential.user;

    // Fetch user document from Firestore
    const userDocRef = doc(db, 'users', fbUser.uid);
    const userSnap = await getDoc(userDocRef);

    const shouldBeAdmin = isUserAdminEmail(fbUser.email || email);
    let appUser: AppUser;

    if (userSnap.exists()) {
      appUser = formatUserData(fbUser.uid, userSnap.data(), fbUser);
      if (shouldBeAdmin && appUser.role !== 'admin') {
        appUser.role = 'admin';
        await updateDoc(userDocRef, { role: 'admin' }).catch(console.warn);
      }
    } else {
      // Create user record if not present
      appUser = {
        id: fbUser.uid,
        name: fbUser.displayName || (shouldBeAdmin ? 'এডমিন রাহাত' : 'ব্যবহারকারী'),
        email: fbUser.email || email,
        role: shouldBeAdmin ? 'admin' : 'student',
        bookmarkedIds: [],
        isActive: true,
        createdAt: new Date().toISOString()
      };
      await setDoc(userDocRef, {
        uid: fbUser.uid,
        name: appUser.name,
        email: appUser.email,
        role: appUser.role,
        createdAt: appUser.createdAt,
        bookmarkedIds: [],
        isActive: true
      });
    }

    return { success: true, user: appUser };
  } catch (err: any) {
    console.error('Error signing in:', err);
    let message = 'লগইন ব্যর্থ হয়েছে। ইমেইল এবং পাসওয়ার্ড সঠিক কিনা পরীক্ষা করুন।';
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
      message = 'ভুল ইমেইল অথবা পাসওয়ার্ড প্রদান করেছেন।';
    } else if (err.code === 'auth/too-many-requests') {
      message = 'বহুবার ভুল পাসওয়ার্ড দেওয়ার কারণে অ্যাকাউন্ট সাময়িকভাবে স্থগিত রয়েছে। কিছুক্ষণ পর চেষ্টা করুন।';
    }
    return { success: false, error: message };
  }
};

// Sign In with Google
export const signInWithGoogle = async (): Promise<AuthResult> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;

    // Check if user already exists in Firestore
    const userDocRef = doc(db, 'users', fbUser.uid);
    const userSnap = await getDoc(userDocRef);

    const isOwnerEmail = isUserAdminEmail(fbUser.email);
    let appUser: AppUser;

    if (userSnap.exists()) {
      appUser = formatUserData(fbUser.uid, userSnap.data(), fbUser);
      if (isOwnerEmail && appUser.role !== 'admin') {
        appUser.role = 'admin';
        await updateDoc(userDocRef, { role: 'admin' }).catch(console.warn);
      }
    } else {
      // Auto register user in Firestore
      appUser = {
        id: fbUser.uid,
        name: fbUser.displayName || (isOwnerEmail ? 'এডমিন রাহাত' : 'গুগল ব্যবহারকারী'),
        email: fbUser.email || '',
        role: isOwnerEmail ? 'admin' : 'student',
        phone: fbUser.phoneNumber || '',
        avatar: fbUser.photoURL || '',
        bookmarkedIds: [],
        isActive: true,
        createdAt: new Date().toISOString()
      };

      await setDoc(userDocRef, {
        uid: fbUser.uid,
        name: appUser.name,
        email: appUser.email,
        role: appUser.role,
        avatar: appUser.avatar,
        createdAt: appUser.createdAt,
        bookmarkedIds: [],
        isActive: true
      });
    }

    return { success: true, user: appUser };
  } catch (err: any) {
    console.error('Error with Google Sign In:', err);
    let message = 'গুগল দিয়ে সাইন ইন করতে সমস্যা হয়েছে।';
    if (err.code === 'auth/popup-closed-by-user') {
      message = 'গুগল সাইন ইন উইন্ডোটি বন্ধ করা হয়েছে।';
    }
    return { success: false, error: message };
  }
};

// Forgot Password / Password Reset
export const sendPasswordReset = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে। অনুগ্রহ করে ইনবক্স অথবা স্প্যাম ফোল্ডার চেক করুন।'
    };
  } catch (err: any) {
    console.error('Error sending reset email:', err);
    let message = 'পাসওয়ার্ড রিসেট ইমেইল পাঠাতে সমস্যা হয়েছে।';
    if (err.code === 'auth/user-not-found') {
      message = 'এই ইমেইল ঠিকানা দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।';
    } else if (err.code === 'auth/invalid-email') {
      message = 'সঠিক ইমেইল ঠিকানা প্রদান করুন।';
    }
    return { success: false, message };
  }
};

// Sign Out
export const logOutUser = async (): Promise<void> => {
  await signOut(auth);
};

// Update User Role in Firestore (Admin only)
export const updateUserRole = async (userId: string, newRole: 'admin' | 'student'): Promise<boolean> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { role: newRole });
    return true;
  } catch (err) {
    console.error('Error updating user role:', err);
    return false;
  }
};

// Toggle user active status
export const toggleUserStatusInFirestore = async (userId: string, currentActive: boolean): Promise<boolean> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { isActive: !currentActive });
    return true;
  } catch (err) {
    console.error('Error toggling user status:', err);
    return false;
  }
};
