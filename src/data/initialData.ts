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
  MediaItem
} from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  websiteName: 'Study With Rahat',
  tagline: 'শিক্ষা, ভর্তি, চাকরি ও ক্যারিয়ারের নির্ভরযোগ্য তথ্য',
  logoText: 'Study With Rahat',
  logoSub: 'Education & Career Hub',
  email: 'contact@studywithrahat.com',
  phone: '+880 1712-345678',
  address: 'ফার্মগেট, ঢাকা-১২১৫, বাংলাদেশ',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  telegramUrl: 'https://t.me/studywithrahat',
  footerText: '© 2026 Study With Rahat. সর্বস্বত্ব সংরক্ষিত। বাংলাদেশের শিক্ষার্থীদের নির্ভরযোগ্য তথ্য ভাণ্ডার।'
};

export const INITIAL_NOTICES: NoticePost[] = [
  {
    id: 'notice-1',
    slug: 'ssc-exam-form-fillup-2026',
    type: 'notice',
    title: 'এসএসসি পরীক্ষা ২০২৬ ফরম পূরণ ও সময়সূচি সংক্রান্ত জরুরি বিজ্ঞপ্তি',
    classCategory: 'SSC',
    description: 'ঢাকা মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড কর্তৃক ২০২৬ সালের এসএসসি পরীক্ষার্থীদের ফরম পূরণের বিজ্ঞপ্তি ও ফি সংক্রান্ত তথ্যাদি প্রকাশ করা হয়েছে।',
    fullContent: `২০২৬ সালের মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষার ফরম পূরণ সংক্রান্ত বিজ্ঞপ্তি প্রকাশ করেছে ঢাকা শিক্ষা বোর্ড। বিজ্ঞপ্তিতে বলা হয়েছে, অনলাইনে ফরম পূরণ নির্ধারিত সময়ের মধ্যে সম্পন্ন করতে হবে।\n\n১. ফরম পূরণ শুরুর তারিখ: ১৫ জানুয়ারি ২০২৬\n২. ফরম পূরণের শেষ তারিখ: ২৫ ফেব্রুয়ারি ২০২৬\n৩. লেট ফি সহ ফরম পূরণের তারিখ: ০৫ মার্চ ২০২৬ পর্যন্ত।\n\nবিজ্ঞান বিভাগের শিক্ষার্থীদের জন্য ফি নির্ধারণ করা হয়েছে ২,১৪০ টাকা এবং ব্যবসায় শিক্ষা ও মানবিক বিভাগের জন্য ২,০২০ টাকা। ফি পরিশোধে কোনো বিলম্ব হলে জরিমানা প্রযোজ্য হবে।`,
    publishedDate: '২০২৬-০২-১২',
    isImportant: true,
    attachments: [
      { name: 'SSC_Form_Fillup_Notice_2026.pdf', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80', type: 'pdf', size: '1.4 MB' }
    ],
    views: 4520,
    tags: ['SSC 2026', 'ঢাকা বোর্ড', 'ফরম পূরণ'],
    isPublished: true
  },
  {
    id: 'notice-2',
    slug: 'hsc-routine-and-exam-guidelines-2026',
    type: 'notice',
    title: 'এইচএসসি পরীক্ষা ২০২৬ চূড়ান্ত রুটিন ও কেন্দ্র নির্দেশনা প্রকাশ',
    classCategory: 'HSC',
    description: 'চলতি বছরের এইচএসসি ও সমমানের পরীক্ষার পূর্ণাঙ্গ সময়সূচি ও প্রবেশপত্র বিতরণ সংক্রান্ত বিস্তারিত নির্দেশনা।',
    fullContent: `এইচএসসি ও সমমানের পরীক্ষা ২০২৬ এর আনুষ্ঠানিক রুটিন আন্তঃশিক্ষা বোর্ড সমন্বয় কমিটি কর্তৃক প্রকাশ করা হয়েছে। সকল বোর্ডের অধীনে পরীক্ষা আগামী জুন মাস থেকে একযোগে শুরু হবে। পরীক্ষার্থীদের পরীক্ষা শুরুর অন্তত ৩০ মিনিট পূর্বে পরীক্ষার হলে উপস্থিত হতে হবে। ওএমআর শিট পূরণে সতর্কতা অবলম্বনের অনুরোধ জানানো হয়েছে।`,
    publishedDate: '২০২৬-০৩-০৪',
    isImportant: true,
    attachments: [
      { name: 'HSC_2026_Official_Routine.pdf', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80', type: 'pdf', size: '2.1 MB' }
    ],
    views: 8930,
    tags: ['HSC 2026', 'রুটিন', 'আন্তঃশিক্ষা বোর্ড'],
    isPublished: true
  },
  {
    id: 'notice-3',
    slug: 'polytechnic-semester-exam-schedule-2026',
    type: 'notice',
    title: 'পলিটেকনিক ১ম, ৩য়, ৫ম ও ৭ম পর্ব সমাপনী পরীক্ষার সময়সূচি ২০২৬',
    classCategory: 'Polytechnic',
    description: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) এর অধীন ডিপ্লোমা ইন ইঞ্জিনিয়ারিং শিক্ষাক্রমের পর্ব সমাপনী পরীক্ষার সংশোধিত রুটিন।',
    fullContent: `বাংলাদেশ কারিগরি শিক্ষা বোর্ডের আওতাধীন সকল সরকারি ও বেসরকারি পলিটেকনিক ইনস্টিটিউটের ডিপ্লোমা ইন ইঞ্জিনিয়ারিং শিক্ষাক্রমের ছাত্র-ছাত্রীদের অবগতির জন্য জানানো যাচ্ছে যে, ২০২৬ সনের সেমিস্টার ফাইনাল পরীক্ষার রুটিন প্রকাশিত হয়েছে। ব্যবহারিক পরীক্ষা তত্ত্বীয় পরীক্ষার পর স্ব স্ব ইনস্টিটিউটে অনুষ্ঠিত হবে।`,
    publishedDate: '২০২৬-০২-২৮',
    isImportant: false,
    attachments: [
      { name: 'BTEB_Diploma_Exam_Routine_2026.pdf', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80', type: 'pdf', size: '980 KB' }
    ],
    views: 3120,
    tags: ['BTEB', 'পলিটেকনিক', 'ডিপ্লোমা'],
    isPublished: true
  },
  {
    id: 'notice-4',
    slug: 'class-9-10-registration-deadline-extended',
    type: 'notice',
    title: '৯ম-১০ম শ্রেণির শিক্ষার্থীদের বোর্ড রেজিস্ট্রেশনের সময়সীমা বৃদ্ধি',
    classCategory: 'Class 9',
    description: 'মাধ্যমিক বিদ্যালয়ের ৯ম শ্রেণিতে অধ্যয়নরত শিক্ষার্থীদের ই-রেজিস্ট্রেশন কার্যক্রমের সময়সীমা আগামী ২০ মার্চ পর্যন্ত বৃদ্ধি করা হয়েছে।',
    fullContent: `শিক্ষা মন্ত্রণালয়ের মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর জানিয়েছে, সার্ভার জটিলতা ও প্রতিষ্ঠান প্রধানদের আবেদনের প্রেক্ষিতে ৯ম শ্রেণির শিক্ষার্থীদের রেজিস্ট্রেশন কার্ড সংশোধনের শেষ সুযোগ দেওয়া হয়েছে। এই সময়ের পর কোনো আবেদন গ্রহণযোগ্য হবে না।`,
    publishedDate: '২০২৬-০৩-০১',
    isImportant: false,
    views: 1840,
    tags: ['Class 9', 'রেজিস্ট্রেশন', 'মাধ্যমিক'],
    isPublished: true
  },
  {
    id: 'notice-5',
    slug: 'national-university-honours-form-fillup',
    type: 'notice',
    title: 'জাতীয় বিশ্ববিদ্যালয় অনার্স ৩য় বর্ষ পরীক্ষার ফরম পূরণ বিজ্ঞপ্তি',
    classCategory: 'Honours',
    description: 'জাতীয় বিশ্ববিদ্যালয়ের ২০২৩-২৪ শিক্ষাবর্ষের নিয়মিত ও অনিয়মিত শিক্ষার্থীদের পরীক্ষার ফরম পূরণের ফি ও নির্দেশিকা।',
    fullContent: `জাতীয় বিশ্ববিদ্যালয়ের অধীনে ২০২২-২৩ ও ২০২৩-২৪ শিক্ষাবর্ষের বিএ/বিএসএস/বিবিএ/বিএসসি অনার্স ৩য় বর্ষ পরীক্ষার ফরম পূরণের অনলাইনে আবেদন প্রক্রিয়া শুরু হয়েছে। শিক্ষার্থীরা তাদের সোনালী সেবার মাধ্যমে ফি প্রদান করতে পারবে।`,
    publishedDate: '২০২৬-০২-১৮',
    isImportant: true,
    attachments: [
      { name: 'NU_Honours_3rd_Year_Notice.pdf', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', type: 'pdf', size: '1.2 MB' }
    ],
    views: 6410,
    tags: ['জাতীয় বিশ্ববিদ্যালয়', 'অনার্স', 'NU'],
    isPublished: true
  },
  {
    id: 'notice-6',
    slug: 'class-8-scholarship-exam-guidelines',
    type: 'notice',
    title: '৮ম শ্রেণির মেধা ও সাধারণ বৃত্তি ফলাফল এবং সনদপত্র বিতরণ',
    classCategory: 'Class 8',
    description: 'জুনিয়র বৃত্তি পরীক্ষা ২০২৬ এর সংশোধিত ফলাফল ও নির্বাচিত শিক্ষার্থীদের ব্যাংক অ্যাকাউন্ট আপডেট সংক্রান্ত বিজ্ঞপ্তি।',
    fullContent: `সকল জেলা শিক্ষা কর্মকর্তা ও উপজেলা মাধ্যমিক শিক্ষা কর্মকর্তাদের জানানো যাচ্ছে যে, ২০২৬ সালের ৮ম শ্রেণির মেধা বৃত্তিপ্রাপ্ত শিক্ষার্থীদের তথ্য EFT এর মাধ্যমে পাঠানোর জন্য নির্দেশনা জারি করা হয়েছে।`,
    publishedDate: '২০২৬-০১-৩০',
    isImportant: false,
    views: 2200,
    tags: ['Class 8', 'বৃত্তি', 'শিক্ষা বোর্ড'],
    isPublished: true
  }
];

export const INITIAL_JOBS: JobPost[] = [
  {
    id: 'job-1',
    slug: '47th-bcs-circular-bpsc-2026',
    type: 'job',
    title: '৪৭তম বিসিএস পরীক্ষার নিয়োগ বিজ্ঞপ্তি ২০২৬ (বিপিএসসি)',
    orgName: 'বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)',
    jobType: 'Government Jobs',
    vacancies: '৩,৪৮০ জন ক্যাডার ও নন-ক্যাডার',
    qualification: 'যেকোনো স্বীকৃত বিশ্ববিদ্যালয় হতে ৪ বছর মেয়াদি স্নাতক বা সমমানের ডিগ্রি',
    ageLimit: '২১ থেকে ৩২ বছর (কোটাধারীদের জন্য ৩৩ বছর)',
    salary: 'জাতীয় বেতন স্কেল ২০১৫ এর ৯ম গ্রেড (২২,০০০ - ৫৩,০৬০ টাকা)',
    deadline: '২০২৬-০৪-৩০',
    location: 'সমগ্র বাংলাদেশ',
    description: 'বাংলাদেশ সরকারি কর্ম কমিশন কর্তৃক ৪৭তম বিসিএস এর মাধ্যমে প্রশাসন, পুলিশ, পররাষ্ট্র, স্বাস্থ্য, শিক্ষা সহ বিভিন্ন ক্যাডারে ৩,৪৮০ জন প্রথম শ্রেণির কর্মকর্তা নিয়োগের বিজ্ঞপ্তি প্রকাশ করা হয়েছে।',
    instructions: 'বিপিএসসির অফিসিয়াল টেলিটক ওয়েবসাইটে (bpsc.teletalk.com.bd) অনলাইনে আবেদন করতে হবে। নির্ধারিত সময়ের মধ্যে ৭০০ টাকা ফি এসএমএসের মাধ্যমে জমা দিতে হবে।',
    officialLink: 'https://bpsc.teletalk.com.bd',
    circularFileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    views: 24500,
    tags: ['বিসিএস', 'সরকারি চাকরি', 'BPSC', 'ক্যাডার'],
    isPublished: true
  },
  {
    id: 'job-2',
    slug: 'bangladesh-bank-assistant-director-circular',
    type: 'job',
    title: 'বাংলাদেশ ব্যাংক সহকারী পরিচালক (জেনারেল) নিয়োগ ২০২৬',
    orgName: 'বাংলাদেশ ব্যাংক (সেন্ট্রাল ব্যাংক)',
    jobType: 'Bank Jobs',
    vacancies: '১০০ জন',
    qualification: 'যেকোনো বিষয়ে ৪ বছর মেয়াদি সম্মান ডিগ্রি অথবা স্নাতকোত্তর। কমপক্ষে দুটি প্রথম শ্রেণি থাকতে হবে।',
    ageLimit: 'সর্বোচ্চ ৩০ বছর (মুক্তিযোদ্ধা কোটায় ৩২ বছর)',
    salary: '৯ম গ্রেড (২২,০০০ - ৫৩,০৬০ টাকা) + ব্যাংকিং ভাতা ও অন্যান্য সুযোগ-সুবিধা',
    deadline: '২০২৬-০৩-৩১',
    location: 'ঢাকা',
    description: 'কেন্দ্রীয় ব্যাংকের ব্যাংকার্স সিলেকশন কমিটি সচিবালয়ের অধীনে সহকারী পরিচালক (জেনারেল) পদে তরুণ ও দক্ষ প্রার্থীর নিকট থেকে দরখাস্ত আহ্বান করা হয়েছে।',
    instructions: 'বাংলাদেশ ব্যাংকের ই-রিক্রুটমেন্ট পোর্টাল (erecruitment.bb.org.bd) এ অনলাইন অ্যাপ্লিকেশন ফর্ম পূরণ করতে হবে। কোনো ফি প্রদান করতে হবে না।',
    officialLink: 'https://erecruitment.bb.org.bd',
    circularFileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    views: 18200,
    tags: ['বাংলাদেশ ব্যাংক', 'ব্যাংক জব', 'AD'],
    isPublished: true
  },
  {
    id: 'job-3',
    slug: 'primary-assistant-teacher-recruitment-2026',
    type: 'job',
    title: 'প্রাথমিক সহকারী শিক্ষক নিয়োগ বিজ্ঞপ্তি ২০২৬ (সকল বিভাগ)',
    orgName: 'প্রাথমিক শিক্ষা অধিদপ্তর (DPE)',
    jobType: 'Teaching Jobs',
    vacancies: '১২,৬০০ জন',
    qualification: 'দ্বিতীয় শ্রেণি বা সমমানের সিজিপিএসহ স্নাতক বা সমমানের ডিগ্রি',
    ageLimit: '২১ থেকে ৩০ বছর',
    salary: '১৩তম গ্রেড (১১,০০০ - ২৬,৫৯০ টাকা)',
    deadline: '২০২৬-০৪-১৫',
    location: 'নিজ নিজ উপজেলা বা থানা',
    description: 'সরকারি প্রাথমিক বিদ্যালয়ে শূন্য পদে সহকারী শিক্ষক হিসেবে ১২,৬০০ জনের বিশাল নিয়োগ বিজ্ঞপ্তি প্রকাশ করা হয়েছে। নারী ও পুরুষ উভয়ই আবেদন করতে পারবেন।',
    instructions: 'dpe.teletalk.com.bd ওয়েবসাইটে গিয়ে আবেদন ফর্ম পূরণ করতে হবে। আবেদন ফি ২২০ টাকা টেলিটক প্রিপেইড সিমের মাধ্যমে পরিশোধ করতে হবে।',
    officialLink: 'http://dpe.teletalk.com.bd',
    circularFileUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    views: 31000,
    tags: ['প্রাইমারি শিক্ষক', 'DPE', 'শিক্ষক নিয়োগ'],
    isPublished: true
  },
  {
    id: 'job-4',
    slug: 'bangladesh-police-sub-inspector-si-circular',
    type: 'job',
    title: 'বাংলাদেশ পুলিশ ক্যাডেট সাব-ইন্সপেক্টর (এসআই-নিরস্ত্র) নিয়োগ',
    orgName: 'বাংলাদেশ পুলিশ',
    jobType: 'Police Jobs',
    vacancies: '৮৫০ জন',
    qualification: 'ন্যূনতম স্নাতক বা সমমানের ডিগ্রি এবং কম্পিউটারে দক্ষতা',
    ageLimit: '১৯ থেকে ২৭ বছর',
    salary: '১০ম গ্রেড (১৬,০০০ - ৩৮,৬৪০ টাকা) + রেশন ও বিশেষ ঝুঁকিভাতা',
    deadline: '২০২৬-০৩-২৫',
    location: 'বাংলাদেশ পুলিশ একাডেমী ও বিভিন্ন জেলা',
    description: 'বাংলাদেশ পুলিশে সরাসরি সাব-ইন্সপেক্টর (এসআই-নিরস্ত্র) পদে পুরুষ ও নারী প্রার্থীদের নিকট থেকে আবেদনপত্র আহ্বান করা হচ্ছে। শারীরিক মাপ ও শারীরিক সক্ষমতা যাচাই করা হবে।',
    instructions: 'police.teletalk.com.bd এর মাধ্যমে আবেদন করতে হবে।',
    officialLink: 'http://police.teletalk.com.bd',
    views: 14700,
    tags: ['পুলিশ', 'এসআই', 'পুলিশ চাকরি'],
    isPublished: true
  },
  {
    id: 'job-5',
    slug: 'bangladesh-railway-sub-assistant-engineer',
    type: 'job',
    title: 'বাংলাদেশ রেলওয়ে উপ-সহকারী প্রকৌশলী ও স্টেশন মাস্টার নিয়োগ',
    orgName: 'বাংলাদেশ রেলওয়ে (BR)',
    jobType: 'Railway Jobs',
    vacancies: '৫৩০ জন',
    qualification: 'ডিপ্লোমা ইন ইঞ্জিনিয়ারিং (সিভিল/মেকানিক্যাল/ইলেকট্রিক্যাল) অথবা সাধারণ ডিগ্রি',
    ageLimit: '১৮ থেকে ৩০ বছর',
    salary: '১০ম ও ১১তম গ্রেড',
    deadline: '২০২৬-০৫-১০',
    location: 'পূর্বাঞ্চল ও পশ্চিমাঞ্চল রেলওয়ে',
    description: 'বাংলাদেশ রেলওয়ের শূন্য পদসমূহে সরাসরি জনবল নিয়োগের জন্য বিজ্ঞপ্তি প্রকাশ। যোগ্য নাগরিকগণ আবেদন করতে পারবেন।',
    instructions: 'br.teletalk.com.bd ওয়েবসাইটে অনলাইনে আবেদনপত্র দাখিল করতে হবে।',
    officialLink: 'http://br.teletalk.com.bd',
    views: 9200,
    tags: ['রেলওয়ে', 'প্রকৌশলী', 'রেলওয়ে জব'],
    isPublished: true
  },
  {
    id: 'job-6',
    slug: 'brac-ngo-field-program-organizer',
    type: 'job',
    title: 'ব্র্যাক (BRAC) এনজিও কর্মসূচি সংগঠক ও মনিটরিং অফিসার নিয়োগ',
    orgName: 'ব্র্যাক (BRAC Bangladesh)',
    jobType: 'NGO Jobs',
    vacancies: '৩০০ জন',
    qualification: 'স্নাতক/স্নাতকোত্তর পাস। মোটরসাইকেল চালনায় পারদর্শী হতে হবে।',
    ageLimit: 'সর্বোচ্চ ৩৫ বছর',
    salary: '২৮,০০০ - ৩৫,০০০ টাকা (অভিজ্ঞতা অনুযায়ী)',
    deadline: '২০২৬-০৪-০৫',
    location: 'বাংলাদেশের যেকোনো জেলায়',
    description: 'বিশ্বখ্যাত উন্নয়ন সংস্থা ব্র্যাকের মাইক্রোফাইন্যান্স এবং শিক্ষা কর্মসূচিতে মাঠ পর্যায়ের সংগঠক নিয়োগের বিজ্ঞপ্তি।',
    instructions: 'ব্র্যাক ক্যারিয়ার পোর্টাল (careers.brac.net) এ সরাসরি সিভি জমা দিতে হবে।',
    officialLink: 'https://careers.brac.net',
    views: 7800,
    tags: ['ব্র্যাক', 'এনজিও', 'BRAC'],
    isPublished: true
  }
];

export const INITIAL_RESULTS: ResultPost[] = [
  {
    id: 'res-1',
    slug: 'ssc-result-2026-all-education-board',
    type: 'result',
    title: 'এসএসসি ও দাখিল পরীক্ষার ফলাফল ২০২৬ (সকল শিক্ষা বোর্ড)',
    examName: 'মাধ্যমিক স্কুল সার্টিফিকেট (SSC)',
    year: '২০২৬',
    boardOrUniversity: 'সকল শিক্ষা বোর্ড বাংলাদেশ',
    publishedDate: '২০২৬-০৫-০৮',
    category: 'SSC Result',
    checkInstructions: `অনলাইনে রেজাল্ট দেখার নিয়মাবলী:\n১. eboardresults.com অথবা educationboardresults.gov.bd ওয়েবসাইটে যান।\n২. Examination সিলেক্ট করুন 'SSC/Dakhil/Equivalent'।\n৩. Year সিলেক্ট করুন '2026'।\n৪. আপনার বোর্ডের নাম সিলেক্ট করুন (যেমন: Dhaka, Chittagong, Rajshahi ইত্যাদি)।\n৫. আপনার Roll এবং Registration নম্বর দিন।\n৬. ক্যাপচা কোড লিখে 'Get Result' বাটনে ক্লিক করুন।\n\nএসএমএসের মাধ্যমে রেজাল্ট:\nমোবাইলের মেসেজ অপশনে যান এবং টাইপ করুন:\nSSC <space> প্রথম ৩ অক্ষর বোর্ডের নাম <space> Roll Number <space> 2026\nউদাহরণ: SSC DHA 123456 2026 এবং পাঠিয়ে দিন 16222 নম্বরে।`,
    officialLink: 'https://eboardresults.com',
    detailedArticle: 'শিক্ষা মন্ত্রণালয় কর্তৃক ২০২৬ সালের এসএসসি ও সমমানের পরীক্ষার ফলাফল একযোগে প্রকাশিত হয়েছে। চলতি বছর পাসের হার ৮৪.৫% এবং জিপিএ-৫ পেয়েছে ১,৮৫,৪০০ জন শিক্ষার্থী। ফলাফল পুনর্নিরীক্ষণ বা খাতা চ্যালেঞ্জ করার আবেদন ফল প্রকাশের পরবর্তী ৭ দিনের মধ্যে টেলিটকের মাধ্যমে করা যাবে।',
    smsFormat: 'SSC DHA 123456 2026 send to 16222',
    views: 39000,
    isPublished: true
  },
  {
    id: 'res-2',
    slug: 'hsc-board-challenge-re-scrutiny-result',
    type: 'result',
    title: 'এইচএসসি খাতা চ্যালেঞ্জ ফলাফল ২০২৫-২০২৬ (বোর্ড পুনর্নিরীক্ষণ)',
    examName: 'উচ্চ মাধ্যমিক সার্টিফিকেট (HSC Re-check)',
    year: '২০২৫-২৬',
    boardOrUniversity: 'ঢাকা, চট্টগ্রাম, রাজশাহী ও কুমিল্লা বোর্ড',
    publishedDate: '২০২৬-০১-২৪',
    category: 'HSC Result',
    checkInstructions: 'স্ব স্ব শিক্ষা বোর্ডের অফিশিয়াল ওয়েবসাইটে গিয়ে Notice বোর্ডে প্রবেশ করুন এবং আপনার রোল নম্বর রোল লিস্টে সার্চ করে সংশোধিত ফলাফল বা গ্রেড পরিবর্তন হয়েছে কিনা যাচাই করুন।',
    officialLink: 'https://dhakaeducationboard.gov.bd',
    detailedArticle: 'যেসব শিক্ষার্থী এইচএসসি পরীক্ষার ফলাফলে অসন্তুষ্ট হয়ে খাতা পুনর্নিরীক্ষণের আবেদন করেছিল, তাদের সংশোধিত ফলাফল প্রকাশ করা হয়েছে। বহু শিক্ষার্থীর জিপিএ ও গ্রেড বৃদ্ধি পেয়েছে।',
    views: 12400,
    isPublished: true
  },
  {
    id: 'res-3',
    slug: 'bteb-polytechnic-diploma-semester-result-2026',
    type: 'result',
    title: 'কারিগরি শিক্ষা বোর্ড ডিপ্লোমা ইন ইঞ্জিনিয়ারিং পর্ব সমাপনী ফলাফল',
    examName: 'ডিপ্লোমা ইন ইঞ্জিনিয়ারিং (১ম, ৩য়, ৫ম, ৭ম পর্ব)',
    year: '২০২৬',
    boardOrUniversity: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB)',
    publishedDate: '২০২৬-০২-১২',
    category: 'Polytechnic Result',
    checkInstructions: 'bteb.gov.bd অথবা btebresuls.net ওয়েবসাইটে যান। রোল নম্বর ও রেজি: নম্বর প্রদান করে ফলাফল প্রিন্ট করুন।',
    officialLink: 'http://btebresuls.net',
    detailedArticle: 'কারিগরি বোর্ডের অধীনে সরকারি ও বেসরকারি পলিটেকনিকের সেমিস্টার ফাইনাল পরীক্ষার ফলাফল আনুষ্ঠানিকভাবে ঘোষণা করা হয়েছে। রেফার্ট প্রাপ্তদের আগামী সেমিস্টারে পরীক্ষা দেওয়ার নির্দেশ দেওয়া হয়েছে।',
    views: 8700,
    isPublished: true
  },
  {
    id: 'res-4',
    slug: 'dhaka-university-honours-admission-test-result',
    type: 'result',
    title: 'ঢাকা বিশ্ববিদ্যালয় স্নাতক ১ম বর্ষ ভর্তি পরীক্ষার ফলাফল ২০২৬',
    examName: 'DU Undergraduate Admission Test',
    year: '২০২৬-২০২৭',
    boardOrUniversity: 'ঢাকা বিশ্ববিদ্যালয় (DU)',
    publishedDate: '২০২৬-০২-২৭',
    category: 'Admission Result',
    checkInstructions: 'admission.eis.du.ac.bd সাইটে লগইন করে আপনার ড্যাশবোর্ড থেকে মেধা স্কোর ও পজিশন চেক করুন।',
    officialLink: 'https://admission.eis.du.ac.bd',
    detailedArticle: 'ঢাকা বিশ্ববিদ্যালয়ের কলা, আইন ও সামাজিক বিজ্ঞান ইউনিট এবং বিজ্ঞান ইউনিটের ভর্তি পরীক্ষার মেধা তালিকা প্রকাশ করা হয়েছে। উত্তীর্ণ শিক্ষার্থীদের সাবজেক্ট চয়েস ফর্ম পূরণ শুরু হবে আগামী ৫ মার্চ থেকে।',
    views: 22100,
    isPublished: true
  }
];

export const INITIAL_COURSES: CoursePost[] = [
  {
    id: 'crs-1',
    slug: 'hsc-ict-complete-masterclass',
    type: 'course',
    title: 'এইচএসসি আইসিটি (ICT) সম্পূর্ণ সিলেবাস মাস্টারক্লাস ২০২৬',
    shortDesc: 'অধ্যায় ১ থেকে ৬ পর্যন্ত সকল প্রোগ্রামিং (C Language), HTML, ডেটাবেজ ও সংখ্যা পদ্ধতি সহজ বাংলায় শিখুন।',
    fullDesc: 'এইচএসসি পরীক্ষার্থীদের জন্য আইসিটিতে এ+ নিশ্চিত করতে এই বিশেষ কোর্সটি সাজানো হয়েছে। রাহাত স্যারের সরাসরি তত্ত্বাবধানে অধ্যায়ভিত্তিক ক্লাস, সৃজনশীল প্রশ্ন সমাধান, এমসিকিউ কুইজ এবং লাইভ প্র্যাকটিক্যাল কোডিং শেখানো হবে।',
    instructorName: 'রাহাত হোসাইন (Rahat Sir)',
    instructorRole: 'আইসিটি বিশেষজ্ঞ ও মেন্টর (বুয়েট অ্যালামনাই)',
    duration: '৪ মাস (৮০+ লাইভ ও রেকর্ডেড ক্লাস)',
    isPaid: true,
    price: 1250,
    originalPrice: 2500,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    category: 'ICT',
    enrollCount: 3820,
    rating: 4.9,
    views: 15400,
    curriculum: [
      { module: 'মডিউল ১: তথ্য ও যোগাযোগ প্রযুক্তি বিশ্ব ও বাংলাদেশ প্রেক্ষিত', topics: ['কৃত্রিম বুদ্ধিমত্তা ও ভার্চুয়াল রিয়েলিটি', 'বায়োমেট্রিক্স ও জেনেটিক ইঞ্জিনিয়ারিং', 'সাইবার নিরাপত্তা'] },
      { module: 'মডিউল ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং', topics: ['ডাটা ট্রান্সমিশন মেথড', 'টপোলজি ও ক্লাউড কম্পিউটিং'] },
      { module: 'মডিউল ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস', topics: ['বাইনারি, অক্টাল, হেক্সা রূপান্তর', 'লজিক গেট ও কার্নফ ম্যাপ'] },
      { module: 'মডিউল ৪: এইচটিএমএল (HTML) ওয়েব ডিজাইন', topics: ['ট্যাগ, টেবিল, লিংক ও ইমেজ', 'ওয়েবসাইট পাবলিশিং'] },
      { module: 'মডিউল ৫: প্রোগ্রামিং ভাষা (C Language)', topics: ['ভেরিয়েবল, লুপ, কন্ডিশনাল স্টেটমেন্ট', 'ফাংশন ও অ্যারে সমাধান'] }
    ],
    isPublished: true
  },
  {
    id: 'crs-2',
    slug: 'bcs-and-bank-english-foundation-course',
    type: 'course',
    title: 'বিসিএস ও ব্যাংক জব প্রিলিমিনারি ও রিটেন ইংলিশ ক্র্যাশ কোর্স',
    shortDesc: 'Grammar rules, Vocabulary building, Comprehension & Freehand writing mastery for job seekers.',
    fullDesc: 'সরকারি চাকরি ও ব্যাংক নিয়োগ পরীক্ষায় ইংরেজিতে সর্বোচ্চ নম্বর নিশ্চিত করতে এই কোর্সটি তৈরি করা হয়েছে। বিগত ২০ বছরের বিসিএস ও পিএসসি প্রশ্নের পুঙ্খানুপুঙ্খ ব্যাখ্যাসহ ট্রিকস ও টিপস দেওয়া হবে।',
    instructorName: 'এম এ রাহাত ও সিনিয়র বিসিএস ক্যাডার প্যানেল',
    instructorRole: '৩৬তম বিসিএস (ক্যাডার) ও হেড মেন্টর',
    duration: '৩ মাস (৬০+ সেশন)',
    isPaid: true,
    price: 1500,
    originalPrice: 3000,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    category: 'চাকরি প্রস্তুতি',
    enrollCount: 5120,
    rating: 4.8,
    views: 28900,
    curriculum: [
      { module: 'Module 1: Core Grammar Foundations', topics: ['Parts of Speech Mastery', 'Tense, Voice & Narration Shortcuts', 'Subject-Verb Agreement'] },
      { module: 'Module 2: Competitive Vocabulary & Idioms', topics: ['Mnemonics for 2000 Words', 'Preposition Masterclass', 'Analogy & Antonyms'] },
      { module: 'Module 3: Freehand Writing & Translation', topics: ['Bangla to English Newspaper Translation', 'Editorial Summary Writing'] }
    ],
    isPublished: true
  },
  {
    id: 'crs-3',
    slug: 'ssc-general-math-special-booster-batch',
    type: 'course',
    title: 'এসএসসি সাধারণ গণিত স্পেশাল ১০০% এ+ বুস্টার ব্যাচ',
    shortDesc: 'পাটিগণিত, বীজগণিত, জ্যামিতি ও ত্রিকোণমিতির সকল জটিল সমস্যার সহজ ট্রিকস ও সমাধান।',
    fullDesc: 'এসএসসি পরীক্ষায় গণিতে এ+ পাওয়া কঠিন মনে হয়? এই বুস্টার ব্যাচে অধ্যায়ভিত্তিক সকল সৃজনশীল প্রশ্ন ও এমসিকিউ মাত্র ২০ সেকেন্ডে সমাধানের শর্টকাট টেকনিক শিখবেন।',
    instructorName: 'রাহাত হোসাইন',
    instructorRole: 'ম্যাথ এক্সপার্ট ও ফাউন্ডার, Study With Rahat',
    duration: '২.৫ মাস',
    isPaid: false,
    price: 0,
    originalPrice: 1000,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    category: 'SSC Preparation',
    enrollCount: 9400,
    rating: 4.95,
    views: 34100,
    curriculum: [
      { module: 'অধ্যায় ১-৩: বাস্তব সংখ্যা ও সেট-ফাংশন ও বীজগণিতীয় রাশি', topics: ['মান নির্ণয় শর্টকাট', 'বর্গ ও ঘন সূত্রের প্রয়োগ'] },
      { module: 'অধ্যায় ৭-৮: ব্যবহারিক জ্যামিতি ও বৃত্ত', topics: ['বৃত্তের উপপাদ্য মনে রাখার কৌশল', 'সম্পাদ্য অঙ্কন টেকনিক'] },
      { module: 'অধ্যায় ৯-১০: ত্রিকোণমিতি ও দূরত্ব-উচ্চতা', topics: ['ত্রিকোণমিতিক অনুপাত সূত্র', 'দূরত্ব বিষয়ক সমস্যা'] }
    ],
    isPublished: true
  },
  {
    id: 'crs-4',
    slug: 'freelancing-and-computer-skills-starter',
    type: 'course',
    title: 'স্টুডেন্টদের জন্য কম্পিউটার স্কিলস ও বেসিক ফ্রিল্যান্সিং গাইড',
    shortDesc: 'MS Office, Google Workspace, Basic Graphic Design ও ফাইভার/আপওয়ার্ক পরিচিতি।',
    fullDesc: 'পড়াশোনার পাশাপাশি স্বাবলম্বী হতে চান? এই সম্পূর্ণ ফ্রি কোর্সে কম্পিউটার চালনা থেকে শুরু করে ডাটা এন্ট্রি ও ডিজিটাল কনটেন্ট তৈরির মাধ্যমে ফ্রিল্যান্সিং শুরু করার সঠিক দিকনির্দেশনা দেওয়া হয়েছে।',
    instructorName: 'টেক টিম ও রাহাত হোসাইন',
    instructorRole: 'আইটি স্পেশালিস্ট',
    duration: '১.৫ মাস',
    isPaid: false,
    price: 0,
    originalPrice: 0,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    category: 'Freelancing',
    enrollCount: 6800,
    rating: 4.75,
    views: 19800,
    curriculum: [
      { module: 'কম্পিউটার বুনিয়াদ ও অফিস টুলস', topics: ['MS Word & Typing Speed Mastery', 'Excel Formulas & Budgeting', 'PowerPoint Presentation Design'] },
      { module: 'ইন্টারনেট ও ফ্রিল্যান্সিং মার্কেটপ্লেস', topics: ['গিগ তৈরি ও বিডিং গাইডলাইন', 'পেমেন্ট মেথড সেটআপ'] }
    ],
    isPublished: true
  }
];

export const INITIAL_ADMISSIONS: AdmissionPost[] = [
  {
    id: 'adm-1',
    slug: 'dhaka-university-undergraduate-admission-circular-2026',
    type: 'admission',
    title: 'ঢাকা বিশ্ববিদ্যালয় স্নাতক ১ম বর্ষ ভর্তি বিজ্ঞপ্তি ২০২৬-২০২৭',
    institutionName: 'ঢাকা বিশ্ববিদ্যালয় (University of Dhaka)',
    category: 'University Admission',
    startDate: '২০২৬-০৩-০১',
    deadline: '২০২৬-০৩-২৫',
    eligibility: 'এসএসসি ২০২১/২০২২ এবং এইচএসসি ২০২৩/২০২৪ এ উত্তীর্ণ। বিজ্ঞান ইউনিটে ন্যূনতম মোট জিপিএ ৮.০০, মানবিক ইউনিটে ৭.৫০ এবং ব্যবসায় শিক্ষায় ৭.৫০ থাকতে হবে।',
    applicationProcess: 'অনলাইনে admission.eis.du.ac.bd ওয়েবসাইটে লগইন করে ছবি, মোবাইল নম্বর ও ফি প্রদান করে আবেদন সম্পন্ন করতে হবে। সোনালী, জনতা, অগ্রণী অথবা রূপালী ব্যাংকের মাধ্যমে ফি জমা দেওয়া যাবে।',
    fee: '১,০৫০ টাকা (সকল ইউনিট প্রতি)',
    requiredDocuments: [
      'এইচএসসি ও এসএসসির রোল এবং রেজিস্ট্রেশন নম্বর',
      'সদ্য তোলা পাসপোর্ট সাইজের রঙিন ডিজিটাল ছবি (300x300 px)',
      'সচল মোবাইল নম্বর ও ব্যক্তিগত ইমেইল এড্রেস',
      'কোটার সনদপত্র (যদি প্রযোজ্য হয়)'
    ],
    officialLink: 'https://admission.eis.du.ac.bd',
    importantDates: [
      { label: 'আবেদন শুরু', date: '০১ মার্চ ২০২৬' },
      { label: 'আবেদনের শেষ তারিখ', date: '২৫ মার্চ ২০২৬ (রাত ১১:৫৯)' },
      { label: 'প্রবেশপত্র ডাউনলোড', date: '১৫ এপ্রিল ২০২৬ থেকে' },
      { label: 'বিজ্ঞান ইউনিট ভর্তি পরীক্ষা', date: '০২ মে ২০২৬' },
      { label: 'কলা ও সামাজিক বিজ্ঞান পরীক্ষা', date: '০৮ মে ২০২৬' }
    ],
    views: 31000,
    isPublished: true
  },
  {
    id: 'adm-2',
    slug: 'polytechnic-diploma-admission-circular-2026',
    type: 'admission',
    title: 'সরকারি পলিটেকনিক ইনস্টিটিউট ডিপ্লোমা ইন ইঞ্জিনিয়ারিং ভর্তি ২০২৬',
    institutionName: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB)',
    category: 'Polytechnic Admission',
    startDate: '২০২৬-০৪-১০',
    deadline: '২০২৬-০৫-১৫',
    eligibility: 'যেকোনো শিক্ষাবোর্ড হতে এসএসসি/সমমান উত্তীর্ণ। সাধারণ গণিত বা উচ্চতর গণিতে কমপক্ষে জিপিএ ৩.০০ সহ সামগ্রিক জিপিএ ন্যূনতম ৩.৫০ থাকতে হবে।',
    applicationProcess: 'btebadmission.gov.bd পোর্টালে গিয়ে সর্বোচ্চ ১০টি ইনস্টিটিউট ও টেকনোলজি পছন্দক্রম নির্বাচন করে আবেদন করতে হবে।',
    fee: '৩৫০ টাকা (বিকাশ/নগদ/রকেট)',
    requiredDocuments: [
      'এসএসসি রোল ও রেজিস্ট্রেশন নম্বর',
      'পাসিং ইয়ার ও বোর্ডের নাম',
      'মোবাইল নম্বর',
      'পছন্দক্রম তালিকা'
    ],
    officialLink: 'http://btebadmission.gov.bd',
    importantDates: [
      { label: 'অনলাইন আবেদন শুরু', date: '১০ এপ্রিল ২০২৬' },
      { label: 'আবেদনের শেষ সময়', date: '১৫ মে ২০২৬' },
      { label: '১ম মেধা তালিকা প্রকাশ', date: '২৫ মে ২০২৬' }
    ],
    views: 14500,
    isPublished: true
  },
  {
    id: 'adm-3',
    slug: 'xi-class-college-admission-notice-2026',
    type: 'admission',
    title: 'একাদশ শ্রেণিতে অনলাইনে কলেজ ভর্তি নীতিমালা ও আবেদন ২০২৬',
    institutionName: 'আন্তঃশিক্ষা বোর্ড সমন্বয় সাব-কমিটি',
    category: 'XI Class Admission',
    startDate: '২০২৬-০৬-০১',
    deadline: '২০২৬-০৬-২০',
    eligibility: '২০২৪, ২০২৫ ও ২০২৬ সালের এসএসসি বা সমমানের পরীক্ষায় উত্তীর্ণ শিক্ষার্থীরা আবেদন করতে পারবে।',
    applicationProcess: 'xiclassadmission.gov.bd এর মাধ্যমে সর্বনিম্ন ৫টি এবং সর্বোচ্চ ১০টি কলেজ পছন্দ দিয়ে অনলাইনে আবেদন করা যাবে। আবেদন ফি ১৫০ টাকা।',
    fee: '১৫০ টাকা',
    requiredDocuments: [
      'এসএসসি বোর্ড, রোল ও রেজিস্ট্রেশন নম্বর',
      'শিক্ষার্থীর মোবাইল নম্বর',
      'পছন্দের কলেজের EIIN নম্বর'
    ],
    officialLink: 'http://xiclassadmission.gov.bd',
    importantDates: [
      { label: '১ম পর্যায়ের আবেদন', date: '০১ জুন - ২০ জুন ২০২৬' },
      { label: '১ম মেধা তালিকা', date: '২৮ জুন ২০২৬' },
      { label: 'কলেজে ভর্তি নিশ্চায়ন', date: '২৯ জুন - ০২ জুলাই ২০২৬' }
    ],
    views: 42000,
    isPublished: true
  }
];

export const INITIAL_SUGGESTIONS: SuggestionPost[] = [
  {
    id: 'sug-1',
    slug: 'ssc-higher-mathematics-creative-suggestion',
    type: 'suggestion',
    title: 'এসএসসি উচ্চতর গণিত চূড়ান্ত ১০০% কমন সৃজনশীল সাজেশন ২০২৬',
    classCategory: 'SSC',
    subject: 'উচ্চতর গণিত (Higher Math)',
    content: `এসএসসি উচ্চতর গণিত পরীক্ষায় ভালো ফলাফল করার জন্য প্রতিটি বিভাগের নির্দিষ্ট কিছু গুরুত্বপূর্ণ অধ্যায় নিখুঁতভাবে রিভিশন করা আবশ্যক। নিম্নে বিগত ৫ বছরের প্রশ্ন বিশ্লেষণের আলোকে চূড়ান্ত সাজেশন তুলে ধরা হলো।`,
    pdfUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    downloadCount: 4890,
    importantQuestions: [
      'অধ্যায় ২: বহুপদী, ভাগশেষ উপপাদ্য ও আংশিক ভগ্নাংশে প্রকাশ (১টি সৃজনশীল নিশ্চিত)',
      'অধ্যায় ৭: অসীম ধারা - r এর মান কত হলে ধারাটির অসীমতক সমষ্টি থাকবে?',
      'অধ্যায় ৯: সূচকীয় ও লগারিদমীয় সমীকরণ সমাধান ও লেখচিত্র অঙ্কন',
      'অধ্যায় ১১: স্থানাঙ্ক জ্যামিতি - বিন্দুর দূরত্বের সূত্র ও ক্ষেত্রফল নির্ণয়'
    ],
    mcqHints: [
      'লগারিদমের ভিত্তি রূপান্তরের শর্টকাট মনে রাখবেন।',
      'দ্বিপদী বিস্তৃতির সাধারণ পদের সূত্র Tr+1 = nCr * x^(n-r) * y^r',
      'স্থানাঙ্ক জ্যামিতিতে ঢাল m = (y2 - y1) / (x2 - x1)'
    ],
    creativeQuestions: [
      'উদ্দীপক: P(x) = x^3 + 2x^2 - 5x - 6 একটি বহুপদী। (ক) P(2) এর মান নির্ণয় কর। (খ) P(x) কে উৎপাদকে বিশ্লেষণ কর। (গ) দেখাও যে (x-1) বহুপদীটির একটি উৎপাদক নয়।',
      'উদ্দীপক: A(2, 3), B(6, 7) এবং C(8, 1) তিনটি বিন্দু। (ক) AB রেখার দৈর্ঘ্য কত? (খ) ABC ত্রিভুজের ক্ষেত্রফল নির্ণয় কর।'
    ],
    examTips: [
      'জ্যামিতি অংশে চিত্র স্পষ্ট পেন্সিল দিয়ে আঁকবেন।',
      'ক্যালকুলেটরের ব্যাটারি আগে থেকেই চেক করে নিন।',
      'প্রতিটি অংকের রাফ খাতার ডানপাশে মার্জিন টেনে করবেন।'
    ],
    views: 18500,
    isPublished: true
  },
  {
    id: 'sug-2',
    slug: 'hsc-english-second-paper-grammar-and-composition',
    type: 'suggestion',
    title: 'এইচএসসি ইংরেজি ২য় পত্র গ্রামার ও কম্পোজিশন স্পেশাল সাজেশন',
    classCategory: 'HSC',
    subject: 'English 2nd Paper',
    content: `এইচএসসি ইংরেজি দ্বিতীয় পত্রে ৬০ নম্বর গ্রামার এবং ৪০ নম্বর কম্পোজিশন অংশে ভালো করার জন্য বিশেষ তালিকা।`,
    pdfUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    downloadCount: 7120,
    importantQuestions: [
      'Top Paragraphs: Metro Rail in Dhaka, Padma Multi-Purpose Bridge, Smart Bangladesh 2041, Price Hike of Essentials, Deforestation.',
      'Formal Letters/Applications: Application for opening a Debating Club / Setting up a Multimedia Classroom.',
      'Report Writing: Frequent Road Accidents, Impact of Social Media on Teenagers.'
    ],
    mcqHints: [
      'Preposition tricks: Abide by, Adhere to, Accused of, Absorbed in.',
      'Right form of verbs: As if / as though থাকলে পরের অংশ past tense হবে।'
    ],
    creativeQuestions: [
      'Write a formal email to the Principal requesting to arrange a study tour.',
      'Write a paragraph comparing online education vs classroom education in 200 words.'
    ],
    examTips: [
      'Avoid spelling mistakes and maintain clear handwriting.',
      'Leave double space between answers of different questions.'
    ],
    views: 29000,
    isPublished: true
  },
  {
    id: 'sug-3',
    slug: 'class-10-general-science-chapterwise-cq-mcq',
    type: 'suggestion',
    title: '১০ম শ্রেণি সাধারণ বিজ্ঞান অধ্যায়ভিত্তিক ফাইনাল সাজেশন',
    classCategory: 'Class 10',
    subject: 'সাধারণ বিজ্ঞান (Science)',
    content: `মানবিক ও ব্যবসায় শিক্ষা বিভাগের শিক্ষার্থীদের জন্য সাধারণ বিজ্ঞান বিষয়ের সহজ ও সংক্ষিপ্ত চূড়ান্ত সাজেশন।`,
    downloadCount: 3400,
    importantQuestions: [
      'অধ্যায় ১: সুষম খাদ্য, ভিটামিনের উৎস ও অভাবজনিত রোগ।',
      'অধ্যায় ৩: রক্তের উপাদান, রক্তচাপ ও হৃদরোগের কারণ ও প্রতিকার।',
      'অধ্যায় ৫: চোখের বিভিন্ন ত্রুটি ও এর সংশোধন।'
    ],
    mcqHints: [
      'রক্তের গ্রুপ ও অ্যান্টিবডি চার্ট ভালোভাবে মুখস্থ করবেন।',
      'রক্তে হিমোগ্লোবিনের স্বাভাবিক মাত্রা মনে রাখবেন।'
    ],
    creativeQuestions: [
      'উদ্দীপক: রফিক সাহেবের বয়স ৪৫। তিনি প্রায়ই মাথাব্যথা ও বুক ধড়ফড় সমস্যায় ভোগেন। (ক) রক্তচাপ কি? (খ) উচ্চ রক্তচাপ নিয়ন্ত্রণের উপায়সমূহ ব্যাখ্যা কর।'
    ],
    examTips: [
      'চিত্র দেওয়ার চেষ্টা করুন, এতে পূর্ণ নম্বর পাওয়া সহজ হয়।'
    ],
    views: 9400,
    isPublished: true
  },
  {
    id: 'sug-4',
    slug: 'polytechnic-electrical-circuits-and-machines',
    type: 'suggestion',
    title: 'পলিটেকনিক ২য় পর্ব ইলেকট্রিক্যাল সার্কিটস ১ ১০০% পাস সাজেশন',
    classCategory: 'Polytechnic',
    subject: 'Electrical Circuits-1',
    content: `কারিগরি শিক্ষা বোর্ডের ডিপ্লোমা ইন ইলেকট্রিক্যাল ও ইলেকট্রনিক্স টেকনোলজির শিক্ষার্থীদের জন্য তৈরি গুরুত্বপূর্ণ প্রশ্ন ব্যাংক।`,
    downloadCount: 2200,
    importantQuestions: [
      'কার্শফের ভোল্টেজ ও কারেন্ট সূত্র (KVL & KCL) প্রমাণসহ লিখ।',
      'থেভেনিনস থিওরেম ও নর্টন থিওরেমের মধ্যে পার্থক্য।',
      'সিরিজ ও প্যারালাল রেজোন্যান্স সার্কিটের বৈশিষ্ট্য।'
    ],
    mcqHints: [
      'ওহমের সূত্র ও তার সীমাবদ্ধতা জেনে রাখুন।',
      'পাওয়ার ফ্যাক্টর এর মান সর্বদা ০ থেকে ১ এর মধ্যে থাকে।'
    ],
    creativeQuestions: [
      'একটি RLC সিরিজ সার্কিটে R=10 ohm, L=0.1H, C=50uF। 220V, 50Hz উৎসে সংযুক্ত থাকলে সার্কিটের মোট ইম্পিড্যান্স ও কারেন্ট নির্ণয় কর।'
    ],
    examTips: [
      'সার্কিট ডায়াগ্রাম অবশ্যই স্কেল ও পেন দিয়ে নিখুঁতভাবে আঁকতে হবে।'
    ],
    views: 6100,
    isPublished: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '৪৭তম বিসিএস পরীক্ষার ৩,৪৮০ পদে বিশাল নিয়োগ বিজ্ঞপ্তি প্রকাশিত!',
    type: 'job',
    date: '১০ মিনিট আগে',
    linkPostId: 'job-1',
    isRead: false
  },
  {
    id: 'notif-2',
    title: 'এসএসসি ২০২৬ ফরম পূরণ ও সময়সূচি সংক্রান্ত জরুরি বিজ্ঞপ্তি ঢাকা বোর্ড',
    type: 'notice',
    date: '১ ঘণ্টা আগে',
    linkPostId: 'notice-1',
    isRead: false
  },
  {
    id: 'notif-3',
    title: 'এইচএসসি খাতা চ্যালেঞ্জ ফলাফল ২০২৬ বোর্ডভিত্তিক তালিকা প্রকাশিত',
    type: 'result',
    date: '৩ ঘণ্টা আগে',
    linkPostId: 'res-2',
    isRead: false
  },
  {
    id: 'notif-4',
    title: 'ঢাকা বিশ্ববিদ্যালয় স্নাতক ১ম বর্ষ ভর্তি বিজ্ঞপ্তি ২০২৬ প্রকাশ',
    type: 'admission',
    date: 'গতকাল',
    linkPostId: 'adm-1',
    isRead: true
  },
  {
    id: 'notif-5',
    title: 'এইচএসসি আইসিটি ফুল সিলেবাস মাস্টারক্লাসে ৫০% ডিসকাউন্ট শুরু!',
    type: 'course',
    date: '২ দিন আগে',
    linkPostId: 'crs-1',
    isRead: true
  }
];

export const INITIAL_ADS: AdPlacement[] = [
  {
    id: 'header',
    name: 'হেডার ব্যানার বিজ্ঞাপন (Header Top Banner)',
    isEnabled: true,
    adText: 'Study With Rahat আইসিটি ও গণিত স্পেশাল কোর্সে ভর্তি চলছে! সীমিত আসন — এখনই যুক্ত হোন।',
    targetUrl: '#courses',
    bannerImageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'home_middle',
    name: 'হোমপেজ কনটেন্ট বিজ্ঞাপন (In-between Section)',
    isEnabled: true,
    adText: 'বিসিএস ও ব্যাংক জব প্রিলিমিনারি মডেল টেস্ট ব্যাচ — ফ্রি ডেমো ক্লাস ও হ্যান্ডনোট পান!',
    targetUrl: '#courses',
    bannerImageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sidebar',
    name: 'সাইডবার ব্যানার (Desktop Sidebar)',
    isEnabled: true,
    adText: 'আমাদের টেলিগ্রাম চ্যানেলে যুক্ত হয়ে সকল নোটিশ ও ফ্রি পিডিএফ সাজেশন সবার আগে পান।',
    targetUrl: 'https://t.me/studywithrahat',
    bannerImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'article_top',
    name: 'আর্টিকেলের শুরুতে বিজ্ঞাপন (Article Top)',
    isEnabled: true,
    adText: 'পরীক্ষার প্রস্তুতিতে সেরা সাজেশন ও হ্যান্ডনোট ডাউনলোড করুন ফ্রিতে।',
    targetUrl: '#suggestions'
  },
  {
    id: 'article_bottom',
    name: 'আর্টিকেলের শেষে বিজ্ঞাপন (Article Bottom)',
    isEnabled: true,
    adText: 'চাকরির প্রস্তুতির সেরা বই ও মডেল টেস্ট পেতে আমাদের অফিশিয়াল পেজে যুক্ত থাকুন।',
    targetUrl: '#jobs'
  },
  {
    id: 'footer',
    name: 'ফুটার স্পনসর ব্যানার (Footer Sticky / Top)',
    isEnabled: true,
    adText: 'Study With Rahat — শিক্ষা, চাকরি ও ভর্তি তথ্যের একমাত্র বিশ্বস্ত ঠিকানা।',
    targetUrl: '#home'
  }
];

export const INITIAL_USERS: AppUser[] = [
  {
    id: 'usr-1',
    name: 'রাহাত হোসাইন (Admin)',
    email: 'admin@studywithrahat.com',
    role: 'admin',
    phone: '01712345678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bookmarkedIds: ['notice-1', 'job-1', 'crs-1'],
    isActive: true,
    createdAt: '২০২৫-০১-১০'
  },
  {
    id: 'usr-2',
    name: 'তানভীর আহমেদ',
    email: 'tanvir.student@gmail.com',
    role: 'student',
    phone: '01898765432',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    bookmarkedIds: ['notice-1', 'sug-1'],
    isActive: true,
    createdAt: '২০২৬-০২-০১'
  },
  {
    id: 'usr-3',
    name: 'সুমাইয়া আক্তার',
    email: 'sumaiya.du@gmail.com',
    role: 'student',
    phone: '01912345678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    bookmarkedIds: ['adm-1', 'job-2'],
    isActive: true,
    createdAt: '২০২৬-০২-১২'
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-1',
    name: '47th_BCS_Official_Circular.pdf',
    type: 'pdf',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    size: '3.4 MB',
    uploadedAt: '২০২৬-০২-২৮'
  },
  {
    id: 'med-2',
    name: 'SSC_Math_Creative_Sheet.pdf',
    type: 'pdf',
    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    size: '1.8 MB',
    uploadedAt: '২০২৬-০৩-০১'
  },
  {
    id: 'med-3',
    name: 'DU_Admission_Banner.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    size: '850 KB',
    uploadedAt: '২০২৬-০৩-০৪'
  }
];

export const CLASS_CATEGORIES = [
  'All',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'SSC',
  'Class 11',
  'Class 12',
  'HSC',
  'Polytechnic',
  'Honours',
  'Degree',
  'University'
];

export const JOB_CATEGORIES = [
  'All',
  'Government Jobs',
  'Private Jobs',
  'Bank Jobs',
  'NGO Jobs',
  'Police Jobs',
  'Army Jobs',
  'Navy Jobs',
  'Air Force Jobs',
  'Railway Jobs',
  'Teaching Jobs',
  'Part-time Jobs',
  'Internship'
];

export const RESULT_CATEGORIES = [
  'All',
  'SSC Result',
  'HSC Result',
  'JSC/Equivalent',
  'Polytechnic Result',
  'University Result',
  'Admission Result',
  'Exam Result'
];

export const COURSE_CATEGORIES = [
  'All',
  'Academic Courses',
  'SSC Preparation',
  'HSC Preparation',
  'Admission Preparation',
  'Freelancing',
  'Computer Skills',
  'English',
  'ICT',
  'চাকরি প্রস্তুতি'
];

export const ADMISSION_CATEGORIES = [
  'All',
  'School Admission',
  'College Admission',
  'University Admission',
  'Polytechnic Admission',
  'Medical Admission',
  'Engineering Admission',
  'Honours Admission',
  'Degree Admission',
  'XI Class Admission'
];

export const SUBJECT_LIST = [
  'Bangla',
  'English',
  'Mathematics',
  'Higher Math',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'ICT',
  'Accounting',
  'Economics',
  'General Knowledge'
];
