
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

type NavbarProps = {
  isLoggedIn: boolean;
  isAdmin?: boolean;
};

const Navbar = ({ isLoggedIn, isAdmin = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-primary font-bold text-2xl">GivingPacks</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/projects" className="text-gray-700 hover:text-primary font-medium">
            Projects
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary font-medium">
            About
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-primary font-medium">
            How It Works
          </Link>
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="text-gray-700 hover:text-primary font-medium">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium">
                My Donations
              </Link>
              <Button variant="outline" asChild>
                <Link to="/logout">Log Out</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="container mx-auto flex flex-col gap-4 px-4">
            <Link to="/projects" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
              Projects
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
              How It Works
            </Link>
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
                  My Donations
                </Link>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/logout">Log Out</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
