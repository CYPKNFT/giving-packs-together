
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { mockProjects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, Heart, Share2, ArrowLeft, ExternalLink, Phone, Map } from "lucide-react";
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
          setProject(foundProject);
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="hover-scale">
            <Link to="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Extended Project Hero */}
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/2">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-96 object-cover rounded-lg shadow-lg hover-scale"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400';
                  }}
                />
              </div>
              
              <div className="md:w-1/2 animate-fade-in">
                <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
                <p className="text-gray-600 mb-4 text-lg">by {project.organization}</p>
                <p className="mb-8 text-lg leading-relaxed">
                  {project.description} This program provides comprehensive support including temporary housing, job training, mental health services, and life skills coaching to ensure successful long-term transitions.
                </p>
                
                <div className="mb-2">
                  <h3 className="text-xl font-semibold mb-4">Overall Progress</h3>
                  <ProgressBar 
                    current={project.itemsFulfilled || 0} 
                    target={project.itemsNeeded || 100}
                    label="Items Fulfilled" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Container with Half-Width About Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* About Organization Section - Half Width */}
            <div className="animate-fade-in">
              <Card className="h-full hover-scale">
                <CardContent className="p-8">
                  {/* Header with Title and Tags */}
                  <div className="mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <h3 className="text-2xl font-bold">About {project.organization}</h3>
                      
                      {/* Contact Info */}
                      <div className="flex items-center gap-4 mt-2 lg:mt-0">
                        <a href="tel:+1234567890" className="flex items-center text-primary hover:text-primary/80 transition-colors">
                          <Phone className="w-4 h-4 mr-1" />
                          <span className="text-sm">(123) 456-7890</span>
                        </a>
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:text-primary/80 transition-colors">
                          <Map className="w-4 h-4 mr-1" />
                          <span className="text-sm">View Location</span>
                        </a>
                      </div>
                    </div>
                    
                    {/* Project Details as Tags */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <Badge variant="secondary" className="px-3 py-2 text-sm hover-scale">
                        <MapPin className="w-4 h-4 mr-2" />
                        {project.location || project.organization}
                      </Badge>
                      <Badge variant="secondary" className="px-3 py-2 text-sm hover-scale">
                        <Users className="w-4 h-4 mr-2" />
                        {project.beneficiaries || 'Community members'}
                      </Badge>
                      <Badge variant="secondary" className="px-3 py-2 text-sm hover-scale">
                        <Calendar className="w-4 h-4 mr-2" />
                        {project.timeline || 'Ongoing'}
                      </Badge>
                      <Link 
                        to={`/projects?category=${project.categoryId || 'general'}`}
                        className="inline-flex items-center rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground hover:bg-primary/10 hover-scale"
                      >
                        Category: {project.categoryId || 'General'}
                      </Link>
                    </div>
                  </div>

                  {/* Content Layout: Text and Button */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        {project.organizationDescription || 'A dedicated organization working to make a positive impact in the community through various outreach programs and initiatives. We focus on providing comprehensive support services that address the root causes of homelessness while building sustainable pathways to independence.'}
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      {project.organizationWebsite && (
                        <Button asChild className="hover-scale">
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
              {/* Stats Header */}
              <div className="animate-fade-in">
                <Card className="hover-scale">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">45</div>
                        <div className="text-sm text-gray-600">Families Served</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">Monthly</div>
                        <div className="text-sm text-gray-600">Distribution</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">Dec 15</div>
                        <div className="text-sm text-gray-600">Next Distribution</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{project.itemsFulfilled || 0}/{project.itemsNeeded || 100}</div>
                        <div className="text-sm text-gray-600">Items Collected</div>
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

          {/* Items Needed Section */}
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 text-center">Items Needed</h2>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
