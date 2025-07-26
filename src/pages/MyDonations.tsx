
import { Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Heart, Package, DollarSign, Search, Users, TrendingUp, Target, Award, Clock, Filter } from "lucide-react";
import CommunitySpotlight from "@/components/CommunitySpotlight";
import UrgencyBanner from "@/components/UrgencyBanner";

const MyDonations = () => {
  const { user, loading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  // Filter donations by category
  const filteredDonations = selectedCategory === "all" 
    ? donations 
    : donations.filter(d => d.organization.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Mock urgency banner data - show if active campaigns need urgent support
  const showUrgencyBanner = true; // In real app, this would be determined by API data
  const urgencyEndDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(); // 5 days from now

  // Enhanced stats data
  const statsData = [
    {
      icon: DollarSign,
      title: "Total Donated",
      value: `$${totalDonated}`,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      icon: Heart,
      title: "Projects Supported", 
      value: `${totalProjects}`,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: Package,
      title: "Lives Impacted",
      value: "12",
      color: "from-green-500 to-green-600", 
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: Users,
      title: "Families Helped",
      value: "8",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100"
    },
    {
      icon: TrendingUp,
      title: "This Month",
      value: "$25",
      color: "from-teal-500 to-teal-600",
      bgColor: "from-teal-50 to-teal-100"
    },
    {
      icon: Target,
      title: "Goal Progress",
      value: "75%",
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100"
    },
    {
      icon: Award,
      title: "Donor Level",
      value: "Silver",
      color: "from-indigo-500 to-indigo-600", 
      bgColor: "from-indigo-50 to-indigo-100"
    },
    {
      icon: Search,
      title: "Explore",
      value: "Find Projects",
      color: "from-gray-500 to-gray-600",
      bgColor: "from-gray-50 to-gray-100",
      isLink: true
    }
  ];

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
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-16">
                {statsData.map((stat, index) => (
                  <Card key={stat.title} className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 soft-shadow border-0 bg-gradient-to-br ${stat.bgColor} hover:shadow-xl`}>
                    <CardContent className="p-4 text-center relative overflow-hidden">
                      {/* Animated background element */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      {stat.isLink ? (
                        <Link to="/projects" className="block relative z-10">
                          <div className={`w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-sm font-bold mb-1 text-gray-900">{stat.value}</h3>
                          <p className="text-xs text-gray-600 font-medium">{stat.title}</p>
                        </Link>
                      ) : (
                        <div className="relative z-10">
                          <div className={`w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-sm font-bold mb-1 text-gray-900">{stat.value}</h3>
                          <p className="text-xs text-gray-600 font-medium">{stat.title}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Community Spotlight Banner */}
              <CommunitySpotlight />
            </div>
          </div>
        </section>

        {/* Recent Donations Button */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="elegant-gradient text-white hover-lift smooth-transition px-8">
                    <Clock className="w-5 h-5 mr-2" />
                    View Recent Donations
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
