import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Loader2, FileText, Image as ImageIcon, X } from 'lucide-react';
import { uploadFileToStorage } from '../firebase/storageService';

interface FirebaseFileUploadProps {
  label: string;
  folder: 'notices' | 'courses' | 'results' | 'suggestions' | 'admissions' | 'media';
  currentUrl?: string;
  accept?: string;
  onUploadSuccess: (url: string, fileName?: string) => void;
  onRemove?: () => void;
}

export const FirebaseFileUpload: React.FC<FirebaseFileUploadProps> = ({
  label,
  folder,
  currentUrl,
  accept = '.pdf,image/*',
  onUploadSuccess,
  onRemove
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    setProgress(10);

    try {
      const downloadUrl = await uploadFileToStorage(file, folder, (pct) => {
        setProgress(pct);
      });
      setProgress(100);
      onUploadSuccess(downloadUrl, file.name);
    } catch (err: any) {
      console.error('File upload error:', err);
      setError('ফাইল আপলোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setUploading(false);
    }
  };

  const isImage = currentUrl && (currentUrl.match(/\.(jpeg|jpg|png|gif|webp)(\?.*)?$/i) || currentUrl.startsWith('data:image'));
  const isPdf = currentUrl && (currentUrl.match(/\.pdf(\?.*)?$/i) || currentUrl.startsWith('data:application/pdf'));

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-700">{label}</label>

      {currentUrl ? (
        <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {isImage ? (
              <img src={currentUrl} alt="Upload preview" className="w-10 h-10 object-cover rounded-lg shrink-0 border border-slate-200" />
            ) : isPdf ? (
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-800 truncate">ফাইল সফলভাবে আপলোড হয়েছে</p>
              <a
                href={currentUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-600 hover:underline block truncate max-w-xs"
              >
                ফাইলটি দেখুন (Open Preview)
              </a>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="মুছে ফেলুন"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 transition-all rounded-xl p-4 cursor-pointer text-center">
            {uploading ? (
              <div className="flex flex-col items-center gap-2 py-1">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                <span className="text-xs font-semibold text-blue-600">আপলোড হচ্ছে ({progress}%)...</span>
                <div className="w-36 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <>
                <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-700">ফাইল নির্বাচন করুন বা ড্রপ করুন</span>
                <span className="text-[10px] text-slate-400 mt-0.5">PDF বা ছবি (Firebase Storage)</span>
              </>
            )}
            <input
              type="file"
              accept={accept}
              disabled={uploading}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}

      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
    </div>
  );
};
