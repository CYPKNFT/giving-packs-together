
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import ItemNeeds, { Item } from "@/components/ItemNeeds";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { mockProjects } from "@/data/mockData";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching project data
    const fetchProject = async () => {
      try {
        // In a real app, you would fetch data from an API
        const foundProject = mockProjects.find(p => p.id === id);
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          toast({
            title: "Error",
            description: "Project not found",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load project details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
    
    // Simulate checking login status
    setIsLoggedIn(false);
  }, [id, toast]);

  const handleDonateItem = (itemId: string, quantity: number) => {
    if (!isLoggedIn) {
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
        <Navbar isLoggedIn={isLoggedIn} />
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
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-xl">Project not found</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="flex-grow">
        {/* Project Hero */}
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                <p className="text-gray-600 mb-4">by {project.organization}</p>
                <p className="mb-6">{project.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
                  <ProgressBar 
                    current={project.itemsFulfilled} 
                    target={project.itemsNeeded}
                    label="Items Fulfilled" 
                  />
                </div>
                
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Project Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{project.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Beneficiaries</p>
                      <p className="font-medium">{project.beneficiaries}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Timeline</p>
                      <p className="font-medium">{project.timeline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Item Needs Section */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Items Needed</h2>
          
          <div className="space-y-6">
            {project.items.map((item: Item) => (
              <ItemNeeds 
                key={item.id} 
                item={item} 
                onDonate={handleDonateItem} 
              />
            ))}
          </div>
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-lg font-bold mb-3">About {project.organization}</h3>
            <p className="mb-4">{project.organizationDescription}</p>
            <Button asChild>
              <a href={project.organizationWebsite} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
