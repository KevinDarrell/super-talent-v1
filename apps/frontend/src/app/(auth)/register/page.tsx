"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Abstract Geometric Illustration for Register
function AbstractIllustration() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-[400px] h-[400px]">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white/30" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/40" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/25" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/35" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 left-12 w-16 h-16 rounded-2xl bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-sm border border-white/20"
        />

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-16 right-8 w-20 h-20 rounded-xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/15"
        />

        <motion.div
          animate={{ y: [0, -12, 0], x: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/3 left-8 w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-52 h-48 bg-white/15 backdrop-blur-xl rounded-3xl border border-white/30 p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-400/30 flex items-center justify-center text-white/90 text-sm font-bold">
                54
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white/70"
              >
                →
              </motion.div>
              <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center text-white text-sm font-bold">
                92
              </div>
            </div>

            <div className="space-y-2">
              {["ATS Optimized", "Keywords Added", "Score Boosted"].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                  <span className="text-white/80 text-xs">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-12"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white/50" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/35" />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-16 right-16 w-20 h-20 rounded-full border-2 border-white/20"
        />
      </div>
    </div>
  );
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/app";

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    toast.loading("Redirecting to Google...");
    const separator = callbackUrl.includes('?') ? '&' : '?';
    const finalCallbackUrl = `${callbackUrl}${separator}login=success`;
    signIn("google", { callbackUrl: finalCallbackUrl });
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#3CE0B1] via-[#2DD4A8] to-[#2F6BFF] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
          <AbstractIllustration />
          <div className="absolute bottom-12 left-12 text-white">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Sparkles size={22} className="text-white" />
              </motion.div>
              <span className="font-serif font-bold text-2xl">SuperCV</span>
            </Link>
            <p className="text-white/70 text-sm max-w-[240px]">
              Join 10,000+ professionals transforming their careers.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white dark:bg-slate-950">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            <motion.div variants={itemVariants} className="lg:hidden flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3CE0B1] to-[#2F6BFF] flex items-center justify-center">
                  <Sparkles size={22} className="text-white" />
                </div>
                <span className="font-serif font-bold text-2xl text-slate-900 dark:text-white">SuperCV</span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center lg:text-left mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                Create your account
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Start optimizing in minutes
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-[#3CE0B1] font-medium rounded-xl flex items-center justify-center gap-3 transition-colors mb-6 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </motion.button>
            </motion.div>

            <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-[#2F6BFF] hover:text-[#3CE0B1] font-semibold transition-colors">
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="animate-spin text-[#3CE0B1]" size={32} />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}