"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { staggerContainer, staggerChild, pageVariants, transitions, luxuryEasing } from "@/lib/animations";
import { TiltCard } from "@/components/design-system/TiltCard";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password
      });

      if (res?.error) {
        toast.error("Invalid Email or Password");
        setIsLoading(false);
      } else {
        toast.success("Welcome back!");
        if (callbackUrl && callbackUrl !== "/") {
          window.location.href = callbackUrl;
        } else {
          router.push("/");
          router.refresh();
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    toast.loading("Redirecting to Google...");
    const separator = callbackUrl.includes('?') ? '&' : '?';
    const finalCallbackUrl = `${callbackUrl}${separator}login=success`;
    signIn("google", { callbackUrl: finalCallbackUrl });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={transitions.pageEntry}
    >

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[hsla(38,92%,50%,0.08)] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[hsla(260,80%,60%,0.05)] rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        <TiltCard tiltStrength={15} glareEnabled={true}>
          <motion.div
            variants={staggerChild}
            className="glass-panel p-[clamp(1.5rem,4vw,2.5rem)] rounded-[clamp(1.5rem,4vw,2.5rem)]"
          >

            <motion.div variants={staggerChild}>
              <Link
                href="/"
                className="inline-flex items-center text-[hsl(215,20%,50%)] hover:text-[hsl(38,92%,65%)] mb-8 text-sm transition-colors duration-500"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                <ArrowLeft size={16} className="mr-2" /> Back to Home
              </Link>
            </motion.div>


            <motion.div variants={staggerChild} className="text-center mb-8">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(38,92%,40%)] rounded-2xl flex items-center justify-center shadow-[0_0_40px_hsla(38,92%,50%,0.3)]">
                <Sparkles size={24} className="text-[hsl(222,47%,8%)]" />
              </div>
              <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-serif font-bold text-white mb-2 heading-editorial">
                Welcome Back
              </h1>
              <p className="text-[hsl(215,20%,55%)] text-sm">Sign in to continue your journey</p>
            </motion.div>


            <motion.form variants={staggerChild} onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-[hsl(222,47%,8%)] border border-white/[0.08] rounded-xl p-4 text-white placeholder:text-[hsl(215,20%,40%)] focus:border-[hsla(38,92%,50%,0.5)] focus:shadow-[0_0_20px_hsla(38,92%,50%,0.15)] outline-none transition-all duration-500"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-[hsl(222,47%,8%)] border border-white/[0.08] rounded-xl p-4 text-white placeholder:text-[hsl(215,20%,40%)] focus:border-[hsla(38,92%,50%,0.5)] focus:shadow-[0_0_20px_hsla(38,92%,50%,0.15)] outline-none transition-all duration-500"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <motion.button
                disabled={isLoading}
                whileHover={{ y: -2, boxShadow: "0 0 60px hsla(38,92%,50%,0.4)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: luxuryEasing.power4 }}
                className="w-full bg-gradient-to-r from-[hsl(38,92%,50%)] to-[hsl(38,92%,45%)] text-[hsl(222,47%,8%)] font-bold h-14 rounded-xl transition-all duration-500 flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
              </motion.button>
            </motion.form>


            <motion.div variants={staggerChild} className="my-6 flex items-center gap-4">
              <div className="h-px bg-white/[0.08] flex-1" />
              <span className="text-xs uppercase text-[hsl(215,20%,45%)] tracking-wider">Or continue with</span>
              <div className="h-px bg-white/[0.08] flex-1" />
            </motion.div>


            <motion.button
              variants={staggerChild}
              onClick={handleGoogleLogin}
              whileHover={{ y: -2, backgroundColor: "hsl(0,0%,95%)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, ease: luxuryEasing.power4 }}
              className="w-full h-14 bg-white text-[hsl(222,47%,8%)] font-medium rounded-xl transition-all duration-500 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </motion.button>


            <motion.p variants={staggerChild} className="mt-8 text-center text-sm text-[hsl(215,20%,55%)]">
              New here?{" "}
              <Link
                href={callbackUrl && callbackUrl !== "/" ? `/register?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/register"}
                className="text-[hsl(38,92%,65%)] hover:text-[hsl(38,92%,75%)] transition-colors duration-300"
              >
                Create an account
              </Link>
            </motion.p>
          </motion.div>
        </TiltCard>
      </motion.div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(38,92%,40%)] rounded-2xl flex items-center justify-center animate-pulse">
          <Loader2 className="animate-spin text-[hsl(222,47%,8%)]" size={24} />
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}