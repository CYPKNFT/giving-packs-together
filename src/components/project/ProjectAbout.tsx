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
      <Card className="h-full overflow-hidden">
        {/* Hero Image */}
        <div className="h-48 relative overflow-hidden">
          <img
            src={project.imageUrl || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"}
            alt={`${project.organization} project`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white mb-2">About {project.organization}</h3>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Contact and Location Info */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
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
              
              {project.organizationWebsite && (
                <Button asChild size="sm" className="w-fit">
                  <a href={project.organizationWebsite} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>
            
            {/* Project Details as Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="px-3 py-1">
                <MapPin className="w-3 h-3 mr-1" />
                {project.location || "Lincoln Elementary School, Downtown District"}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Users className="w-3 h-3 mr-1" />
                {project.beneficiaries || "450 students aged 6-12"}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Calendar className="w-3 h-3 mr-1" />
                {project.timeline || "6 months setup, ongoing program"}
              </Badge>
              <Link 
                to={`/projects?category=${project.categoryId || 'general'}`}
                className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors hover:bg-primary/10 text-primary"
              >
                Category: {project.category || project.categoryId || 'Education'}
              </Link>
            </div>
          </div>

          {/* Main Description */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-900">Our Mission</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                {project.aboutText || "Ensuring every child has access to quality education and learning materials."}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {project.organizationDescription || "Our organization is dedicated to breaking down barriers to education and creating opportunities for every child to succeed. Through community partnerships and innovative programs, we provide essential resources, mentorship, and support services that empower students to reach their full potential. We believe that education is the foundation for building stronger communities and creating lasting positive change."}
              </p>
            </div>
            
            {/* Additional Project Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-900 mb-2">Project Impact</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Items Needed:</span>
                  <span className="ml-2 font-medium">{project.itemsNeeded}</span>
                </div>
                <div>
                  <span className="text-gray-600">Items Fulfilled:</span>
                  <span className="ml-2 font-medium text-green-600">{project.itemsFulfilled}</span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 font-medium capitalize">{project.status || 'Active'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Priority:</span>
                  <span className="ml-2 font-medium capitalize">{project.urgency || 'Medium'}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

ProjectAbout.displayName = 'ProjectAbout';

export default ProjectAbout;