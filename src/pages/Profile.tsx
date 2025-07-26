
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Heart, Clock, Filter } from "lucide-react";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: ""
  });

  // Mock donation data - same as My Donations page
  const donations = [
    {
      id: 1,
      projectTitle: "School Supplies for Rural Children",
      organization: "Education First",
      amount: 25,
      type: "monetary",
      date: "2024-06-28",
      status: "completed",
      impact: "Helped 5 children get school supplies"
    },
    {
      id: 2,
      projectTitle: "Emergency Food Relief",
      organization: "Food Bank Network",
      items: ["Canned Food", "Rice Bags"],
      type: "items",
      date: "2024-06-25",
      status: "delivered",
      impact: "Fed 3 families for a week"
    },
    {
      id: 3,
      projectTitle: "Medical Equipment Fund",
      organization: "Health Care Alliance",
      amount: 50,
      type: "monetary",
      date: "2024-06-20",
      status: "processing",
      impact: "Contributing to medical equipment purchase"
    }
  ];

  // Filter donations by category
  const filteredDonations = selectedCategory === "all" 
    ? donations 
    : donations.filter(d => d.organization.toLowerCase().includes(selectedCategory.toLowerCase()));

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Access denied",
        description: "Please log in to view your profile.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, navigate, toast]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      } else {
        setProfile(data);
        setFormData({
          firstName: data.first_name || "",
          lastName: data.last_name || ""
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile.",
          variant: "destructive",
        });
      } else {
        setProfile(prev => prev ? {
          ...prev,
          first_name: formData.firstName,
          last_name: formData.lastName
        } : null);
        setIsEditing(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const displayName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : '';
  const initials = profile ? 
    `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`.toUpperCase() : 
    user.email?.[0]?.toUpperCase() || 'U';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
              <Button 
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-8">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-primary text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">
                    {displayName || "No name set"}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ""}
                    disabled
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Donations</CardTitle>
              {donations.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="hover-lift smooth-transition">
                      <Clock className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Heart className="w-6 h-6 text-primary" />
                        Recent Donations
                      </DialogTitle>
                    </DialogHeader>
                    
                    {/* Category Filter */}
                    <div className="flex items-center gap-4 mb-4">
                      <Filter className="w-5 h-5 text-gray-500" />
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Donations</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="food">Food Security</SelectItem>
                          <SelectItem value="health">Healthcare</SelectItem>
                          <SelectItem value="shelter">Housing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Scrollable donations list */}
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-4">
                        {filteredDonations.map((donation) => (
                          <Card key={donation.id} className="soft-shadow hover-lift smooth-transition">
                            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-3">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-lg mb-1 text-gray-900">{donation.projectTitle}</CardTitle>
                                  <p className="text-gray-600 font-medium text-sm">{donation.organization}</p>
                                </div>
                                <div className="mt-2 md:mt-0 flex flex-col items-end gap-2">
                                  <Badge 
                                    variant={
                                      donation.status === 'completed' ? 'default' :
                                      donation.status === 'delivered' ? 'default' :
                                      'secondary'
                                    }
                                    className="font-medium"
                                  >
                                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                  </Badge>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(donation.date).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-2 text-gray-900 text-sm">Your Contribution</h4>
                                  {donation.type === 'monetary' ? (
                                    <p className="text-2xl font-bold text-primary">${donation.amount}</p>
                                  ) : (
                                    <div className="space-y-1">
                                      {donation.items?.map((item, index) => (
                                        <Badge key={index} variant="outline" className="mr-1 text-xs">{item}</Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2 text-gray-900 text-sm">Impact</h4>
                                  <p className="text-gray-700 leading-relaxed text-sm">{donation.impact}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            <CardContent>
              {donations.length > 0 ? (
                <div className="space-y-4">
                  {donations.slice(0, 2).map((donation) => (
                    <div key={donation.id} className="border rounded-lg p-4 hover-lift smooth-transition">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{donation.projectTitle}</h4>
                        <Badge variant="outline" className="text-xs">
                          {donation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{donation.organization}</p>
                      <div className="flex justify-between items-center">
                        {donation.type === 'monetary' ? (
                          <span className="font-bold text-primary">${donation.amount}</span>
                        ) : (
                          <span className="text-sm text-gray-700">Items donated</span>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(donation.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {donations.length > 2 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{donations.length - 2} more donations
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">No donations yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
