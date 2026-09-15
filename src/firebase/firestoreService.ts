import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  arrayUnion,
  orderBy,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './config';
import {
  NoticePost,
  JobPost,
  ResultPost,
  CoursePost,
  AdmissionPost,
  SuggestionPost,
  AppUser
} from '../types';
import {
  INITIAL_NOTICES,
  INITIAL_JOBS,
  INITIAL_RESULTS,
  INITIAL_COURSES,
  INITIAL_ADMISSIONS,
  INITIAL_SUGGESTIONS,
  INITIAL_USERS
} from '../data/initialData';

// Normalized converters to ensure both user-requested field names and existing UI types work seamlessly

export const normalizeNotice = (id: string, data: any): NoticePost => ({
  id,
  slug: data.slug || `notice-${id}`,
  type: 'notice',
  title: data.title || '',
  classCategory: data.class || data.classCategory || 'All',
  description: data.description || '',
  fullContent: data.fullContent || data.description || '',
  publishedDate: data.date || data.publishedDate || new Date().toISOString().split('T')[0],
  isImportant: data.isImportant ?? false,
  attachments: data.attachments || (data.pdfUrl ? [{ name: 'বিজ্ঞপ্তি PDF', url: data.pdfUrl, type: 'pdf' }] : []),
  views: data.views ?? 1,
  tags: data.tags || [],
  isPublished: data.isPublished ?? true
});

export const normalizeJob = (id: string, data: any): JobPost => ({
  id,
  slug: data.slug || `job-${id}`,
  type: 'job',
  title: data.title || '',
  orgName: data.company || data.orgName || 'সরকারি প্রতিষ্ঠান',
  jobType: data.jobType || 'Government Jobs',
  vacancies: data.vacancies || 'উল্লেখ নেই',
  qualification: data.qualification || 'স্নাতক / সমমান',
  ageLimit: data.ageLimit || '১৮-৩০ বছর',
  salary: data.salary || 'জাতীয় বেতন স্কেল অনুযায়ী',
  deadline: data.deadline || 'শীঘ্রই সমাপ্ত',
  location: data.location || 'সমগ্র বাংলাদেশ',
  description: data.description || '',
  instructions: data.instructions || 'অনলাইনে আবেদন করুন',
  officialLink: data.officialLink || 'http://teletalk.com.bd',
  circularFileUrl: data.circularFileUrl || data.pdfUrl || '',
  views: data.views ?? 1,
  tags: data.tags || [],
  isPublished: data.isPublished ?? true
});

export const normalizeResult = (id: string, data: any): ResultPost => ({
  id,
  slug: data.slug || `result-${id}`,
  type: 'result',
  title: data.title || '',
  examName: data.class || data.examName || 'SSC',
  year: data.year || '2026',
  boardOrUniversity: data.boardOrUniversity || 'শিক্ষা বোর্ড',
  publishedDate: data.date || data.publishedDate || new Date().toISOString().split('T')[0],
  checkInstructions: data.checkInstructions || 'অনলাইনে বা এসএমএসের মাধ্যমে ফলাফল দেখুন।',
  officialLink: data.officialLink || 'https://eboardresults.com',
  detailedArticle: data.detailedArticle || data.description || '',
  category: data.category || 'SSC Result',
  views: data.views ?? 1,
  smsFormat: data.smsFormat || '',
  isPublished: data.isPublished ?? true
});

export const normalizeCourse = (id: string, data: any): CoursePost => ({
  id,
  slug: data.slug || `course-${id}`,
  type: 'course',
  title: data.title || '',
  shortDesc: data.description || data.shortDesc || '',
  fullDesc: data.fullDesc || data.description || '',
  instructorName: data.instructorName || 'রাহাত হোসাইন',
  instructorRole: data.instructorRole || 'কোর্স ইন্সট্রাক্টর',
  duration: data.duration || '২ মাস',
  isPaid: data.isPaid ?? (Number(data.price || 0) > 0),
  price: Number(data.price || 0),
  originalPrice: data.originalPrice || undefined,
  thumbnail: data.imageUrl || data.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
  category: data.category || 'Academic Courses',
  enrollCount: data.enrollCount ?? 150,
  rating: data.rating ?? 4.9,
  views: data.views ?? 1,
  curriculum: data.curriculum || [],
  isPublished: data.isPublished ?? true
});

