import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NoticePost,
  JobPost,
  ResultPost,
  CoursePost,
  AdmissionPost,
  SuggestionPost,
  NotificationItem,
  AdPlacement,
  SiteSettings,
  AppUser,
  MediaItem,
  PostType,
  AnyPost,
  ShareTarget
} from '../types';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_NOTICES,
  INITIAL_JOBS,
  INITIAL_RESULTS,
  INITIAL_COURSES,
  INITIAL_ADMISSIONS,
  INITIAL_SUGGESTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ADS,
  INITIAL_USERS,
  INITIAL_MEDIA,
  CLASS_CATEGORIES,
  JOB_CATEGORIES,
  COURSE_CATEGORIES,
  ADMISSION_CATEGORIES,
  SUBJECT_LIST
} from '../data/initialData';
import { auth, db, isFirebaseConfigured } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  sendPasswordReset,
  logOutUser,
  updateUserRole,
  toggleUserStatusInFirestore,
  formatUserData,
  isUserAdminEmail
} from '../firebase/authService';
import {
  subscribeToCollection,
  subscribeToDeletedPosts,
  recordGlobalDeletedPostId,
  normalizeNotice,
  normalizeJob,
  normalizeResult,
  normalizeCourse,
  normalizeAdmission,
  normalizeSuggestion,
  addFirestoreDoc,
  updateFirestoreDoc,
  deleteFirestoreDoc,
  seedInitialFirestoreData
} from '../firebase/firestoreService';

export type ActiveView = 
  | 'home' 
  | 'notices' 
  | 'results' 
  | 'jobs' 
  | 'courses' 
  | 'admissions' 
  | 'suggestions' 
  | 'about' 
  | 'contact' 
  | 'admin' 
  | 'bookmarks' 
  | 'post-detail'
  | 'course-detail';

interface AppContextType {
  // Navigation & View
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedPost: { type: PostType; id: string } | null;
  navigateToPost: (type: PostType, id: string) => void;
  navigateTo: (view: ActiveView) => void;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Firebase Status
  isFirebaseConnected: boolean;
  isFirebaseSyncing: boolean;

  // Content
  notices: NoticePost[];
  jobs: JobPost[];
  results: ResultPost[];
  courses: CoursePost[];
  admissions: AdmissionPost[];
  suggestions: SuggestionPost[];

