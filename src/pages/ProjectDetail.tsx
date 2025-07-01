import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { mockProjects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, Heart, Share2, ArrowLeft, ExternalLink } from "lucide-react";
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
          <div className="text-center">
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
          <Button variant="ghost" asChild>
            <Link to="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Project Hero */}
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400';
                  }}
                />
              </div>
              
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                <p className="text-gray-600 mb-4">by {project.organization}</p>
                <p className="mb-6">{project.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
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
        
        {/* About Organization Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-50 p-8 rounded-lg border">
            {/* Header with Title and Tags */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="lg:flex-1">
                <h3 className="text-2xl font-bold mb-4">About {project.organization}</h3>
                
                {/* Project Details as Tags */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="secondary" className="px-3 py-2 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {project.location || project.organization}
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-2 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    {project.beneficiaries || 'Community members'}
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-2 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {project.timeline || 'Ongoing'}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-2 text-sm">
                    Category: {project.categoryId || 'General'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Content Layout: 70% text, 30% button */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-7/10 flex-1">
                <p className="text-gray-700 leading-relaxed">
                  {project.organizationDescription || 'A dedicated organization working to make a positive impact in the community through various outreach programs and initiatives.'}
                </p>
              </div>
              
              <div className="lg:w-3/10 lg:flex lg:justify-end lg:items-start">
                {project.organizationWebsite && (
                  <Button asChild className="w-full lg:w-auto">
                    <a href={project.organizationWebsite} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Items Needed and Side Components Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items Needed - Takes 1/3 of the space */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-8">Items Needed</h2>
              
              <div className="space-y-6">
                {project.items && project.items.length > 0 ? (
                  project.items.map((item: Item) => (
                    <ItemNeeds 
                      key={item.id} 
                      item={item} 
                      onDonate={handleDonateItem} 
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No specific items needed at this time.</p>
                    <p className="text-sm mt-2">Monetary donations are always welcome!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Side Components - Takes 2/3 of the space */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Compact Impact Calculator */}
                <div className="aspect-square">
                  <DonationImpactCalculator />
                </div>

                {/* Testimonial Box */}
                <div className="aspect-square">
                  <TestimonialCarousel />
                </div>
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
