"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const subNavLinks = [
  { name: "Overview", href: "/projects" },
  { name: "Open Source", href: "/projects/opensource" },
  { name: "School", href: "/projects/school" },
];

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <section>
      <nav
        aria-label="Projects Navigation"
        className="max-w-4xl mx-auto px-4 pt-6 pb-2 flex justify-center"
      >
        <div className="inline-flex p-1 bg-gray-100 rounded-xl shadow-inner gap-1 border border-gray-200">
          {subNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
      {children}
    </section>
  );
}
