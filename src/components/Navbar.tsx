
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-primary font-bold text-2xl">GivingPacks</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-soft backdrop-blur-md sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover-scale smooth-transition">
          <span className="text-primary font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
            GivingPacks
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/projects" className="text-gray-700 hover:text-primary font-medium story-link smooth-transition">
            Projects
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary font-medium story-link smooth-transition">
            About
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-primary font-medium story-link smooth-transition">
            How It Works
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium story-link smooth-transition">
                My Donations
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full hover-scale smooth-transition shadow-soft">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="animate-scale-in shadow-elegant backdrop-blur-md border border-white/20">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="smooth-transition hover:bg-primary/10">
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="smooth-transition hover:bg-destructive/10 text-destructive">
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" asChild className="hover-lift smooth-transition">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild className="elegant-gradient hover-lift smooth-transition shadow-soft">
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
        <div className="md:hidden bg-white shadow-elegant py-4 animate-fade-in border-t border-border/50 backdrop-blur-md">
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
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
                  My Donations
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary font-medium py-2" onClick={toggleMenu}>
                  Profile
                </Link>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  Log Out
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
