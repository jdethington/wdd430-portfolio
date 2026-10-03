import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Jacob Ethington | Project Portfolio",
    template: "%s | Project Portfolio",
  },
  description:
    "A portfolio of projects built by Jacob Ethington, showcasing skills in web development and software engineering.",
  metadataBase: new URL("https://wdd430-portfolio-murex.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-full">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
