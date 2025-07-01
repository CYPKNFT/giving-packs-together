
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { mockProjects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, Heart, Share2, ArrowLeft, ExternalLink, Phone, Map, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import ItemNeeds, { Item } from "@/components/ItemNeeds";
import DonationImpactCalculator from "@/components/DonationImpactCalculator";
import { useAuth } from "@/contexts/AuthContext";
import { Project } from "@/types/project";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Generate additional items to have 9 total (3 rows of 3)
  const generateAdditionalItems = (existingItems: Item[]) => {
    const additionalItems = [
      {
        id: "project-1-item-4",
        name: "Hygiene Kit",
        description: "Personal care essentials for maintaining dignity and health",
        price: 12.99,
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        current: 8,
        needed: 20
      },
      {
        id: "project-1-item-5",
        name: "Warm Blanket",
        description: "Cozy blankets for comfort during cold nights",
        price: 24.99,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        current: 18,
        needed: 25
      },
      {
        id: "project-1-item-6",
        name: "Kitchen Starter Kit",
        description: "Basic cooking utensils and supplies for new homes",
        price: 35.00,
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        current: 3,
        needed: 15
      },
      {
        id: "project-1-item-7",
        name: "School Supplies",
        description: "Educational materials for children in transitional housing",
        price: 18.50,
        imageUrl: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400",
        current: 22,
        needed: 30
      },
      {
        id: "project-1-item-8",
        name: "Food Package",
        description: "Nutritious meal packages for families in need",
        price: 45.00,
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
        current: 7,
        needed: 40
      },
      {
        id: "project-1-item-9",
        name: "Clothing Bundle",
        description: "Essential clothing items for all family members",
        price: 32.00,
        imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
        current: 14,
        needed: 20
      }
    ];
    return [...existingItems, ...additionalItems];
  };

  // Calculate item status counts
  const getItemStatusCounts = (items: Item[]) => {
    if (!items || items.length === 0) return { urgent: 0, low: 0, moderate: 0, stocked: 0 };
    
    return items.reduce((counts, item) => {
      const percentage = Math.min(Math.round((item.current / item.needed) * 100), 100);
      if (percentage < 25) counts.urgent++;
      else if (percentage < 50) counts.low++;
      else if (percentage < 75) counts.moderate++;
      else counts.stocked++;
      return counts;
    }, { urgent: 0, low: 0, moderate: 0, stocked: 0 });
  };

  useEffect(() => {
    // Simulate fetching project data
    const fetchProject = async () => {
      try {
        console.log("Fetching project with ID:", id);
        console.log("Available projects:", mockProjects);
        
        // In a real app, you would fetch data from an API
        const foundProject = mockProjects.find(p => p.id === id);
        
        if (foundProject) {
          console.log("Found project:", foundProject);
          // Add more items to make 9 total
          const projectWithMoreItems = {
            ...foundProject,
            items: generateAdditionalItems(foundProject.items || [])
          };
          setProject(projectWithMoreItems);
        } else {
          console.log("Project not found for ID:", id);
          toast({
            title: "Error",
            description: "Project not found",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast({
          title: "Error",
          description: "Failed to load project details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    } else {
      setLoading(false);
    }
  }, [id, toast]);

  const handleDonateItem = (itemId: string, quantity: number) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to donate items",
        variant: "default"
      });
      return;
    }

    // In a real app, you would make an API call to update the donation
    toast({
      title: "Thank you for your donation!",
      description: `You have pledged to donate ${quantity} item(s)`,
      variant: "default"
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading project details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Project not found</h2>
            <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been moved.</p>
            <Button asChild>
              <Link to="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const itemStatusCounts = getItemStatusCounts(project.items);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link to="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Extended Project Hero */}
        <div className="bg-gray-100 pb-2">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/2">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-96 object-cover rounded-lg shadow-lg transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400';
                  }}
                />
              </div>
              
              <div className="md:w-1/2 animate-fade-in">
                <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
                <p className="text-gray-600 mb-4 text-lg">by {project.organization}</p>
                <p className="mb-6 text-lg leading-relaxed">
                  {project.description} This comprehensive program provides essential support including temporary housing, job training, mental health services, and life skills coaching to ensure successful long-term transitions back into stable community living. Our holistic approach addresses not just immediate needs but also long-term stability and independence.
                </p>
                
                <div className="mb-2">
                  <h3 className="text-xl font-semibold mb-4">Overall Progress</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">
                        {project.itemsFulfilled || 0}/{project.itemsNeeded || 100} items collected
                      </span>
                      <span className="text-sm font-bold text-primary">
                        31%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: '31%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Container with Compact About Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* About Organization Section - Compact Design */}
            <div className="animate-fade-in">
              <Card className="h-full">
                <CardContent className="p-6">
                  {/* Compact Header */}
                  <div className="mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                      <h3 className="text-2xl font-bold mb-2 lg:mb-0">About {project.organization}</h3>
                      
                      {/* Contact Info - More Compact */}
                      <div className="flex items-center gap-3 text-sm">
                        <a href="tel:+1234567890" className="flex items-center text-primary hover:text-primary/80 transition-colors">
                          <Phone className="w-4 h-4 mr-1" />
                          (123) 456-7890
                        </a>
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:text-primary/80 transition-colors">
                          <Map className="w-4 h-4 mr-1" />
                          View Location
                        </a>
                      </div>
                    </div>
                    
                    {/* Project Details as Compact Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="px-2 py-1 text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.location || project.organization}
                      </Badge>
                      <Badge variant="secondary" className="px-2 py-1 text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {project.beneficiaries || 'Community members'}
                      </Badge>
                      <Badge variant="secondary" className="px-2 py-1 text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {project.timeline || 'Ongoing'}
                      </Badge>
                      <Link 
                        to={`/projects?category=${project.categoryId || 'general'}`}
                        className="inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground hover:bg-primary/10"
                      >
                        Category: {project.categoryId || 'General'}
                      </Link>
                    </div>
                  </div>

                  {/* Content Layout: Text and Button - More Compact */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {project.organizationDescription || 'A dedicated organization working to make a positive impact in the community through various outreach programs and initiatives. We focus on providing comprehensive support services that address the root causes of homelessness while building sustainable pathways to independence.'}
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      {project.organizationWebsite && (
                        <Button asChild size="sm">
                          <a href={project.organizationWebsite} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats and Side Components */}
            <div className="space-y-6">
              {/* Program Overview with Purple Styling and Hover Effects */}
              <div className="animate-fade-in">
                <Card className="bg-primary text-white">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-white">Program Overview</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center transition-all duration-300 hover:bg-white/20">
                        <div className="text-3xl font-bold text-white mb-1">45</div>
                        <div className="text-sm text-white/80 mb-2">Families Served</div>
                        <div className="flex items-center justify-center text-xs text-green-200">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +18% this month
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center transition-all duration-300 hover:bg-white/20">
                        <div className="text-3xl font-bold text-white mb-1">Monthly</div>
                        <div className="text-sm text-white/80">Distribution</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center transition-all duration-300 hover:bg-white/20">
                        <div className="text-3xl font-bold text-white mb-1">Dec 15</div>
                        <div className="text-sm text-white/80">Next Distribution</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center transition-all duration-300 hover:bg-white/20">
                        <div className="text-3xl font-bold text-white mb-1">{project.itemsFulfilled || 0}/{project.itemsNeeded || 100}</div>
                        <div className="text-sm text-white/80">Items Collected</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Impact Calculator and Testimonial */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-fade-in">
                  <DonationImpactCalculator />
                </div>
                <div className="animate-fade-in">
                  <TestimonialCarousel />
                </div>
              </div>
            </div>
          </div>

          {/* Items Needed Section with Grey Background and Status Tags */}
          <div className="bg-gray-100 -mx-4 px-4 py-12 rounded-lg animate-fade-in">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h2 className="text-3xl font-bold mb-4 md:mb-0">Items Needed</h2>
                
                {/* Status Tags */}
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="px-3 py-2 bg-red-100 text-red-800 border-red-200">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Urgent ({itemStatusCounts.urgent})
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-2 bg-orange-100 text-orange-800 border-orange-200">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Low ({itemStatusCounts.low})
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-2 bg-yellow-100 text-yellow-800 border-yellow-200">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                    Moderate ({itemStatusCounts.moderate})
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-2 bg-green-100 text-green-800 border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Stocked ({itemStatusCounts.stocked})
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.items && project.items.length > 0 ? (
                  project.items.map((item: Item, index: number) => (
                    <div 
                      key={item.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ItemNeeds 
                        item={item} 
                        onDonate={handleDonateItem} 
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    <p className="text-lg">No specific items needed at this time.</p>
                    <p className="text-sm mt-2">Monetary donations are always welcome!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
