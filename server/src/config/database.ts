import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const connectDB = async (): Promise<boolean> => {
  // Support MONGODB_URI, MONGODB_URL, MONGO_URL, or Mongob_url from .env
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL ||
    process.env.MONGO_URL ||
    (process.env as any).MONGOB_URL ||
    (process.env as any).Mongob_url ||
    'mongodb://127.0.0.1:27017/code_academy';

  // Check if it's an unconfigured placeholder
  if (uri.includes('YOUR_CLUSTER')) {
    console.warn(
      '⚠️ ملاحظة: يحتوي رابط MongoDB في .env على رمز افتراضي (YOUR_CLUSTER). يرجى استبداله برابط كلاستر Atlas الفعلي الخاص بك.'
    );
    console.warn('⚡ يعمل الخادم حالياً بنظام الذاكرة السريعة (In-Memory Fallback) لضمان استمرار التطوير بسلاسة.');
    isConnected = false;
    return false;
  }

  try {
    // Attempt connection with 5s timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('✅ تم الاتصال بقاعدة بيانات MongoDB بنجاح!');
    return true;
  } catch (error: any) {
    console.warn('⚠️ تعذر الاتصال بـ MongoDB:', error.message);
    console.warn('⚡ تم تفعيل مخزن الذاكرة المحلي (In-Memory Fallback) لتشغيل المنصة بدون توقف.');
    isConnected = false;
    return false;
  }
};

export const isDbConnected = (): boolean => isConnected;

export default connectDB;

