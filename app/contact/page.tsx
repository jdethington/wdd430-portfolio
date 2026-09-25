export default function ContactPage() {
  return (
    <section className="flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Contact Me</h1>
      <p className="text-center text-lg text-gray-700">
        You can reach me at{" "}
        <a
          href="mailto:jacob.ethington@example.com"
          className="text-blue-600 hover:underline font-medium"
        >
          jacob.ethington@example.com
        </a>
      </p>
    </section>
  );
}
