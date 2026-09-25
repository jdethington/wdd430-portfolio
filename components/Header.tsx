import NavLinks from "./NavLinks";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          href="/"
          id="header-title"
          className="text-2xl font-bold tracking-tight hover:text-blue-400 transition-colors"
        >
          Jacob Ethington
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
