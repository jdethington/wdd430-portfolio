"use client";

import { deleteProject } from "@/app/lib/actions";

type DeleteProjectButtonProps = {
  id: string;
};

export default function DeleteProjectButton({ id }: DeleteProjectButtonProps) {
  return (
    <form
      action={deleteProject.bind(null, id)}
      onSubmit={(e) => {
        if (
          !confirm(
            "Are you sure you want to delete this project? This cannot be undone.",
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-sm bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded transition"
      >
        Delete
      </button>
    </form>
  );
}
