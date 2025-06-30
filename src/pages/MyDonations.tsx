
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Package, DollarSign } from "lucide-react";

const MyDonations = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(storedIsLoggedIn);
    setIsAdmin(storedIsAdmin);
  }, []);

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">My Donations</h1>
              <p className="text-xl text-gray-600">
                Track your impact and see how your generosity is making a difference.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">${totalDonated}</h3>
                    <p className="text-gray-600">Total Donated</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{totalProjects}</h3>
                    <p className="text-gray-600">Projects Supported</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Package className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">12</h3>
                    <p className="text-gray-600">Lives Impacted</p>
                  </CardContent>
                </Card>
              </div>

              {/* Donations List */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Recent Donations</h2>
                
                {donations.map((donation) => (
                  <Card key={donation.id}>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{donation.projectTitle}</CardTitle>
                          <p className="text-gray-600">{donation.organization}</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
                          <Badge 
                            variant={
                              donation.status === 'completed' ? 'default' :
                              donation.status === 'delivered' ? 'default' :
                              'secondary'
                            }
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
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Your Contribution</h4>
                          {donation.type === 'monetary' ? (
                            <p className="text-2xl font-bold text-primary">${donation.amount}</p>
                          ) : (
                            <div className="space-y-1">
                              {donation.items?.map((item, index) => (
                                <Badge key={index} variant="outline">{item}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Impact</h4>
                          <p className="text-gray-600">{donation.impact}</p>
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
                      <a href="/projects">Browse Projects</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyDonations;
