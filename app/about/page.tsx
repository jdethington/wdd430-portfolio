import AboutList from "@/components/AboutList";

const aboutItems = [
  {
    title: "My First Website Project",
    description: "This is the very first website project I ever created.",
    link: "https://jdethington.github.io/wdd130/wwr/index.html",
  },
  {
    title: "Jakes Legendairy Cheese",
    description:
      "My first attempt at creating my Cheese Business website incorporating JavaScript.",
    link: "https://jdethington.github.io/wdd131/project/index.html",
  },
  {
    title: "Jakes LegenDairy Cheese",
    description: "My second attempt at creating my Cheese Business website.",
    link: "https://jdethington.github.io/wdd231/finalproject/index.html",
  },
];

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4 text-center">About Me</h2>
      <p className="text-lg text-gray-700 mb-8 text-center">
        I am a former dairy farmer and now a full-stack web developer. I have a
        passion for creating innovative solutions and learning new technologies.
        Below are some of my first projects that show where I started my
        journey.
      </p>
      <AboutList aboutItems={aboutItems} />
    </main>
  );
}
