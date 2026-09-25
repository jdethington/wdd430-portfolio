export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center px-4">
        <p className="text-sm text-gray-300">
          Copyright &copy; {new Date().getFullYear()} | Jacob Ethington | All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
