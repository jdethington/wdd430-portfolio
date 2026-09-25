export default function Loading() {
  return (
    <section className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 w-64 mx-auto mb-12 rounded bg-slate-200" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div className="h-7 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-5/6 rounded bg-slate-200" />
            <div className="h-4 w-1/2 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </section>
  );
}
