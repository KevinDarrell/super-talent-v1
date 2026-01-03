import { auth } from "@/features/auth/api/auth";

export default auth;

export const config = {
  matcher: ["/dashboard/:path*"],
};