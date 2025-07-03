import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Building2, Upload, CheckCircle, Users, Lightbulb } from "lucide-react";

const AdminRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  
  const [orgData, setOrgData] = useState({
    name: '',
    description: '',
    website: '',
    orgType: '', // 'community', 'nonprofit', 'church', 'school'
    hasDocuments: false
  });

  const handleAuthNext = () => {
    if (!authData.email || !authData.password || !authData.firstName || !authData.lastName) {
      toast({
        title: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }
    if (authData.password !== authData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!orgData.name || !orgData.orgType) {
      toast({
        title: "Please fill required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Sign up user
      const { data: authResult, error: authError } = await supabase.auth.signUp({
        email: authData.email,
        password: authData.password,
        options: {
          data: {
            first_name: authData.firstName,
            last_name: authData.lastName,
          }
        }
      });

      if (authError) throw authError;

      // Create organization
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: orgData.name,
          description: orgData.description,
          website_url: orgData.website,
          verified: orgData.hasDocuments // Auto-verify if they have documents
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // Create admin user
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert({
          user_id: authResult.user!.id,
          email: authData.email,
          role: 'org_admin',
          organization_id: org.id,
          active: true
        });

      if (adminError) throw adminError;

      toast({
        title: "Registration successful!",
        description: "Check your email to confirm your account."
      });

      navigate('/admin/login');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin/login')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary" />
                Join GivingPacks as an Organization
              </CardTitle>
              <p className="text-muted-foreground">
                Whether you're a community group, church, school, or registered nonprofit - 
                create projects and connect with generous donors.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step Indicator */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    {step > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
                  </div>
                  <span className="text-sm font-medium">Account Info</span>
                </div>
                <div className="h-px bg-border flex-1" />
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    2
                  </div>
                  <span className="text-sm font-medium">Organization</span>
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Create Your Account</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={authData.firstName}
                        onChange={(e) => setAuthData({...authData, firstName: e.target.value})}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={authData.lastName}
                        onChange={(e) => setAuthData({...authData, lastName: e.target.value})}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={authData.email}
                      onChange={(e) => setAuthData({...authData, email: e.target.value})}
                      placeholder="john@organization.org"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={authData.password}
                      onChange={(e) => setAuthData({...authData, password: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={authData.confirmPassword}
                      onChange={(e) => setAuthData({...authData, confirmPassword: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleAuthNext} className="w-full">
                    Next: Organization Details
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Organization Details</h3>
                  
                  <div>
                    <Label htmlFor="orgType">Organization Type</Label>
                    <Select value={orgData.orgType} onValueChange={(value) => setOrgData({...orgData, orgType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="What type of organization are you?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="community">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Community Group
                          </div>
                        </SelectItem>
                        <SelectItem value="church">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Church/Religious Organization
                          </div>
                        </SelectItem>
                        <SelectItem value="school">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" />
                            School/Educational Institution
                          </div>
                        </SelectItem>
                        <SelectItem value="nonprofit">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Registered Nonprofit/Charity
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={orgData.name}
                      onChange={(e) => setOrgData({...orgData, name: e.target.value})}
                      placeholder="Your Community Center"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={orgData.description}
                      onChange={(e) => setOrgData({...orgData, description: e.target.value})}
                      placeholder="Tell us about your organization and its mission..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      value={orgData.website}
                      onChange={(e) => setOrgData({...orgData, website: e.target.value})}
                      placeholder="https://yourorganization.org"
                    />
                  </div>

                  {orgData.orgType === 'nonprofit' && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Registered Nonprofit?</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        If you have official documentation (501(c)(3), charitable status, etc.), 
                        you can upload it later for verified status and enhanced credibility.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setOrgData({...orgData, hasDocuments: !orgData.hasDocuments})}
                        className={orgData.hasDocuments ? 'bg-blue-100 text-blue-700' : ''}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {orgData.hasDocuments ? 'Will upload documents' : 'I have official documents'}
                      </Button>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading} className="flex-1">
                      {isLoading ? 'Creating Account...' : 'Create Organization'}
                    </Button>
                  </div>
                </div>
              )}

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/admin/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;