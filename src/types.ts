export type PostType = 'notice' | 'job' | 'result' | 'course' | 'admission' | 'suggestion';

export interface Attachment {
  name: string;
  url: string;
  type: 'pdf' | 'image' | 'doc';
  size?: string;
}

export interface NoticePost {
  id: string;
  slug: string;
  type: 'notice';
  title: string;
  classCategory: string; // e.g., 'Class 10', 'SSC', 'HSC', 'Polytechnic', 'Honours'
  description: string;
  fullContent: string;
  publishedDate: string;
  isImportant: boolean;
  attachments?: Attachment[];
  views: number;
  tags?: string[];
  isPublished: boolean;
}

export interface JobPost {
  id: string;
  slug: string;
  type: 'job';
  title: string;
  orgName: string;
  jobType: 'Government Jobs' | 'Private Jobs' | 'Bank Jobs' | 'NGO Jobs' | 'Police Jobs' | 'Army Jobs' | 'Navy Jobs' | 'Air Force Jobs' | 'Railway Jobs' | 'Teaching Jobs' | 'Part-time Jobs' | 'Internship';
  vacancies: string;
  qualification: string;
  ageLimit: string;
  salary: string;
  deadline: string; // e.g., '2026-10-15'
  location: string;
  description: string;
  instructions: string;
  officialLink: string;
  circularFileUrl?: string;
  views: number;
  tags?: string[];
  isPublished: boolean;
}

export interface ResultPost {
  id: string;
  slug: string;
  type: 'result';
  title: string;
  examName: string;
  year: string;
  boardOrUniversity: string;
  publishedDate: string;
  checkInstructions: string;
  officialLink: string;
  detailedArticle: string;
  category: 'SSC Result' | 'HSC Result' | 'JSC/Equivalent' | 'Polytechnic Result' | 'University Result' | 'Admission Result' | 'Exam Result';
  views: number;
  smsFormat?: string;
  isPublished: boolean;
}

export interface CourseCurriculumItem {
  module: string;
  topics: string[];
}

export interface CoursePost {
  id: string;
  slug: string;
  type: 'course';
  title: string;
  shortDesc: string;
  fullDesc: string;
  instructorName: string;
  instructorRole: string;
  duration: string;
  isPaid: boolean;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  category: 'Academic Courses' | 'SSC Preparation' | 'HSC Preparation' | 'Admission Preparation' | 'Freelancing' | 'Computer Skills' | 'English' | 'ICT' | 'চাকরি প্রস্তুতি';
  enrollCount: number;
  rating: number;
  views: number;
  curriculum?: CourseCurriculumItem[];
  isPublished: boolean;
}

export interface AdmissionPost {
  id: string;
  slug: string;
  type: 'admission';
  institutionName: string;
  category: 'School Admission' | 'College Admission' | 'University Admission' | 'Polytechnic Admission' | 'Medical Admission' | 'Engineering Admission' | 'Honours Admission' | 'Degree Admission' | 'XI Class Admission';
  title: string;
  startDate: string;
  deadline: string;
  eligibility: string;
  applicationProcess: string;
  fee: string;
  requiredDocuments: string[];
  officialLink: string;
  importantDates: { label: string; date: string }[];
  views: number;
  isPublished: boolean;
}

export interface SuggestionPost {
  id: string;
  slug: string;
  type: 'suggestion';
  title: string;
  classCategory: string; // 'Class 6' - 'HSC', 'Polytechnic'
  subject: string; // 'Bangla', 'Mathematics', 'English', etc.
  content: string;
  pdfUrl?: string;
  downloadCount: number;
  importantQuestions: string[];
  mcqHints: string[];
  creativeQuestions: string[];
  examTips: string[];
  views: number;
  isPublished: boolean;
}

export type AnyPost = NoticePost | JobPost | ResultPost | CoursePost | AdmissionPost | SuggestionPost;

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  phone?: string;
  avatar?: string;
  bookmarkedIds: string[];
  isActive: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  type: PostType;
  date: string;
  linkPostId: string;
  isRead: boolean;
}

export interface AdPlacement {
  id: 'header' | 'home_middle' | 'sidebar' | 'article_top' | 'article_bottom' | 'footer';
  name: string;
  isEnabled: boolean;
  adText: string;
  targetUrl: string;
  bannerImageUrl?: string;
  codeSnippet?: string;
}

export interface SiteSettings {
  websiteName: string;
  tagline: string;
  logoText: string;
  logoSub: string;
  email: string;
  phone: string;
  address: string;
  facebookUrl: string;
  youtubeUrl: string;
  telegramUrl: string;
  footerText: string;
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'pdf';
  url: string;
  size: string;
  uploadedAt: string;
}