export const normalizeAdmission = (id: string, data: any): AdmissionPost => ({
  id,
  slug: data.slug || `admission-${id}`,
  type: 'admission',
  institutionName: data.institution || data.institutionName || '',
  category: data.category || 'University Admission',
  title: data.title || '',
  startDate: data.startDate || 'চলমান',
  deadline: data.deadline || 'শীঘ্রই সমাপ্ত',
  eligibility: data.eligibility || 'নূন্যতম যোগ্যতা প্রযোজ্য',
  applicationProcess: data.applicationProcess || data.description || 'অনলাইনে আবেদন করুন।',
  fee: data.fee || 'প্রযোজ্য নয়',
  requiredDocuments: data.requiredDocuments || ['এসএসসি ও এইচএসসি সনদ', 'ছবি'],
  officialLink: data.officialLink || 'https://admission.ac.bd',
  importantDates: data.importantDates || [{ label: 'আবেদন শেষ', date: data.deadline || '২০২৬' }],
  views: data.views ?? 1,
  isPublished: data.isPublished ?? true
});

export const normalizeSuggestion = (id: string, data: any): SuggestionPost => ({
  id,
  slug: data.slug || `suggestion-${id}`,
  type: 'suggestion',
  title: data.title || '',
  classCategory: data.class || data.classCategory || 'SSC',
  subject: data.subject || 'Bangla',
  content: data.description || data.content || '',
  pdfUrl: data.pdfUrl || '',
  downloadCount: data.downloadCount ?? 120,
  importantQuestions: data.importantQuestions || ['গুরুত্বপূর্ণ সৃজনশীল ও বহুনির্বাচনী প্রশ্নাবলী'],
  mcqHints: data.mcqHints || [],
  creativeQuestions: data.creativeQuestions || [],
  examTips: data.examTips || ['উত্তর নির্ভুল ও গুছিয়ে লিখুন'],
  views: data.views ?? 1,
  isPublished: data.isPublished ?? true
});

// Generic Firestore Subscribe with real-time onSnapshot
export const subscribeToCollection = <T>(
  collectionName: string,
  normalizeItem: (id: string, data: any) => T,
  onUpdate: (items: T[]) => void,
  onError?: (err: any) => void
) => {
  try {
    const colRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        // Filter out soft-deleted or un-published documents
        const items = snapshot.docs
          .filter((docSnap) => {
            const data = docSnap.data();
            return !data.isDeleted && data.isPublished !== false;
          })
          .map((docSnap) => normalizeItem(docSnap.id, docSnap.data()));
        onUpdate(items);
      },
      (error) => {
        console.warn(`Firestore onSnapshot error for ${collectionName}:`, error);
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn(`Failed to attach listener for ${collectionName}:`, err);
    return () => {};
  }
};

// Global deletion sync: write deleted doc id into 'settings/deleted_posts' so ALL devices/visitors immediately filter it out
export const recordGlobalDeletedPostId = async (id: string): Promise<void> => {
  if (!id) return;
  try {
    const deletedRef = doc(db, 'settings', 'deleted_posts');
    const snap = await getDoc(deletedRef).catch(() => null);
    if (snap && snap.exists()) {
      const currentIds: string[] = snap.data()?.ids || [];
      if (!currentIds.includes(id)) {
        await updateDoc(deletedRef, {
          ids: arrayUnion(id),
          updatedAt: new Date().toISOString()
        }).catch(async () => {
          await setDoc(deletedRef, {
            ids: Array.from(new Set([...currentIds, id])),
            updatedAt: new Date().toISOString()
          }, { merge: true }).catch(() => {});
        });
      }
    } else {
      await setDoc(deletedRef, {
        ids: [id],
        updatedAt: new Date().toISOString()
      }, { merge: true }).catch(() => {});
    }
  } catch (error) {
    console.warn('Could not update global deleted_posts document:', error);
  }
};

