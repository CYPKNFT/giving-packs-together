
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Package, DollarSign, Search } from "lucide-react";
import CommunitySpotlight from "@/components/CommunitySpotlight";
import UrgencyBanner from "@/components/UrgencyBanner";

const MyDonations = () => {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Mock donation data
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

  const totalDonated = donations
    .filter(d => d.type === 'monetary')
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  const totalProjects = donations.length;

  // Mock urgency banner data - show if active campaigns need urgent support
  const showUrgencyBanner = true; // In real app, this would be determined by API data
  const urgencyEndDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(); // 5 days from now

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-gradient-hero py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce-in"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">My Donations</h1>
              <p className="text-xl text-white/90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Track your impact and see how your generosity is making a difference.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-subtle relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                <Card className="soft-shadow hover-lift smooth-transition">
                  <CardContent className="p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-3xl font-bold mb-2 text-gray-900">${totalDonated}</h3>
                    <p className="text-gray-600 font-medium">Total Donated</p>
                  </CardContent>
                </Card>
                
                <Card className="soft-shadow hover-lift smooth-transition">
                  <CardContent className="p-8 text-center bg-gradient-to-br from-blue-50 to-blue-100">
                    <Heart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold mb-2 text-gray-900">{totalProjects}</h3>
                    <p className="text-gray-600 font-medium">Projects Supported</p>
                  </CardContent>
                </Card>
                
                <Card className="soft-shadow hover-lift smooth-transition">
                  <CardContent className="p-8 text-center bg-gradient-to-br from-green-50 to-green-100">
                    <Package className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold mb-2 text-gray-900">12</h3>
                    <p className="text-gray-600 font-medium">Lives Impacted</p>
                  </CardContent>
                </Card>

                <Card className="soft-shadow hover-lift smooth-transition cursor-pointer group">
                  <CardContent className="p-8 text-center bg-gradient-to-br from-orange-50 to-orange-100">
                    <Link to="/projects" className="block">
                      <Search className="w-16 h-16 text-orange-600 mx-auto mb-4 group-hover:scale-110 smooth-transition" />
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Explore</h3>
                      <p className="text-gray-600 font-medium">Find Projects</p>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Community Spotlight Banner */}
              <CommunitySpotlight />
            </div>
          </div>
        </section>

        {/* Recent Donations Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Recent Donations</h2>
                
                {donations.map((donation) => (
                  <Card key={donation.id} className="soft-shadow hover-lift smooth-transition">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 text-gray-900">{donation.projectTitle}</CardTitle>
                          <p className="text-gray-600 font-medium">{donation.organization}</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
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
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(donation.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-900">Your Contribution</h4>
                          {donation.type === 'monetary' ? (
                            <p className="text-3xl font-bold text-primary">${donation.amount}</p>
                          ) : (
                            <div className="space-y-2">
                              {donation.items?.map((item, index) => (
                                <Badge key={index} variant="outline" className="mr-2">{item}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-900">Impact</h4>
                          <p className="text-gray-700 leading-relaxed">{donation.impact}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Empty State for no donations */}
              {donations.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-4">No donations yet</h3>
                    <p className="text-gray-600 mb-6">
                      Start making a difference by supporting projects that matter to you.
                    </p>
                    <Button asChild>
                      <Link to="/projects">Browse Projects</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      
      {/* Urgency Banner - Fixed at bottom */}
      <UrgencyBanner 
        show={showUrgencyBanner}
        endDate={urgencyEndDate}
        matchingFund={true}
      />
      
      <Footer />
    </div>
  );
};

export default MyDonations;
