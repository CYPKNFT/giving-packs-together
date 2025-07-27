import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useAdmin } from '@/contexts/AdminContext';
import { 
  Building2, 
  Shield, 
  ArrowLeft,
  Mail,
  Lock,
  UserCheck
} from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAdmin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError('Invalid email or password, or you do not have admin access.');
        setLoading(false);
        return;
      }

      // Redirect will be handled by AdminContext and route protection
      navigate('/admin/dashboard');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/start-project" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Start Project
            </Link>
          </Button>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription className="text-base mt-2">
                Sign in to manage your organization and projects
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@organization.org"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-11"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Sign In to Admin Portal
                  </>
                )}
              </Button>
            </form>

            <div className="space-y-4">
              <Separator />
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Don't have admin access?
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/admin/register">
                    <Building2 className="w-4 h-4 mr-2" />
                    Register Your Organization
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <Link 
                  to="/admin/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Need help getting started?
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <Link to="/how-it-works" className="text-primary hover:underline">
              How it works
            </Link>
            <Link to="/contact" className="text-primary hover:underline">
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;