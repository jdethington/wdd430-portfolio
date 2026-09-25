import Link from "next/link";

export type ProjectFormValues = {
  title?: string;
  description?: string;
  type?: "opensource" | "school";
  technologies?: string;
  link?: string;
};

type ProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ProjectFormValues;
  submitLabel?: string;
};

export default function ProjectForm({
  action,
  defaultValues = {},
  submitLabel = "Save Project",
}: ProjectFormProps) {
  return (
    <form
      action={action}
      className="space-y-6 bg-white p-8 rounded-lg shadow-md"
    >
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
          defaultValue={defaultValues.title ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
          defaultValue={defaultValues.description ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
          defaultValue={defaultValues.type ?? "opensource"}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="opensource">Open Source</option>
          <option value="school">School</option>
        </select>
      </div>

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
          defaultValue={defaultValues.technologies ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
          defaultValue={defaultValues.link ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {submitLabel}
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
