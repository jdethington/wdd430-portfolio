import Link from "next/link";

// const links = [
//   { name: "Overview", href: "/projects" },
//   { name: "Open Source", href: "/projects/opensource" },
//   { name: "School", href: "/projects/school" },
// ];

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <nav
        aria-label="Projects Navigation"
        className="max-w-4xl mx-auto px-4 py-4 flex justify-center gap-4"
      >
        {/* {links.map((link) => {
          return (
            <Link key={link.href} href={link.href}>
              {link.name}
            </Link>
          );
        })} */}
        <Link href="/projects">Overview</Link> | {""}
        <Link href="/projects/opensource">Open Source</Link> | {""}
        <Link href="/projects/school">School</Link>
      </nav>
      {children}
    </section>
  );
}
