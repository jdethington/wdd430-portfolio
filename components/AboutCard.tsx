interface AboutCardProps {
  title: string;
  description: string;
  link?: string;
}

export default function AboutCard({ title, description, link }: AboutCardProps) {
  return (
      <article className="p-4 border-1-4 boarder-blue-600 bg-gray-200 rounded"> 
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 mb-3">{description}</p>
        {link && (
          <p className="mt-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View More
            </a>
          </p>
        )}
      </article>
    );
}