import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { mockProjects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectDetailData } from "@/types";
import { Item } from "@/components/ItemNeeds";

// New extracted components with React.memo for performance
import ProjectLayout from "@/components/project/ProjectLayout";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectAbout from "@/components/project/ProjectAbout";
import ProjectStats from "@/components/project/ProjectStats";
import ProjectItemsSection from "@/components/project/ProjectItemsSection";
import ProjectSidebar from "@/components/project/ProjectSidebar";

const ProjectDetail = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  const [project, setProject] = useState<ProjectDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  // Memoized item generation for performance
  const generateAdditionalItems = useMemo(() => (existingItems: Item[]) => {
    const additionalItems = [
      {
        id: "project-1-item-4",
        name: "Hygiene Kit",
        description: "Personal care essentials for maintaining dignity and health",
        price: 12.99,
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        current: 3,
        needed: 20
      },
      {
        id: "project-1-item-5",
        name: "Warm Blanket",
        description: "Cozy blankets for comfort during cold nights",
        price: 24.99,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        current: 19,
        needed: 25
      },
      {
        id: "project-1-item-6",
        name: "Kitchen Starter Kit",
        description: "Basic cooking utensils and supplies for new homes",
        price: 35.00,
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        current: 8,
        needed: 15
      },
      {
        id: "project-1-item-7",
        name: "School Supplies",
        description: "Educational materials for children in transitional housing",
        price: 18.50,
        imageUrl: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400",
        current: 27,
        needed: 30
      },
      {
        id: "project-1-item-8",
        name: "Food Package",
        description: "Nutritious meal packages for families in need",
        price: 45.00,
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
        current: 12,
        needed: 40
      },
      {
        id: "project-1-item-9",
        name: "Clothing Bundle",
        description: "Essential clothing items for all family members",
        price: 32.00,
        imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
        current: 16,
        needed: 20
      },
      {
        id: "project-1-item-10",
        name: "Medical Kit",
        description: "Basic first aid and medical supplies",
        price: 28.50,
        imageUrl: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400",
        current: 2,
        needed: 18
      },
      {
        id: "project-1-item-11",
        name: "Baby Care Package",
        description: "Essential items for infants and toddlers",
        price: 42.00,
        imageUrl: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400",
        current: 6,
        needed: 12
      },
      {
        id: "project-1-item-12",
        name: "Job Interview Kit",
        description: "Professional attire and accessories for job interviews",
        price: 65.00,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        current: 14,
        needed: 22
      }
    ];
    return [...existingItems, ...additionalItems];
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("Fetching project with ID:", id);
        
        const foundProject = mockProjects.find(p => p.id === id);
        
        if (foundProject) {
          console.log("Found project:", foundProject);
          const projectWithMoreItems: ProjectDetailData = {
            ...foundProject,
            items: generateAdditionalItems((foundProject as any).items || [])
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
  }, [id, toast, generateAdditionalItems]);

  // Memoized callback for donation handling
  const handleDonateItem = useCallback((itemId: string, quantity: number) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to donate items",
        variant: "default"
      });
      return;
    }

    toast({
      title: "Thank you for your donation!",
      description: `You have pledged to donate ${quantity} item(s)`,
      variant: "default"
    });
  }, [user, toast]);

  if (loading) {
    return (
      <ProjectLayout>
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading project details...</div>
        </div>
      </ProjectLayout>
    );
  }

  if (!project) {
    return (
      <ProjectLayout>
        <div className="flex-grow flex items-center justify-center">
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
        </div>
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout>
      <ProjectHeader project={project} />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProjectAbout project={project} />
          
          <div className="space-y-6">
            <ProjectStats project={project} />
            <ProjectSidebar />
          </div>
        </div>

        <ProjectItemsSection 
          project={project} 
          onDonateItem={handleDonateItem} 
        />
      </div>
    </ProjectLayout>
  );
});

ProjectDetail.displayName = 'ProjectDetail';

export default ProjectDetail;