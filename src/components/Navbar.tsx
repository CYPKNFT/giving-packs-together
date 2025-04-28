import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavbarProps = {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
};

const Navbar = ({ isLoggedIn: propIsLoggedIn, isAdmin: propIsAdmin = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(propIsLoggedIn);
  const [isAdmin, setIsAdmin] = useState(propIsAdmin);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";
    
    setIsLoggedIn(propIsLoggedIn !== undefined ? propIsLoggedIn : storedIsLoggedIn);
    setIsAdmin(propIsAdmin !== undefined ? propIsAdmin : storedIsAdmin);
    
    if (storedIsLoggedIn) {
      setUserName(storedIsAdmin ? 'Admin' : 'User');
    }
  }, [propIsLoggedIn, propIsAdmin]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-primary font-bold text-2xl">GivingPacks</span>
        </Link>

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
                <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary font-medium">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium">
                My Donations
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">
                        {userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {userName} {isAdmin && "(Admin)"}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild onClick={handleLogout}>
                    <Link to="/">Log Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

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
                  <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
                  My Donations
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
                  Profile
                </Link>
                <Link to="/settings" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
                  Settings
                </Link>
                <Button variant="outline" className="w-full" asChild onClick={handleLogout}>
                  <Link to="/">Log Out</Link>
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
