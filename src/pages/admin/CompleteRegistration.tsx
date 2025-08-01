import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Building2, CheckCircle, Loader2 } from "lucide-react";

const CompleteRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const completeRegistration = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        if (!session?.user) {
          throw new Error('No authenticated user found');
        }

        const user = session.user;
        const metadata = user.user_metadata;

        // Check if organization and admin user already exist
        const { data: existingAdmin } = await supabase
          .from('admin_users')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (existingAdmin) {
          // Already completed
          setStatus('success');
          setIsLoading(false);
          return;
        }

        // Create organization
        const { data: org, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: metadata.org_name,
            description: metadata.org_description,
            website_url: metadata.org_website,
            verified: metadata.org_has_documents || false
          })
          .select()
          .single();

        if (orgError) throw orgError;

        // Create admin user
        const { error: adminError } = await supabase
          .from('admin_users')
          .insert({
            user_id: user.id,
            email: user.email!,
            role: 'org_admin',
            organization_id: org.id,
            active: true
          });

        if (adminError) throw adminError;

        setStatus('success');
        toast({
          title: "Registration completed!",
          description: "Your organization has been created successfully."
        });

      } catch (error: any) {
        console.error('Registration completion error:', error);
        setStatus('error');
        toast({
          title: "Registration completion failed",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    completeRegistration();
  }, [toast]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
            <h2 className="text-lg font-semibold mb-2">Completing Registration</h2>
            <p className="text-muted-foreground">Setting up your organization...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            {status === 'success' ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-500" />
                Registration Complete!
              </>
            ) : (
              <>
                <Building2 className="w-6 h-6 text-destructive" />
                Registration Failed
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {status === 'success' ? (
            <>
              <p className="text-muted-foreground">
                Your organization account has been created successfully. You can now log in to access the admin dashboard.
              </p>
              <Button onClick={() => navigate('/admin/login')} className="w-full">
                Go to Admin Login
              </Button>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">
                There was an issue completing your registration. Please try again or contact support.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/admin/register')} 
                  className="flex-1"
                >
                  Try Again
                </Button>
                <Button onClick={() => navigate('/admin/login')} className="flex-1">
                  Login
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteRegistration;