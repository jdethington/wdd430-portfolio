// auth.config.ts  (project root)
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Protect all routes under /dashboard
      const isProtected = nextUrl.pathname.startsWith("/dashboard");

      if (isProtected) {
        if (isLoggedIn) return true;
        return false; // Redirect to /login if not logged in
      }

      // Redirect already-logged-in users away from /login
      if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true; // Allow access to all other routes
    },
  },
  providers: [], // providers are added in auth.ts
} satisfies NextAuthConfig;
