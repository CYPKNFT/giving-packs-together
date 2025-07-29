
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg text-primary mb-4">GivingPacks</h3>
            <p className="text-gray-600 mb-4">
              Making a difference one pack at a time, connecting donors with those in need.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/projects" className="text-gray-600 hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-600 hover:text-primary">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/start-project" className="text-gray-600 hover:text-primary">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-600 hover:text-primary" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://facebook.com" className="text-gray-600 hover:text-primary" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="https://instagram.com" className="text-gray-600 hover:text-primary" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {currentYear} GivingPacks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
