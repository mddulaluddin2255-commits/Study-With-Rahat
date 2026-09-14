import React from 'react';
import { CoursePost } from '../types';
import { useApp } from '../context/AppContext';
import { Clock, User, Star, Users, CheckCircle, ArrowRight, Bookmark, Share2 } from 'lucide-react';

interface CourseCardProps {
  course: CoursePost;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { navigateToPost, toggleBookmark, isBookmarked, enrolledCourseIds, enrollInCourse, openShareModal } = useApp();
  const bookmarked = isBookmarked(course.id);
  const isEnrolled = enrolledCourseIds.includes(course.id);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    openShareModal({
      id: course.id,
      type: 'course',
      title: course.title,
      category: course.category,
      summary: `${course.instructorName} • ${course.duration} • ${course.isPaid ? `${course.price} ৳` : 'ফ্রি কোর্স'}`
    });
  };

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEnrolled) {
      enrollInCourse(course.id);
      alert(`ধন্যবাদ! "${course.title}" কোর্সে আপনার ভর্তি সফল হয়েছে।`);
    } else {
      navigateToPost('course', course.id);
    }
  };

  return (
    <article
      id={`course-card-${course.id}`}
      onClick={() => navigateToPost('course', course.id)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer group"
    >
      <div>
        {/* Thumbnail with overlay badge */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white/95 backdrop-blur-xs text-blue-900 shadow-xs">
              {course.category}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1">
            <span className={`px-2.5 py-1 rounded-md text-xs font-black shadow-xs ${
              course.isPaid ? 'bg-amber-400 text-slate-950' : 'bg-emerald-500 text-white'
            }`}>
              {course.isPaid ? `${course.price} ৳` : 'সম্পূর্ণ ফ্রি'}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(course.id);
              }}
              className="p-1 rounded-md bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 transition-colors shadow-xs"
              title="সেভ করুন"
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-1 rounded-md bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 transition-colors shadow-xs"
              title="শেয়ার করুন"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
            {course.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {course.shortDesc}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium mb-3">
            <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{course.instructorName}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {course.rating}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Users className="w-3.5 h-3.5" />
              {course.enrollCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Enroll Button */}
      <div className="p-4 sm:px-5 sm:pb-5 pt-0">
        <button
          onClick={handleEnrollClick}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
            isEnrolled
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isEnrolled ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>ভর্তি সম্পন্ন (ক্লাস দেখুন)</span>
            </>
          ) : (
            <>
              <span>{course.isPaid ? 'এনরোল করুন' : 'ফ্রি জয়েন করুন'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </article>
  );
};
