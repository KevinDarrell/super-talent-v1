import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/providers/AuthProvider"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Super CV | Premium Career Architect",
  description: "Craft your legacy with AI-powered resume analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        "min-h-screen font-sans selection:bg-amber-500/30 selection:text-amber-200",
        inter.variable,
        playfair.variable
      )}>
        <AuthProvider>
      
          <nav className="fixed top-0 inset-x-0 z-50 h-20 px-6 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
              
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
                  <span className="font-serif text-slate-950 font-bold text-lg">S</span>
                </div>
                <span className="font-serif text-xl font-bold text-slate-100 tracking-tight">Super CV</span>
              </Link>

              
              <div className="flex items-center gap-6">
                <Link href="/analyze" className="text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors">
                  New Analysis
                </Link>
               
                <Link 
                  href="/api/auth/signin"
                  className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all backdrop-blur-sm"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </nav>

          <main className="pt-24 min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}