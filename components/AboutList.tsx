import AboutCard from "./AboutCard";

interface AboutListProps {
  aboutItems: {
    title: string;
    description: string;
    link?: string;
  }[];
}

export default function AboutList({ aboutItems }: AboutListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {aboutItems.map((item) => (
        <AboutCard key={item.title} {...item} />
      ))}
    </div>
  );
}
