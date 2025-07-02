import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Phone, Map, ExternalLink } from "lucide-react";
import { ProjectDetailData } from "@/types";
import { memo } from "react";

interface ProjectAboutProps {
  project: ProjectDetailData;
}

const ProjectAbout = memo(({ project }: ProjectAboutProps) => {
  return (
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
  );
});

ProjectAbout.displayName = 'ProjectAbout';

export default ProjectAbout;