  // CRUD
  addNotice: (notice: Omit<NoticePost, 'id' | 'views'>) => Promise<void>;
  updateNotice: (id: string, notice: Partial<NoticePost>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;

  addJob: (job: Omit<JobPost, 'id' | 'views'>) => Promise<void>;
  updateJob: (id: string, job: Partial<JobPost>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;

  addResult: (res: Omit<ResultPost, 'id' | 'views'>) => Promise<void>;
  updateResult: (id: string, res: Partial<ResultPost>) => Promise<void>;
  deleteResult: (id: string) => Promise<void>;

  addCourse: (course: Omit<CoursePost, 'id' | 'views'>) => Promise<void>;
  updateCourse: (id: string, course: Partial<CoursePost>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;

  addAdmission: (adm: Omit<AdmissionPost, 'id' | 'views'>) => Promise<void>;
  updateAdmission: (id: string, adm: Partial<AdmissionPost>) => Promise<void>;
  deleteAdmission: (id: string) => Promise<void>;

  addSuggestion: (sug: Omit<SuggestionPost, 'id' | 'views'>) => Promise<void>;
  updateSuggestion: (id: string, sug: Partial<SuggestionPost>) => Promise<void>;
  deleteSuggestion: (id: string) => Promise<void>;

  togglePublish: (type: PostType, id: string) => void;
  getPostById: (type: PostType, id: string) => AnyPost | undefined;

  // Categories
  classes: string[];
  subjects: string[];
  jobCategories: string[];
  courseCategories: string[];
  admissionCategories: string[];
  addClass: (name: string) => void;
  deleteClass: (name: string) => void;
  addSubject: (name: string) => void;
  deleteSubject: (name: string) => void;
  addJobCategory: (name: string) => void;
  deleteJobCategory: (name: string) => void;
  addCourseCategory: (name: string) => void;
  deleteCourseCategory: (name: string) => void;
  addAdmissionCategory: (name: string) => void;
  deleteAdmissionCategory: (name: string) => void;

  // Auth & Users
  currentUser: AppUser | null;
  users: AppUser[];
  adminPassword: string;
  isAdminAuthenticated: boolean;
  verifyAdminPassword: (password: string) => boolean;
  setAdminPassword: (newPassword: string) => void;
  lockAdmin: () => void;
  upgradeCurrentUserToAdmin: (password: string) => boolean;

  // Firebase Auth methods
  firebaseLogin: (email: string, pass: string, requestedRole?: 'admin' | 'student') => Promise<{ success: boolean; user?: AppUser; error?: string }>;
  firebaseSignUp: (email: string, pass: string, name: string, role?: 'admin' | 'student') => Promise<{ success: boolean; user?: AppUser; error?: string }>;
  firebaseGoogleLogin: () => Promise<{ success: boolean; user?: AppUser; error?: string }>;
  firebaseForgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  firebaseLogout: () => Promise<void>;

  login: (email: string, role?: 'admin' | 'student', password?: string) => boolean;
  logout: () => void;
  toggleUserStatus: (id: string) => void;
  changeUserRole: (id: string, role: 'admin' | 'student') => void;
  bookmarks: string[];
  toggleBookmark: (postId: string) => void;
  isBookmarked: (postId: string) => boolean;

  // Share
  shareTarget: ShareTarget | null;
  openShareModal: (target: ShareTarget) => void;
  closeShareModal: () => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifCount: number;
  markNotifAsRead: (id: string) => void;
  markAllNotifsAsRead: () => void;

  // Site Settings
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Ads
  ads: AdPlacement[];
  toggleAd: (id: string) => void;
  updateAd: (id: string, updates: Partial<AdPlacement>) => void;

  // Media
  mediaItems: MediaItem[];
  uploadMedia: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  deleteMedia: (id: string) => void;

  // Stats
  websiteViews: number;
  incrementWebsiteViews: () => void;

  // Enrollments
  enrolledCourseIds: string[];
  enrollInCourse: (courseId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`swr_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`swr_${key}`, JSON.stringify(value));
  } catch (e) {
    // ignore
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedPost, setSelectedPost] = useState<{ type: PostType; id: string } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Firebase Status
  const [isFirebaseConnected] = useState<boolean>(isFirebaseConfigured);
  const [isFirebaseSyncing, setIsFirebaseSyncing] = useState<boolean>(true);

  // Deleted Posts Registry to prevent deleted posts from reappearing on sync/reloads across all browsers
  const [deletedPostIds, setDeletedPostIds] = useState<string[]>(() => getStored('deleted_post_ids', []));
  useEffect(() => setStored('deleted_post_ids', deletedPostIds), [deletedPostIds]);

  const markPostAsDeleted = (id: string) => {
    setDeletedPostIds(prev => {
      const next = prev.includes(id) ? prev : [...prev, id];
      setStored('deleted_post_ids', next);
      return next;
    });
    // Immediately persist to global cloud registry so all devices and visitors sync deletions instantly
    recordGlobalDeletedPostId(id).catch((err) => {
      console.warn('Failed to record global deleted post id:', err);
    });
  };

  // Whenever deletedPostIds updates (via local deletion or cloud sync), immediately purge from all active state
  useEffect(() => {
    if (deletedPostIds.length === 0) return;
    setNotices(prev => prev.filter(item => !deletedPostIds.includes(item.id)));
    setJobs(prev => prev.filter(item => !deletedPostIds.includes(item.id)));
    setResults(prev => prev.filter(item => !deletedPostIds.includes(item.id)));
    setCourses(prev => prev.filter(item => !deletedPostIds.includes(item.id)));
    setAdmissions(prev => prev.filter(item => !deletedPostIds.includes(item.id)));
    setSuggestions(prev => prev.filter(item => !deletedPostIds.includes(item.id)));
  }, [deletedPostIds]);

  // Content state (Initialized with localStorage / initialData, filtered of deleted items, continuously synced via Firestore)
  const [notices, setNotices] = useState<NoticePost[]>(() => {
    const deleted: string[] = getStored('deleted_post_ids', []);
    const loaded = getStored('notices', INITIAL_NOTICES);
    return loaded.filter((item: NoticePost) => !deleted.includes(item.id));
  });
  const [jobs, setJobs] = useState<JobPost[]>(() => {
    const deleted: string[] = getStored('deleted_post_ids', []);
    const loaded = getStored('jobs', INITIAL_JOBS);
    return loaded.filter((item: JobPost) => !deleted.includes(item.id));
  });
  const [results, setResults] = useState<ResultPost[]>(() => {
    const deleted: string[] = getStored('deleted_post_ids', []);
    const loaded = getStored('results', INITIAL_RESULTS);
    return loaded.filter((item: ResultPost) => !deleted.includes(item.id));
  });
  const [courses, setCourses] = useState<CoursePost[]>(() => {
    const deleted: string[] = getStored('deleted_post_ids', []);
    const loaded = getStored('courses', INITIAL_COURSES);
    return loaded.filter((item: CoursePost) => !deleted.includes(item.id));
  });
  const [admissions, setAdmissions] = useState<AdmissionPost[]>(() => {
    const deleted: string[] = getStored('deleted_post_ids', []);
    const loaded = getStored('admissions', INITIAL_ADMISSIONS);
    return loaded.filter((item: AdmissionPost) => !deleted.includes(item.id));
  });
  const [suggestions, setSuggestions] = useState<SuggestionPost[]>(() => {
    const deleted: string[] = getStored('deleted_post_ids', []);
    const loaded = getStored('suggestions', INITIAL_SUGGESTIONS);
    return loaded.filter((item: SuggestionPost) => !deleted.includes(item.id));
  });

  // Share modal state
  const [shareTarget, setShareTarget] = useState<ShareTarget | null>(null);

  const openShareModal = (target: ShareTarget) => setShareTarget(target);
  const closeShareModal = () => setShareTarget(null);

  // Categories
  const [classes, setClasses] = useState<string[]>(() => getStored('classes', CLASS_CATEGORIES));
  const [subjects, setSubjects] = useState<string[]>(() => getStored('subjects', SUBJECT_LIST));
  const [jobCategories, setJobCategories] = useState<string[]>(() => getStored('job_cats', JOB_CATEGORIES));
  const [courseCategories, setCourseCategories] = useState<string[]>(() => getStored('course_cats', COURSE_CATEGORIES));
  const [admissionCategories, setAdmissionCategories] = useState<string[]>(() => getStored('adm_cats', ADMISSION_CATEGORIES));

  // Users & Auth
  const DEFAULT_ADMIN_PASSWORD = 'Rahat 1122@@';
  const [adminPassword, setAdminPasswordState] = useState<string>(() => getStored('admin_password', DEFAULT_ADMIN_PASSWORD));
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => getStored('admin_authenticated', false));
  const [users, setUsers] = useState<AppUser[]>(() => getStored('users', INITIAL_USERS));
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    const isAuth = getStored('admin_authenticated', false);
    if (isAuth) {
      return INITIAL_USERS[0];
    }
    return getStored('currentUser', null);
  });
  const [bookmarks, setBookmarks] = useState<string[]>(() => getStored('bookmarks', ['notice-1', 'job-1', 'crs-1']));

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => getStored('notifications', INITIAL_NOTIFICATIONS));

  // Site Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => getStored('site_settings', INITIAL_SITE_SETTINGS));

  // Ads
  const [ads, setAds] = useState<AdPlacement[]>(() => getStored('ads', INITIAL_ADS));

  // Media
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => getStored('media', INITIAL_MEDIA));

  // Stats
  const [websiteViews, setWebsiteViews] = useState<number>(() => getStored('views', 48520));

  // Enrolled courses
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => getStored('enrolled', ['crs-3']));

  // Synchronize with local storage as instant local cache
  useEffect(() => setStored('notices', notices), [notices]);
  useEffect(() => setStored('jobs', jobs), [jobs]);
  useEffect(() => setStored('results', results), [results]);
  useEffect(() => setStored('courses', courses), [courses]);
  useEffect(() => setStored('admissions', admissions), [admissions]);
  useEffect(() => setStored('suggestions', suggestions), [suggestions]);
  useEffect(() => setStored('classes', classes), [classes]);
  useEffect(() => setStored('subjects', subjects), [subjects]);
  useEffect(() => setStored('job_cats', jobCategories), [jobCategories]);
  useEffect(() => setStored('course_cats', courseCategories), [courseCategories]);
  useEffect(() => setStored('adm_cats', admissionCategories), [admissionCategories]);
  useEffect(() => setStored('admin_password', adminPassword), [adminPassword]);
  useEffect(() => setStored('admin_authenticated', isAdminAuthenticated), [isAdminAuthenticated]);
  useEffect(() => setStored('users', users), [users]);
  useEffect(() => setStored('currentUser', currentUser), [currentUser]);
  useEffect(() => setStored('bookmarks', bookmarks), [bookmarks]);
  useEffect(() => setStored('notifications', notifications), [notifications]);
  useEffect(() => setStored('site_settings', siteSettings), [siteSettings]);
  useEffect(() => setStored('ads', ads), [ads]);
  useEffect(() => setStored('media', mediaItems), [mediaItems]);
  useEffect(() => setStored('views', websiteViews), [websiteViews]);
  useEffect(() => setStored('enrolled', enrolledCourseIds), [enrolledCourseIds]);

  // ==========================================
  // FIREBASE CLOUD FIRESTORE REAL-TIME SYNC
  // ==========================================
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsFirebaseSyncing(false);
      return;
    }

    // 1. Initial Firestore Seeding if Cloud DB is fresh/empty
    seedInitialFirestoreData().catch((err) => {
      console.warn('Initial seeding notice:', err);
    });

    // 2. Real-time Listener for global deleted posts registry so all visitors/devices sync deletions instantly
    const unsubDeleted = subscribeToDeletedPosts((cloudDeletedIds) => {
      if (Array.isArray(cloudDeletedIds) && cloudDeletedIds.length > 0) {
        setDeletedPostIds((prev) => {
          const merged = Array.from(new Set([...prev, ...cloudDeletedIds]));
          setStored('deleted_post_ids', merged);
          return merged;
        });
      }
    });

    // 3. Real-time Listeners for all collections
    let noticesLoaded = false;
    let jobsLoaded = false;
    let resultsLoaded = false;
    let coursesLoaded = false;
    let admissionsLoaded = false;
    let suggestionsLoaded = false;

    const unsubNotices = subscribeToCollection('notices', normalizeNotice, (items) => {
      const deleted: string[] = getStored('deleted_post_ids', []);
      const activeItems = items.filter(n => !deleted.includes(n.id) && !deletedPostIds.includes(n.id));
      if (activeItems.length > 0 || noticesLoaded || items.length === 0) {
        setNotices(activeItems);
      }
      noticesLoaded = true;
      setIsFirebaseSyncing(false);
    });

    const unsubJobs = subscribeToCollection('jobs', normalizeJob, (items) => {
      const deleted: string[] = getStored('deleted_post_ids', []);
      const activeItems = items.filter(j => !deleted.includes(j.id) && !deletedPostIds.includes(j.id));
      if (activeItems.length > 0 || jobsLoaded || items.length === 0) {
        setJobs(activeItems);
      }
      jobsLoaded = true;
    });

    const unsubResults = subscribeToCollection('results', normalizeResult, (items) => {
      const deleted: string[] = getStored('deleted_post_ids', []);
      const activeItems = items.filter(r => !deleted.includes(r.id) && !deletedPostIds.includes(r.id));
      if (activeItems.length > 0 || resultsLoaded || items.length === 0) {
        setResults(activeItems);
      }
      resultsLoaded = true;
    });

    const unsubCourses = subscribeToCollection('courses', normalizeCourse, (items) => {
      const deleted: string[] = getStored('deleted_post_ids', []);
      const activeItems = items.filter(c => !deleted.includes(c.id) && !deletedPostIds.includes(c.id));
      if (activeItems.length > 0 || coursesLoaded || items.length === 0) {
        setCourses(activeItems);
      }
      coursesLoaded = true;
    });

    const unsubAdmissions = subscribeToCollection('admissions', normalizeAdmission, (items) => {
      const deleted: string[] = getStored('deleted_post_ids', []);
      const activeItems = items.filter(a => !deleted.includes(a.id) && !deletedPostIds.includes(a.id));
      if (activeItems.length > 0 || admissionsLoaded || items.length === 0) {
        setAdmissions(activeItems);
      }
      admissionsLoaded = true;
    });

    const unsubSuggestions = subscribeToCollection('suggestions', normalizeSuggestion, (items) => {
      const deleted: string[] = getStored('deleted_post_ids', []);
      const activeItems = items.filter(s => !deleted.includes(s.id) && !deletedPostIds.includes(s.id));
      if (activeItems.length > 0 || suggestionsLoaded || items.length === 0) {
        setSuggestions(activeItems);
      }
      suggestionsLoaded = true;
    });

    // 3. Real-time Users collection listener
    let unsubUsers = () => {};
    try {
      unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
        const uList: AppUser[] = snap.docs.map(d => formatUserData(d.id, d.data()));
        if (uList.length > 0) {
          setUsers(uList);
        }
      }, (err) => {
        console.warn('Users collection listener notice:', err);
      });
    } catch (e) {
      // safe fallback
    }

    // 4. Firebase Authentication state persistence
    const unsubAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const uSnap = await getDoc(doc(db, 'users', fbUser.uid));
          const appU = uSnap.exists()
            ? formatUserData(fbUser.uid, uSnap.data(), fbUser)
            : formatUserData(fbUser.uid, {}, fbUser);

          // If email is Rahat / admin, ensure admin privileges
          if (
            appU.role === 'admin' ||
            isUserAdminEmail(fbUser.email)
          ) {
            appU.role = 'admin';
            setIsAdminAuthenticated(true);
            setStored('admin_authenticated', true);
            if (uSnap.exists() && uSnap.data().role !== 'admin') {
              updateUserRole(fbUser.uid, 'admin').catch(console.warn);
            }
          }

          setCurrentUser(appU);
          setStored('currentUser', appU);
        } catch (e) {
          console.warn('Error fetching user profile:', e);
        }
      } else {
        const storedAdmin = getStored('admin_authenticated', false);
        if (!storedAdmin) {
          setCurrentUser(null);
          setStored('currentUser', null);
          setIsAdminAuthenticated(false);
          setStored('admin_authenticated', false);
        }
      }
    });

    return () => {
      unsubDeleted();
      unsubNotices();
      unsubJobs();
      unsubResults();
      unsubCourses();
      unsubAdmissions();
      unsubSuggestions();
      unsubUsers();
      unsubAuth();
    };
  }, []);

  // Handle direct links for shared posts (e.g. ?type=notice&id=notice-1)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const postType = (params.get('type') || params.get('postType')) as PostType;
      const postId = params.get('id') || params.get('postId') || params.get('post');
      if (postType && postId) {
        setSelectedPost({ type: postType, id: postId });
        if (postType === 'course') {
          setActiveView('course-detail');
        } else {
          setActiveView('post-detail');
        }
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  const incrementWebsiteViews = () => {
    setWebsiteViews(prev => prev + 1);
  };

  const navigateToPost = (type: PostType, id: string) => {
    setSelectedPost({ type, id });
    if (type === 'course') {
      setActiveView('course-detail');
    } else {
      setActiveView('post-detail');
    }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('type', type);
      url.searchParams.set('id', id);
      window.history.replaceState({ type, id }, '', url.toString());
    } catch (e) {
      // safe fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view: ActiveView) => {
    setActiveView(view);
    if (view !== 'post-detail' && view !== 'course-detail') {
      setSelectedPost(null);
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete('type');
        url.searchParams.delete('id');
        url.searchParams.delete('post');
        url.searchParams.delete('postId');
        window.history.replaceState({}, '', url.toString());
      } catch (e) {
        // safe fallback
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // CRUD OPERATIONS WITH CLOUD FIRESTORE
  // ==========================================

  const addNotice = async (noticeData: Omit<NoticePost, 'id' | 'views'>) => {
    const tempId = `notice-${Date.now()}`;
    const newNotice: NoticePost = {
      ...noticeData,
      id: tempId,
      views: 1
    };
    setNotices(prev => [newNotice, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `নতুন নোটিশ: ${noticeData.title}`,
      type: 'notice',
      date: 'এইমাত্র',
      linkPostId: tempId,
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    try {
      await addFirestoreDoc('notices', {
        title: noticeData.title,
        description: noticeData.description,
        fullContent: noticeData.fullContent,
        class: noticeData.classCategory,
        date: noticeData.publishedDate,
        isImportant: noticeData.isImportant,
        attachments: noticeData.attachments || [],
        isPublished: noticeData.isPublished,
        views: 1
      }, tempId);
    } catch (e) {
      console.warn('Firestore add notice:', e);
    }
  };

  const updateNotice = async (id: string, updates: Partial<NoticePost>) => {
    setNotices(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    try {
      const dataToUpdate: any = { ...updates };
      if (updates.classCategory) dataToUpdate.class = updates.classCategory;
      if (updates.publishedDate) dataToUpdate.date = updates.publishedDate;
      await updateFirestoreDoc('notices', id, dataToUpdate);
    } catch (e) {
      console.warn('Firestore update notice:', e);
    }
  };

  const deleteNotice = async (id: string) => {
    markPostAsDeleted(id);
    setNotices(prev => prev.filter(item => item.id !== id));
    try {
      await deleteFirestoreDoc('notices', id);
    } catch (e) {
      console.warn('Firestore delete notice:', e);
    }
  };

  const addJob = async (jobData: Omit<JobPost, 'id' | 'views'>) => {
    const tempId = `job-${Date.now()}`;
    const newJob: JobPost = {
      ...jobData,
      id: tempId,
      views: 1
    };
    setJobs(prev => [newJob, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `চাকরির সার্কুলার: ${jobData.title}`,
      type: 'job',
      date: 'এইমাত্র',
      linkPostId: tempId,
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    try {
      await addFirestoreDoc('jobs', {
        title: jobData.title,
        company: jobData.orgName,
        location: jobData.location,
        deadline: jobData.deadline,
        description: jobData.description,
        salary: jobData.salary,
        jobType: jobData.jobType,
        vacancies: jobData.vacancies,
        qualification: jobData.qualification,
        instructions: jobData.instructions,
        officialLink: jobData.officialLink,
        circularFileUrl: jobData.circularFileUrl || '',
        isPublished: jobData.isPublished,
        views: 1
      }, tempId);
    } catch (e) {
      console.warn('Firestore add job:', e);
    }
  };

  const updateJob = async (id: string, updates: Partial<JobPost>) => {
    setJobs(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    try {
      const dataToUpdate: any = { ...updates };
      if (updates.orgName) dataToUpdate.company = updates.orgName;
      await updateFirestoreDoc('jobs', id, dataToUpdate);
    } catch (e) {
      console.warn('Firestore update job:', e);
    }
  };

  const deleteJob = async (id: string) => {
    markPostAsDeleted(id);
    setJobs(prev => prev.filter(item => item.id !== id));
    try {
      await deleteFirestoreDoc('jobs', id);
    } catch (e) {
      console.warn('Firestore delete job:', e);
    }
  };

  const addResult = async (resData: Omit<ResultPost, 'id' | 'views'>) => {
    const tempId = `res-${Date.now()}`;
    const newRes: ResultPost = {
      ...resData,
      id: tempId,
      views: 1
    };
    setResults(prev => [newRes, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `রেজাল্ট আপডেট: ${resData.title}`,
      type: 'result',
      date: 'এইমাত্র',
      linkPostId: tempId,
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    try {
      await addFirestoreDoc('results', {
        title: resData.title,
        class: resData.examName,
        year: resData.year,
        pdfUrl: resData.officialLink || '',
        boardOrUniversity: resData.boardOrUniversity,
        checkInstructions: resData.checkInstructions,
        officialLink: resData.officialLink,
        category: resData.category,
        smsFormat: resData.smsFormat || '',
        isPublished: resData.isPublished,
        views: 1
      }, tempId);
    } catch (e) {
      console.warn('Firestore add result:', e);
    }
  };

  const updateResult = async (id: string, updates: Partial<ResultPost>) => {
    setResults(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    try {
      const dataToUpdate: any = { ...updates };
      if (updates.examName) dataToUpdate.class = updates.examName;
      await updateFirestoreDoc('results', id, dataToUpdate);
    } catch (e) {
      console.warn('Firestore update result:', e);
    }
  };

  const deleteResult = async (id: string) => {
    markPostAsDeleted(id);
    setResults(prev => prev.filter(item => item.id !== id));
    try {
      await deleteFirestoreDoc('results', id);
    } catch (e) {
      console.warn('Firestore delete result:', e);
    }
  };

  const addCourse = async (courseData: Omit<CoursePost, 'id' | 'views'>) => {
    const tempId = `crs-${Date.now()}`;
    const newCourse: CoursePost = {
      ...courseData,
      id: tempId,
      views: 1
    };
    setCourses(prev => [newCourse, ...prev]);

    try {
      await addFirestoreDoc('courses', {
        title: courseData.title,
        description: courseData.shortDesc,
        fullDesc: courseData.fullDesc,
        imageUrl: courseData.thumbnail,
        price: courseData.price,
        instructorName: courseData.instructorName,
        instructorRole: courseData.instructorRole,
        duration: courseData.duration,
        isPaid: courseData.isPaid,
        category: courseData.category,
        enrollCount: courseData.enrollCount,
        rating: courseData.rating,
        curriculum: courseData.curriculum || [],
        isPublished: courseData.isPublished,
        views: 1
      }, tempId);
    } catch (e) {
      console.warn('Firestore add course:', e);
    }
  };

  const updateCourse = async (id: string, updates: Partial<CoursePost>) => {
    setCourses(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    try {
      const dataToUpdate: any = { ...updates };
      if (updates.shortDesc) dataToUpdate.description = updates.shortDesc;
      if (updates.thumbnail) dataToUpdate.imageUrl = updates.thumbnail;
      await updateFirestoreDoc('courses', id, dataToUpdate);
    } catch (e) {
      console.warn('Firestore update course:', e);
    }
  };

  const deleteCourse = async (id: string) => {
    markPostAsDeleted(id);
    setCourses(prev => prev.filter(item => item.id !== id));
    try {
      await deleteFirestoreDoc('courses', id);
    } catch (e) {
      console.warn('Firestore delete course:', e);
    }
  };

  const addAdmission = async (admData: Omit<AdmissionPost, 'id' | 'views'>) => {
    const tempId = `adm-${Date.now()}`;
    const newAdm: AdmissionPost = {
      ...admData,
      id: tempId,
      views: 1
    };
    setAdmissions(prev => [newAdm, ...prev]);

    try {
      await addFirestoreDoc('admissions', {
        title: admData.title,
        institution: admData.institutionName,
        deadline: admData.deadline,
        description: admData.applicationProcess,
        category: admData.category,
        startDate: admData.startDate,
        eligibility: admData.eligibility,
        fee: admData.fee,
        officialLink: admData.officialLink,
        isPublished: admData.isPublished,
        views: 1
      }, tempId);
    } catch (e) {
      console.warn('Firestore add admission:', e);
    }
  };

  const updateAdmission = async (id: string, updates: Partial<AdmissionPost>) => {
    setAdmissions(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    try {
      const dataToUpdate: any = { ...updates };
      if (updates.institutionName) dataToUpdate.institution = updates.institutionName;
      await updateFirestoreDoc('admissions', id, dataToUpdate);
    } catch (e) {
      console.warn('Firestore update admission:', e);
    }
  };

  const deleteAdmission = async (id: string) => {
    markPostAsDeleted(id);
    setAdmissions(prev => prev.filter(item => item.id !== id));
    try {
      await deleteFirestoreDoc('admissions', id);
    } catch (e) {
      console.warn('Firestore delete admission:', e);
    }
  };

  const addSuggestion = async (sugData: Omit<SuggestionPost, 'id' | 'views'>) => {
    const tempId = `sug-${Date.now()}`;
    const newSug: SuggestionPost = {
      ...sugData,
      id: tempId,
      views: 1
    };
    setSuggestions(prev => [newSug, ...prev]);

    try {
      await addFirestoreDoc('suggestions', {
        class: sugData.classCategory,
        subject: sugData.subject,
        title: sugData.title,
        description: sugData.content,
        pdfUrl: sugData.pdfUrl || '',
        downloadCount: sugData.downloadCount,
        importantQuestions: sugData.importantQuestions || [],
        isPublished: sugData.isPublished,
        views: 1
      }, tempId);
    } catch (e) {
      console.warn('Firestore add suggestion:', e);
    }
  };

  const updateSuggestion = async (id: string, updates: Partial<SuggestionPost>) => {
    setSuggestions(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    try {
      const dataToUpdate: any = { ...updates };
      if (updates.classCategory) dataToUpdate.class = updates.classCategory;
      if (updates.content) dataToUpdate.description = updates.content;
      await updateFirestoreDoc('suggestions', id, dataToUpdate);
    } catch (e) {
      console.warn('Firestore update suggestion:', e);
    }
  };

  const deleteSuggestion = async (id: string) => {
    markPostAsDeleted(id);
    setSuggestions(prev => prev.filter(item => item.id !== id));
    try {
      await deleteFirestoreDoc('suggestions', id);
    } catch (e) {
      console.warn('Firestore delete suggestion:', e);
    }
  };

  const togglePublish = (type: PostType, id: string) => {
    switch (type) {
      case 'notice':
        setNotices(prev => prev.map(item => {
          if (item.id === id) {
            const next = !item.isPublished;
            updateFirestoreDoc('notices', id, { isPublished: next }).catch(console.warn);
            return { ...item, isPublished: next };
          }
          return item;
        }));
        break;
      case 'job':
        setJobs(prev => prev.map(item => {
          if (item.id === id) {
            const next = !item.isPublished;
            updateFirestoreDoc('jobs', id, { isPublished: next }).catch(console.warn);
            return { ...item, isPublished: next };
          }
          return item;
        }));
        break;
      case 'result':
        setResults(prev => prev.map(item => {
          if (item.id === id) {
            const next = !item.isPublished;
            updateFirestoreDoc('results', id, { isPublished: next }).catch(console.warn);
            return { ...item, isPublished: next };
          }
          return item;
        }));
        break;
      case 'course':
        setCourses(prev => prev.map(item => {
          if (item.id === id) {
            const next = !item.isPublished;
            updateFirestoreDoc('courses', id, { isPublished: next }).catch(console.warn);
            return { ...item, isPublished: next };
          }
          return item;
        }));
        break;
      case 'admission':
        setAdmissions(prev => prev.map(item => {
          if (item.id === id) {
            const next = !item.isPublished;
            updateFirestoreDoc('admissions', id, { isPublished: next }).catch(console.warn);
            return { ...item, isPublished: next };
          }
          return item;
        }));
        break;
      case 'suggestion':
        setSuggestions(prev => prev.map(item => {
          if (item.id === id) {
            const next = !item.isPublished;
            updateFirestoreDoc('suggestions', id, { isPublished: next }).catch(console.warn);
            return { ...item, isPublished: next };
          }
          return item;
        }));
        break;
    }
  };

  const getPostById = (type: PostType, id: string): AnyPost | undefined => {
    switch (type) {
      case 'notice': return notices.find(n => n.id === id);
      case 'job': return jobs.find(j => j.id === id);
      case 'result': return results.find(r => r.id === id);
      case 'course': return courses.find(c => c.id === id);
      case 'admission': return admissions.find(a => a.id === id);
      case 'suggestion': return suggestions.find(s => s.id === id);
    }
  };

  // Category management
  const addClass = (name: string) => setClasses(prev => prev.includes(name) ? prev : [...prev, name]);
  const deleteClass = (name: string) => setClasses(prev => prev.filter(c => c !== name));
  const addSubject = (name: string) => setSubjects(prev => prev.includes(name) ? prev : [...prev, name]);
  const deleteSubject = (name: string) => setSubjects(prev => prev.filter(s => s !== name));
  const addJobCategory = (name: string) => setJobCategories(prev => prev.includes(name) ? prev : [...prev, name]);
  const deleteJobCategory = (name: string) => setJobCategories(prev => prev.filter(c => c !== name));
  const addCourseCategory = (name: string) => setCourseCategories(prev => prev.includes(name) ? prev : [...prev, name]);
  const deleteCourseCategory = (name: string) => setCourseCategories(prev => prev.filter(c => c !== name));
  const addAdmissionCategory = (name: string) => setAdmissionCategories(prev => prev.includes(name) ? prev : [...prev, name]);
  const deleteAdmissionCategory = (name: string) => setAdmissionCategories(prev => prev.filter(c => c !== name));

  // ==========================================
  // AUTHENTICATION & USERS
  // ==========================================

  const verifyAdminPassword = (enteredPassword: string): boolean => {
    if (enteredPassword.trim() === adminPassword.trim()) {
      setIsAdminAuthenticated(true);
      setStored('admin_authenticated', true);
      const adminUser: AppUser = {
        id: 'usr-admin-rahat',
        name: 'অ্যাডমিন রাহাত',
        email: 'admin@studywithrahat.com',
        role: 'admin',
        bookmarkedIds: [],
        isActive: true,
        createdAt: '২০২৬-০৩-১৪'
      };
      setCurrentUser(adminUser);
      setStored('currentUser', adminUser);
      return true;
    }
    return false;
  };

  const lockAdmin = () => {
    setIsAdminAuthenticated(false);
    setStored('admin_authenticated', false);
    if (currentUser?.role === 'admin') {
      setCurrentUser(null);
      setStored('currentUser', null);
    }
  };

  const setAdminPassword = (newPassword: string) => {
    setAdminPasswordState(newPassword);
    setStored('admin_password', newPassword);
  };

  const upgradeCurrentUserToAdmin = (password: string): boolean => {
    if (password.trim() === adminPassword.trim()) {
      setIsAdminAuthenticated(true);
      setStored('admin_authenticated', true);
      if (currentUser) {
        const updated: AppUser = { ...currentUser, role: 'admin' };
        setCurrentUser(updated);
        setStored('currentUser', updated);
        updateUserRole(currentUser.id, 'admin').catch(console.warn);
      } else {
        const adminUser: AppUser = {
          id: 'usr-admin-rahat',
          name: 'এডমিন রাহাত',
          email: 'admin@studywithrahat.com',
          role: 'admin',
          bookmarkedIds: [],
          isActive: true,
          createdAt: new Date().toISOString()
        };
        setCurrentUser(adminUser);
        setStored('currentUser', adminUser);
      }
      return true;
    }
    return false;
  };

  // Firebase Auth wrappers
  const firebaseLogin = async (email: string, pass: string, requestedRole?: 'admin' | 'student') => {
    // 1. Direct Admin Master Password Check
    if (
      (requestedRole === 'admin' || isUserAdminEmail(email)) &&
      pass.trim() === adminPassword.trim()
    ) {
      setIsAdminAuthenticated(true);
      setStored('admin_authenticated', true);
      const adminUser: AppUser = {
        id: 'usr-admin-rahat',
        name: 'এডমিন রাহাত',
        email: email || 'admin@studywithrahat.com',
        role: 'admin',
        bookmarkedIds: [],
        isActive: true,
        createdAt: new Date().toISOString()
      };
      setCurrentUser(adminUser);
      setStored('currentUser', adminUser);
      return { success: true, user: adminUser };
    }

    const res = await signInWithEmail(email, pass);
    if (res.success && res.user) {
      if (isUserAdminEmail(res.user.email) || requestedRole === 'admin' || res.user.role === 'admin') {
        res.user.role = 'admin';
        setIsAdminAuthenticated(true);
        setStored('admin_authenticated', true);
        updateUserRole(res.user.id, 'admin').catch(console.warn);
      }
      setCurrentUser(res.user);
      setStored('currentUser', res.user);
    }
    return res;
  };

  const firebaseSignUp = async (email: string, pass: string, name: string, role: 'admin' | 'student' = 'student') => {
    const assignedRole = (isUserAdminEmail(email) || role === 'admin') ? 'admin' : 'student';
    const res = await signUpWithEmail(email, pass, name, assignedRole);
    if (res.success && res.user) {
      if (assignedRole === 'admin') {
        res.user.role = 'admin';
        setIsAdminAuthenticated(true);
        setStored('admin_authenticated', true);
      }
      setCurrentUser(res.user);
      setStored('currentUser', res.user);
    }
    return res;
  };

  const firebaseGoogleLogin = async () => {
    const res = await signInWithGoogle();
    if (res.success && res.user) {
      if (isUserAdminEmail(res.user.email) || res.user.role === 'admin') {
        res.user.role = 'admin';
        setIsAdminAuthenticated(true);
        setStored('admin_authenticated', true);
        updateUserRole(res.user.id, 'admin').catch(console.warn);
      }
      setCurrentUser(res.user);
      setStored('currentUser', res.user);
    }
    return res;
  };

  const firebaseForgotPassword = async (email: string) => {
    return await sendPasswordReset(email);
  };

  const firebaseLogout = async () => {
    await logOutUser();
    logout();
  };

  const login = (email: string, role: 'admin' | 'student' = 'student', password?: string): boolean => {
    if (role === 'admin') {
      if (!password || password.trim() !== adminPassword.trim()) {
        return false;
      }
      setIsAdminAuthenticated(true);
      setStored('admin_authenticated', true);
    }

    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      const updated = { ...existing, role };
      setCurrentUser(updated);
      setStored('currentUser', updated);
      return true;
    }
    const newUser: AppUser = {
      id: `usr-${Date.now()}`,
      name: role === 'admin' ? 'এডমিন রাহাত' : 'শিক্ষার্থী ব্যবহারকারী',
      email,
      role,
      bookmarkedIds: [],
      isActive: true,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setStored('currentUser', newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setStored('currentUser', null);
    setIsAdminAuthenticated(false);
    setStored('admin_authenticated', false);
  };

  const toggleUserStatus = (id: string) => {
    const userToToggle = users.find(u => u.id === id);
    if (userToToggle) {
      toggleUserStatusInFirestore(id, userToToggle.isActive).catch(console.warn);
    }
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  const changeUserRole = (id: string, role: 'admin' | 'student') => {
    updateUserRole(id, role).catch(console.warn);
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
  };

  const toggleBookmark = (postId: string) => {
    setBookmarks(prev => {
      if (prev.includes(postId)) {
        return prev.filter(id => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const isBookmarked = (postId: string): boolean => {
    return bookmarks.includes(postId);
  };

  // Notifications
  const unreadNotifCount = notifications.filter(n => !n.isRead).length;

  const markNotifAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Site Settings
  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...updates }));
    updateFirestoreDoc('settings', 'site_config', updates).catch(console.warn);
  };

  // Ads
  const toggleAd = (id: string) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, isEnabled: !ad.isEnabled } : ad));
  };

  const updateAd = (id: string, updates: Partial<AdPlacement>) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, ...updates } : ad));
  };

  // Media
  const uploadMedia = (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const newItem: MediaItem = {
      ...item,
      id: `med-${Date.now()}`,
      uploadedAt: new Date().toISOString()
    };
    setMediaItems(prev => [newItem, ...prev]);
  };

  const deleteMedia = (id: string) => {
    setMediaItems(prev => prev.filter(m => m.id !== id));
  };

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedPost,
        navigateToPost,
        navigateTo,

        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,

        isFirebaseConnected,
        isFirebaseSyncing,

        notices,
        jobs,
        results,
        courses,
        admissions,
        suggestions,

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

        togglePublish,
        getPostById,

        classes,
        subjects,
        jobCategories,
        courseCategories,
        admissionCategories,
        addClass,
        deleteClass,
        addSubject,
        deleteSubject,
        addJobCategory,
        deleteJobCategory,
        addCourseCategory,
        deleteCourseCategory,
        addAdmissionCategory,
        deleteAdmissionCategory,

        currentUser,
        users,
        adminPassword,
        isAdminAuthenticated,
        verifyAdminPassword,
        setAdminPassword,
        lockAdmin,
        upgradeCurrentUserToAdmin,

        firebaseLogin,
        firebaseSignUp,
        firebaseGoogleLogin,
        firebaseForgotPassword,
        firebaseLogout,

        login,
        logout,
        toggleUserStatus,
        changeUserRole,
        bookmarks,
        toggleBookmark,
        isBookmarked,

        shareTarget,
        openShareModal,
        closeShareModal,

        notifications,
        unreadNotifCount,
        markNotifAsRead,
        markAllNotifsAsRead,

        siteSettings,
        updateSiteSettings,

        ads,
        toggleAd,
        updateAd,

        mediaItems,
        uploadMedia,
        deleteMedia,

        websiteViews,
        incrementWebsiteViews,

        enrolledCourseIds,
        enrollInCourse
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
