// components/ProjectSearch.tsx
"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // reset page on new search
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="search"
      placeholder="Search projects..."
      className="w-full max-w-md border rounded px-3 py-2 mb-6"
      defaultValue={searchParams.get("query")?.toString() ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
