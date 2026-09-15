import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
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
        const items = snapshot.docs.map((docSnap) => normalizeItem(docSnap.id, docSnap.data()));
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

// Generic Add Document
export const addFirestoreDoc = async (collectionName: string, data: any): Promise<string> => {
  try {
    const colRef = collection(db, collectionName);
    const cleanData = {
      ...data,
      createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(colRef, cleanData);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

// Generic Update Document
export const updateFirestoreDoc = async (collectionName: string, id: string, data: any): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

// Generic Delete Document
export const deleteFirestoreDoc = async (collectionName: string, id: string): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

// Seed initial posts to Firestore if empty
export const seedInitialFirestoreData = async (): Promise<boolean> => {
  try {
    const noticesSnap = await getDocs(collection(db, 'notices'));
    if (!noticesSnap.empty) {
      return false; // Already has data
    }

    console.log('Seeding initial data to Cloud Firestore...');

    // Seed Notices
    for (const item of INITIAL_NOTICES) {
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
        isPublished: item.isPublished
      });
    }

    // Seed Jobs
    for (const item of INITIAL_JOBS) {
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
        views: item.views
      });
    }

    // Seed Results
    for (const item of INITIAL_RESULTS) {
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
        views: item.views
      });
    }

    // Seed Courses
    for (const item of INITIAL_COURSES) {
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
        views: item.views
      });
    }

    // Seed Admissions
    for (const item of INITIAL_ADMISSIONS) {
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
        views: item.views
      });
    }

    // Seed Suggestions
    for (const item of INITIAL_SUGGESTIONS) {
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
        views: item.views
      });
    }

    return true;
  } catch (error) {
    console.warn('Initial data seeding skipped or encountered error:', error);
    return false;
  }
};
