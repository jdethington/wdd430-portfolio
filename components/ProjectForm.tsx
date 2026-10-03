"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { State } from "@/app/lib/actions";

export type ProjectFormValues = {
  title?: string;
  description?: string;
  type?: "opensource" | "school";
  technologies?: string;
  link?: string;
  year_completed?: number | null;
};

type ProjectFormProps = {
  // Works with both createProject and updateProject.bind(null, id)
  action: (prevState: State, formData: FormData) => Promise<State>;
  defaultValues?: ProjectFormValues;
  submitLabel?: string;
};

const initialState: State = { message: undefined, errors: {} };

export default function ProjectForm({
  action,
  defaultValues: defaultValues = {},
  submitLabel = "Save Project",
}: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  // Prefer last submitted values, then edit defaults
  const values = {
    title: state.values?.title ?? defaultValues.title ?? "",
    description: state.values?.description ?? defaultValues.description ?? "",
    type: state.values?.type ?? defaultValues.type ?? "opensource",
    technologies:
      state.values?.technologies ?? defaultValues.technologies ?? "",
    link: state.values?.link ?? defaultValues.link ?? "",
    year_completed:
      state.values?.yearCompleted ?? String(defaultValues.year_completed ?? ""),
  };

  return (
    <form
      key={state.message ?? "form"} // remount when state updates so so default values apply
      action={formAction}
      className="space-y-6 bg-white p-8 rounded-lg shadow-md"
      noValidate
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={values.title ?? ""}
          aria-describedby="title-error"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title?.map((error) => (
            <p key={error} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={values.description ?? ""}
          aria-describedby="description-error"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Type
        </label>
        <select
          id="type"
          name="type"
          required
          defaultValue={values.type ?? "opensource"}
          aria-describedby="type-error"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="opensource">Open Source</option>
          <option value="school">School</option>
        </select>
        <div id="type-error" aria-live="polite" aria-atomic="true">
          {state.errors?.type?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div>
        <label
          htmlFor="technologies"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Technologies (comma-separated)
        </label>
        <input
          id="technologies"
          name="technologies"
          type="text"
          required
          placeholder="React, TypeScript, Next.js"
          defaultValue={values.technologies ?? ""}
          aria-describedby="technologies-error"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div id="technologies-error" aria-live="polite" aria-atomic="true">
          {state.errors?.technologies?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Year Completed — required by the activity */}
      <div>
        <label
          htmlFor="year_completed"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Year Completed
        </label>
        <input
          id="year_completed"
          name="year_completed"
          type="number"
          min={2000}
          max={new Date().getFullYear()}
          required
          defaultValue={values.year_completed ?? ""}
          aria-describedby="year_completed-error"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div id="year_completed-error" aria-live="polite" aria-atomic="true">
          {state.errors?.year_completed?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Link (optional) */}
      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Link (optional)
        </label>
        <input
          id="link"
          name="link"
          type="url"
          placeholder="https://github.com/..."
          defaultValue={values.link ?? ""}
          aria-describedby="link-error"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div id="link-error" aria-live="polite" aria-atomic="true">
          {state.errors?.link?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Form-level message */}
      {state.message ? (
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
        <Link
          href="/projects"
          className="flex-1 text-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
