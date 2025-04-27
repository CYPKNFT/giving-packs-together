
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, you would call an authentication API
      // Simulate a login request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      toast({
        title: "Login successful!",
        description: "You have been logged in successfully.",
      });
      
      // Redirect based on user role
      if (isAdmin) {
        // Store the admin state in localStorage for persistence
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", "true");
        navigate("/admin/dashboard");
      } else {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", "false");
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${isAdmin ? "bg-primary" : "bg-white"}`}>
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className={`w-full max-w-md rounded-lg shadow-md overflow-hidden transition-all duration-300 ${isAdmin ? "bg-white shadow-lg transform scale-105" : "bg-white"}`}>
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold ${isAdmin ? "text-primary" : "text-gray-900"} transition-colors`}>
                {isAdmin ? "Admin Login" : "Welcome back"}
              </h2>
              <p className={`mt-2 ${isAdmin ? "text-primary" : "text-gray-600"} transition-colors`}>
                {isAdmin ? "Log in to your admin account" : "Log in to your account"}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className={`${isAdmin ? "text-primary" : ""}`}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`${isAdmin ? "border-primary focus-visible:ring-primary" : ""}`}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className={`${isAdmin ? "text-primary" : ""}`}>Password</Label>
                  <Link
                    to="/forgot-password"
                    className={`text-sm ${isAdmin ? "text-primary-dark hover:text-primary" : "text-primary hover:text-primary-dark"}`}
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`${isAdmin ? "border-primary focus-visible:ring-primary" : ""}`}
                />
              </div>

              <div className="text-center">
                <Link
                  to="/admin/login"
                  className={`text-sm font-medium transition-all duration-300 ${
                    isAdmin 
                      ? "bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-primary-dark" 
                      : "text-primary hover:text-primary-dark"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAdmin(!isAdmin);
                  }}
                >
                  {isAdmin ? "Switch to User Login" : "Login as an Organization Admin"}
                </Link>
              </div>
              
              <Button
                type="submit"
                className={`w-full ${
                  isAdmin 
                    ? "bg-primary text-white hover:bg-primary-dark" 
                    : "bg-primary hover:bg-primary-dark"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className={`${isAdmin ? "text-primary" : "text-gray-600"}`}>
                Don't have an account?{" "}
                <Link to="/signup" className={`font-semibold ${isAdmin ? "text-primary hover:text-primary-dark" : "text-primary hover:text-primary-dark"}`}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
