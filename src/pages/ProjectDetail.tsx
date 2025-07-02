import { useParams } from "react-router-dom";
import { useCallback, memo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProject } from "@/hooks/queries/useProject";
import { useDonation } from "@/hooks/mutations/useDonation";

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
  
  // Use React Query to fetch project data
  const { data: project, isLoading: loading, error } = useProject(id || '');
  const donationMutation = useDonation();

  // Handle error from React Query
  if (error) {
    console.error("Error fetching project:", error);
    toast({
      title: "Error",
      description: "Failed to load project details",
      variant: "destructive"
    });
  }

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

    if (!project) return;

    donationMutation.mutate({
      project_id: project.id,
      item_id: itemId,
      quantity: quantity,
      notes: `Donation of ${quantity} item(s)`
    });
  }, [user, toast, project, donationMutation]);

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