import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

/**
 * Uploads a file to Firebase Storage.
 * If Firebase Storage is unavailable or restricted, falls back gracefully to a Base64 data URL.
 */
export const uploadFileToStorage = async (
  file: File,
  folder: 'notices' | 'courses' | 'results' | 'suggestions' | 'admissions' | 'media' = 'media',
  onProgress?: (percent: number) => void
): Promise<string> => {
  try {
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${folder}/${timestamp}_${sanitizedName}`;
    const storageRef = ref(storage, storagePath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (snapshot.totalBytes > 0 && onProgress) {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            onProgress(progress);
          }
        },
        async (error) => {
          console.warn('Firebase Storage upload failed, falling back to base64 reader:', error);
          try {
            const base64Url = await readFileAsBase64(file);
            resolve(base64Url);
          } catch (e) {
            reject(error);
          }
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch (err) {
            console.warn('Could not get download URL, falling back to base64:', err);
            const base64Url = await readFileAsBase64(file);
            resolve(base64Url);
          }
        }
      );
    });
  } catch (error) {
    console.warn('Storage initial error, falling back to base64 reader:', error);
    return await readFileAsBase64(file);
  }
};

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};
