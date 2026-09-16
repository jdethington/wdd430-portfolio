import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div id="header-title" className="text-2xl font-bold mx-auto px-4">
        Jacob Ethington
      </div>
      <NavLinks />
    </header>
  );
}
