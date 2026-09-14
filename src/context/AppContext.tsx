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
  AnyPost
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

  // Content
  notices: NoticePost[];
  jobs: JobPost[];
  results: ResultPost[];
  courses: CoursePost[];
  admissions: AdmissionPost[];
  suggestions: SuggestionPost[];

  // CRUD
  addNotice: (notice: Omit<NoticePost, 'id' | 'views'>) => void;
  updateNotice: (id: string, notice: Partial<NoticePost>) => void;
  deleteNotice: (id: string) => void;

  addJob: (job: Omit<JobPost, 'id' | 'views'>) => void;
  updateJob: (id: string, job: Partial<JobPost>) => void;
  deleteJob: (id: string) => void;

  addResult: (res: Omit<ResultPost, 'id' | 'views'>) => void;
  updateResult: (id: string, res: Partial<ResultPost>) => void;
  deleteResult: (id: string) => void;

  addCourse: (course: Omit<CoursePost, 'id' | 'views'>) => void;
  updateCourse: (id: string, course: Partial<CoursePost>) => void;
  deleteCourse: (id: string) => void;

  addAdmission: (adm: Omit<AdmissionPost, 'id' | 'views'>) => void;
  updateAdmission: (id: string, adm: Partial<AdmissionPost>) => void;
  deleteAdmission: (id: string) => void;

  addSuggestion: (sug: Omit<SuggestionPost, 'id' | 'views'>) => void;
  updateSuggestion: (id: string, sug: Partial<SuggestionPost>) => void;
  deleteSuggestion: (id: string) => void;

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
  login: (email: string, role?: 'admin' | 'student', password?: string) => boolean;
  logout: () => void;
  toggleUserStatus: (id: string) => void;
  changeUserRole: (id: string, role: 'admin' | 'student') => void;
  bookmarks: string[];
  toggleBookmark: (postId: string) => void;
  isBookmarked: (postId: string) => boolean;

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
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`swr_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedPost, setSelectedPost] = useState<{ type: PostType; id: string } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Content state
  const [notices, setNotices] = useState<NoticePost[]>(() => getStored('notices', INITIAL_NOTICES));
  const [jobs, setJobs] = useState<JobPost[]>(() => getStored('jobs', INITIAL_JOBS));
  const [results, setResults] = useState<ResultPost[]>(() => getStored('results', INITIAL_RESULTS));
  const [courses, setCourses] = useState<CoursePost[]>(() => getStored('courses', INITIAL_COURSES));
  const [admissions, setAdmissions] = useState<AdmissionPost[]>(() => getStored('admissions', INITIAL_ADMISSIONS));
  const [suggestions, setSuggestions] = useState<SuggestionPost[]>(() => getStored('suggestions', INITIAL_SUGGESTIONS));

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

  // Synchronize with localStorage
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view: ActiveView) => {
    setActiveView(view);
    if (view !== 'post-detail' && view !== 'course-detail') {
      setSelectedPost(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CRUD functions
  const addNotice = (noticeData: Omit<NoticePost, 'id' | 'views'>) => {
    const id = `notice-${Date.now()}`;
    const newNotice: NoticePost = {
      ...noticeData,
      id,
      views: 1
    };
    setNotices(prev => [newNotice, ...prev]);
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `নতুন নোটিশ: ${noticeData.title}`,
      type: 'notice',
      date: 'এইমাত্র',
      linkPostId: id,
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateNotice = (id: string, updates: Partial<NoticePost>) => {
    setNotices(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(item => item.id !== id));
  };

  const addJob = (jobData: Omit<JobPost, 'id' | 'views'>) => {
    const id = `job-${Date.now()}`;
    const newJob: JobPost = {
      ...jobData,
      id,
      views: 1
    };
    setJobs(prev => [newJob, ...prev]);
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `চাকরির সার্কুলার: ${jobData.title}`,
      type: 'job',
      date: 'এইমাত্র',
      linkPostId: id,
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateJob = (id: string, updates: Partial<JobPost>) => {
    setJobs(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(item => item.id !== id));
  };

  const addResult = (resData: Omit<ResultPost, 'id' | 'views'>) => {
    const id = `res-${Date.now()}`;
    const newRes: ResultPost = {
      ...resData,
      id,
      views: 1
    };
    setResults(prev => [newRes, ...prev]);
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `রেজাল্ট আপডেট: ${resData.title}`,
      type: 'result',
      date: 'এইমাত্র',
      linkPostId: id,
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateResult = (id: string, updates: Partial<ResultPost>) => {
    setResults(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteResult = (id: string) => {
    setResults(prev => prev.filter(item => item.id !== id));
  };

  const addCourse = (courseData: Omit<CoursePost, 'id' | 'views'>) => {
    const id = `crs-${Date.now()}`;
    const newCourse: CoursePost = {
      ...courseData,
      id,
      views: 1
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const updateCourse = (id: string, updates: Partial<CoursePost>) => {
    setCourses(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(item => item.id !== id));
  };

  const addAdmission = (admData: Omit<AdmissionPost, 'id' | 'views'>) => {
    const id = `adm-${Date.now()}`;
    const newAdm: AdmissionPost = {
      ...admData,
      id,
      views: 1
    };
    setAdmissions(prev => [newAdm, ...prev]);
  };

  const updateAdmission = (id: string, updates: Partial<AdmissionPost>) => {
    setAdmissions(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteAdmission = (id: string) => {
    setAdmissions(prev => prev.filter(item => item.id !== id));
  };

  const addSuggestion = (sugData: Omit<SuggestionPost, 'id' | 'views'>) => {
    const id = `sug-${Date.now()}`;
    const newSug: SuggestionPost = {
      ...sugData,
      id,
      views: 1
    };
    setSuggestions(prev => [newSug, ...prev]);
  };

  const updateSuggestion = (id: string, updates: Partial<SuggestionPost>) => {
    setSuggestions(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(item => item.id !== id));
  };

  const togglePublish = (type: PostType, id: string) => {
    switch (type) {
      case 'notice':
        setNotices(prev => prev.map(item => item.id === id ? { ...item, isPublished: !item.isPublished } : item));
        break;
      case 'job':
        setJobs(prev => prev.map(item => item.id === id ? { ...item, isPublished: !item.isPublished } : item));
        break;
      case 'result':
        setResults(prev => prev.map(item => item.id === id ? { ...item, isPublished: !item.isPublished } : item));
        break;
      case 'course':
        setCourses(prev => prev.map(item => item.id === id ? { ...item, isPublished: !item.isPublished } : item));
        break;
      case 'admission':
        setAdmissions(prev => prev.map(item => item.id === id ? { ...item, isPublished: !item.isPublished } : item));
        break;
      case 'suggestion':
        setSuggestions(prev => prev.map(item => item.id === id ? { ...item, isPublished: !item.isPublished } : item));
        break;
    }
  };

  const getPostById = (type: PostType, id: string): AnyPost | undefined => {
    switch (type) {
      case 'notice':
        return notices.find(n => n.id === id);
      case 'job':
        return jobs.find(j => j.id === id);
      case 'result':
        return results.find(r => r.id === id);
      case 'course':
        return courses.find(c => c.id === id);
      case 'admission':
        return admissions.find(a => a.id === id);
      case 'suggestion':
        return suggestions.find(s => s.id === id);
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

  // Users & Auth
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
      createdAt: '২০২৬-০৩-১৪'
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
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  const changeUserRole = (id: string, role: 'admin' | 'student') => {
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
      uploadedAt: '২০২৬-০৩-১৪'
    };
    setMediaItems(prev => [newItem, ...prev]);
  };

  const deleteMedia = (id: string) => {
    setMediaItems(prev => prev.filter(m => m.id !== id));
  };

  // Enroll in course
  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
      // increment course enrollCount
      setCourses(prev => prev.map(c => c.id === courseId ? { ...c, enrollCount: c.enrollCount + 1 } : c));
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
        login,
        logout,
        toggleUserStatus,
        changeUserRole,
        bookmarks,
        toggleBookmark,
        isBookmarked,

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
