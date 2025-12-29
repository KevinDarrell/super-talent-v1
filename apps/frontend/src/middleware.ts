export { default } from "next-auth/middleware";

export const config = {
  // Protect dashboard routes.
  // The 'analyze' route is excluded so Guests can still see it.
  matcher: ["/dashboard/:path*"], 
};