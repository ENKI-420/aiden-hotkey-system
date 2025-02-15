import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <div className="mb-4">
          <Link to="/" className="text-cyan-500 hover:underline">
            Norton Oncology Hub
          </Link>
        </div>
        <div className="mb-4">
          <Link to="/about" className="text-gray-400 hover:text-cyan-500 mx-2">
            About
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-cyan-500 mx-2">
            Contact
          </Link>
          <Link to="/privacy" className="text-gray-400 hover:text-cyan-500 mx-2">
            Privacy Policy
          </Link>
        </div>
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Norton Oncology Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}