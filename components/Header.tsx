import NavLinks from "./NavLinks";
import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "./sign-out-button";

export default async function Header() {
  const session = await auth();
  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          href="/dashboard"
          id="header-title"
          className="text-2xl font-bold tracking-tight hover:text-blue-400 transition-colors"
        >
          {session ? `Welcome, ${session.user?.name ?? "User"}` : null}
          {/* Jacob Ethington */}
        </Link>
        <NavLinks />
        <div className="bg-slate-800 text-slate-400 text-sm py-2 px-4 sm:px-6">
          <Link href="/login">Login</Link>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
