import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProjectDetailData } from "@/types";
import { memo } from "react";

interface ProjectHeaderProps {
  project: ProjectDetailData;
}

const ProjectHeader = memo(({ project }: ProjectHeaderProps) => {
  const progressPercentage = Math.min(
    Math.round(((project.itemsFulfilled || 0) / (project.itemsNeeded || 1)) * 100), 
    100
  );
  return (
    <>
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
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

ProjectHeader.displayName = 'ProjectHeader';

export default ProjectHeader;