// Subscribe to global deleted posts list in Firestore
export const subscribeToDeletedPosts = (onUpdate: (deletedIds: string[]) => void) => {
  try {
    const ref = doc(db, 'settings', 'deleted_posts');
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const ids = snap.data()?.ids || [];
        if (Array.isArray(ids)) {
          onUpdate(ids);
        }
      }
    }, (err) => {
      console.warn('Deleted posts subscription notice:', err);
    });
  } catch (err) {
    console.warn('Failed to subscribe to deleted posts:', err);
    return () => {};
  }
};

// Check whether Firestore rules permit client-side writes
export const checkFirestoreWritePermission = async (): Promise<{ canWrite: boolean; error?: string }> => {
  try {
    const testDoc = doc(db, 'settings', 'connectivity_check');
    await setDoc(testDoc, {
      lastChecked: new Date().toISOString(),
      status: 'operational'
    }, { merge: true });
    return { canWrite: true };
  } catch (err: any) {
    const isPermError = err?.code === 'permission-denied' || String(err?.message || '').toLowerCase().includes('permission');
    return {
      canWrite: false,
      error: isPermError ? 'permission-denied' : (err?.message || 'unknown-error')
    };
  }
};

// Generic Add or Set Document
export const addFirestoreDoc = async (collectionName: string, data: any, customId?: string): Promise<string> => {
  try {
    const cleanData = {
      ...data,
      isDeleted: false,
      createdAt: data.createdAt || new Date().toISOString()
    };
    if (customId) {
      const docRef = doc(db, collectionName, customId);
      await setDoc(docRef, cleanData, { merge: true });
      return customId;
    }
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, cleanData);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

// Generic Update Document (Uses merge to safely update or create if not present)
export const updateFirestoreDoc = async (collectionName: string, id: string, data: any): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

// Generic Robust Delete Document
export const deleteFirestoreDoc = async (collectionName: string, id: string): Promise<void> => {
  try {
    // 1. Instantly register in the global deleted posts registry so all connected clients drop it immediately
    await recordGlobalDeletedPostId(id).catch(console.warn);

    // 2. Soft-delete flag on the document so active queries/listeners immediately drop it
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, {
      isDeleted: true,
      isPublished: false,
      deletedAt: new Date().toISOString()
    }, { merge: true }).catch(() => {});

    // 3. Physical hard delete
    await deleteDoc(docRef).catch(console.warn);

    // 4. In case the document was saved with an auto-id but contains internal field id == id
    try {
      const colRef = collection(db, collectionName);
      const q = query(colRef, where('id', '==', id));
      const snap = await getDocs(q);
      for (const d of snap.docs) {
        if (d.id !== id) {
          await deleteDoc(d.ref).catch(() => {});
        }
      }
    } catch {
      // safe ignore
    }
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

// Seed initial posts to Firestore once (never re-seed deleted items)
export const seedInitialFirestoreData = async (): Promise<boolean> => {
  try {
    // 1. If already marked as seeded locally, never re-seed
    if (localStorage.getItem('swr_initial_seeded_flag') === 'true') {
      return false;
    }

    // 2. Check if Firestore already has marker or notices
    const seedMarkerRef = doc(db, 'settings', 'seed_marker');
    const markerSnap = await getDoc(seedMarkerRef);
    if (markerSnap.exists() && markerSnap.data()?.hasSeeded) {
      localStorage.setItem('swr_initial_seeded_flag', 'true');
      return false;
    }

    const noticesSnap = await getDocs(collection(db, 'notices'));
    if (!noticesSnap.empty) {
      localStorage.setItem('swr_initial_seeded_flag', 'true');
      await setDoc(seedMarkerRef, { hasSeeded: true, seededAt: new Date().toISOString() }).catch(() => {});
      return false; // Already has data, do not overwrite or re-seed
    }

    // Fetch any globally deleted IDs so they are never seeded
    const deletedSnap = await getDoc(doc(db, 'settings', 'deleted_posts')).catch(() => null);
    const cloudDeletedIds: string[] = deletedSnap?.exists() ? (deletedSnap.data()?.ids || []) : [];

    console.log('Seeding initial data to Cloud Firestore once...');

    // Seed Notices
    for (const item of INITIAL_NOTICES) {
      if (cloudDeletedIds.includes(item.id)) continue;
      await setDoc(doc(db, 'notices', item.id), {
        title: item.title,
        description: item.description,
        fullContent: item.fullContent,
        class: item.classCategory,
        date: item.publishedDate,
        createdAt: new Date().toISOString(),
        isImportant: item.isImportant,
        attachments: item.attachments || [],
        views: item.views,
        isPublished: item.isPublished,
        isDeleted: false
      });
    }

    // Seed Jobs
    for (const item of INITIAL_JOBS) {
      if (cloudDeletedIds.includes(item.id)) continue;
      await setDoc(doc(db, 'jobs', item.id), {
        title: item.title,
        company: item.orgName,
        location: item.location,
        deadline: item.deadline,
        description: item.description,
        createdAt: new Date().toISOString(),
        salary: item.salary,
        jobType: item.jobType,
        vacancies: item.vacancies,
        qualification: item.qualification,
        instructions: item.instructions,
        officialLink: item.officialLink,
        isPublished: item.isPublished,
        views: item.views,
        isDeleted: false
      });
    }

    // Seed Results
    for (const item of INITIAL_RESULTS) {
      if (cloudDeletedIds.includes(item.id)) continue;
      await setDoc(doc(db, 'results', item.id), {
        title: item.title,
        class: item.examName,
        year: item.year,
        pdfUrl: item.officialLink,
        createdAt: new Date().toISOString(),
        boardOrUniversity: item.boardOrUniversity,
        checkInstructions: item.checkInstructions,
        officialLink: item.officialLink,
        category: item.category,
        isPublished: item.isPublished,
        views: item.views,
        isDeleted: false
      });
    }

    // Seed Courses
    for (const item of INITIAL_COURSES) {
      if (cloudDeletedIds.includes(item.id)) continue;
      await setDoc(doc(db, 'courses', item.id), {
        title: item.title,
        description: item.shortDesc,
        fullDesc: item.fullDesc,
        imageUrl: item.thumbnail,
        price: item.price,
        createdAt: new Date().toISOString(),
        instructorName: item.instructorName,
        instructorRole: item.instructorRole,
        duration: item.duration,
        isPaid: item.isPaid,
        category: item.category,
        enrollCount: item.enrollCount,
        rating: item.rating,
        curriculum: item.curriculum,
        isPublished: item.isPublished,
        views: item.views,
        isDeleted: false
      });
    }

    // Seed Admissions
    for (const item of INITIAL_ADMISSIONS) {
      if (cloudDeletedIds.includes(item.id)) continue;
      await setDoc(doc(db, 'admissions', item.id), {
        title: item.title,
        institution: item.institutionName,
        deadline: item.deadline,
        description: item.applicationProcess,
        createdAt: new Date().toISOString(),
        category: item.category,
        startDate: item.startDate,
        eligibility: item.eligibility,
        fee: item.fee,
        officialLink: item.officialLink,
        isPublished: item.isPublished,
        views: item.views,
        isDeleted: false
      });
    }

    // Seed Suggestions
    for (const item of INITIAL_SUGGESTIONS) {
      if (cloudDeletedIds.includes(item.id)) continue;
      await setDoc(doc(db, 'suggestions', item.id), {
        class: item.classCategory,
        subject: item.subject,
        title: item.title,
        description: item.content,
        createdAt: new Date().toISOString(),
        pdfUrl: item.pdfUrl || '',
        downloadCount: item.downloadCount,
        importantQuestions: item.importantQuestions,
        isPublished: item.isPublished,
        views: item.views,
        isDeleted: false
      });
    }

    // Mark as seeded in Firestore and localStorage
    await setDoc(seedMarkerRef, { hasSeeded: true, seededAt: new Date().toISOString() }).catch(() => {});
    localStorage.setItem('swr_initial_seeded_flag', 'true');

    return true;
  } catch (error) {
    console.warn('Initial data seeding skipped or encountered error:', error);
    return false;
  }
};
