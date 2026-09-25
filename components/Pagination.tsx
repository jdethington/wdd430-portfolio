// components/Pagination.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-4 mt-8">
      <Link
        href={createPageURL(currentPage - 1)}
        className={
          currentPage <= 1
            ? "pointer-events-none opacity-50"
            : "text-blue-600 hover:underline"
        }
        aria-disabled={currentPage <= 1}
      >
        Previous
      </Link>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={createPageURL(currentPage + 1)}
        className={
          currentPage >= totalPages
            ? "pointer-events-none opacity-50"
            : "text-blue-600 hover:underline"
        }
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </Link>
    </div>
  );
}
