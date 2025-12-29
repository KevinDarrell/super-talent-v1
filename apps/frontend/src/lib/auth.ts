import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin', 
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
     
      if (session.user && token.sub) {
        // @ts-ignore
        session.user.id = token.sub; 
      }
      return session;
    },
  },
  // Debug in development
  debug: process.env.NODE_ENV === 'development',
};