import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Lock, Mail, User as UserIcon, Loader2 } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const authSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل').optional(),
  email: z.string().email('صيغة البريد الإلكتروني غير صحيحة'),
  password: z.string().min(6, 'كلمة المرور يجب أن لا تقل عن 6 أحرف'),
});

type AuthFormData = z.infer<typeof authSchema>;

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  if (!isAuthModalOpen) return null;

  const onSubmit = async (data: AuthFormData) => {
    setServerError('');
    setIsSubmitting(true);
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister
        ? { name: data.name, email: data.email, password: data.password }
        : { email: data.email, password: data.password };

      const res = await api.post(endpoint, payload);
      login(res.data.token, res.data.user);
      reset();
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'حدث خطأ أثناء المعالجة، يرجى المحاولة ثانية');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-right">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute left-4 top-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isRegister
              ? 'انضم إلى مجتمع مطوري الويب العرب واحفظ تقدمك وإنجازاتك مجاناً'
              : 'أهلاً بعودتك! تابع مسارك البرمجي من حيث توقفت'}
          </p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">الاسم الكامل</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="محمد أحمد"
                  {...register('name')}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 pl-10 text-white placeholder-slate-500 focus:outline-none transition"
                />
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">البريد الإلكتروني</label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 pl-10 text-white placeholder-slate-500 focus:outline-none transition"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">كلمة المرور</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 pl-10 text-white placeholder-slate-500 focus:outline-none transition"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جارٍ المعالجة...</span>
              </>
            ) : isRegister ? (
              'إنشاء الحساب مجاناً'
            ) : (
              'تسجيل الدخول'
            )}
          </button>
        </form>

        {/* Switch Mode */}
        <div className="mt-6 text-center text-sm text-slate-400">
          {isRegister ? (
            <p>
              لديك حساب بالفعل؟{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false);
                  setServerError('');
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline"
              >
                سجل الدخول الآن
              </button>
            </p>
          ) : (
            <p>
              ليس لديك حساب بعد؟{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  setServerError('');
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline"
              >
                أنشئ حساباً جديداً
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

