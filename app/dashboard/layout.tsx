import { SignOutButton } from "@/components/sign-out-button";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="flex gap-4 p-4 border-b">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/projects">Projects</Link>
        <Link href="/">Public site</Link>
        <SignOutButton />
      </nav>
      <main>{children}</main>
    </div>
  );
}
