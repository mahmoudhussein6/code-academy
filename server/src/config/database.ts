
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const connectDB = async (): Promise<boolean> => {
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL ||
    process.env.MONGO_URL ||
    (process.env as any).MONGOB_URL ||
    (process.env as any).Mongob_url ||
    'mongodb://127.0.0.1:27017/code_academy';

  // Reject only the placeholder URI
  if (uri.includes('YOUR_CLUSTER')) {
    console.warn('⚠️ MongoDB URI still contains the placeholder YOUR_CLUSTER.');
    isConnected = false;
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;
    console.log('✅ تم الاتصال بقاعدة بيانات MongoDB بنجاح!');

    return true;
  } catch (error: any) {
    console.error('❌ تعذر الاتصال بـ MongoDB:', error.message);
    isConnected = false;
    return false;
  }
};

export const isDbConnected = (): boolean => isConnected;

export default connectDB;
