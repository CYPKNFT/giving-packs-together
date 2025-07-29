
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Category } from "@/types";
import ProgressBar from "@/components/ProgressBar";

interface CategoryCardProps extends Omit<Category, 'created_at' | 'updated_at'> {
  // Inherits all Category properties except timestamps
}

const CategoryCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  projectCount 
}: CategoryCardProps) => {
  // Calculate estimated people supported (varies by category)
  const estimatedPeopleSupported = projectCount * Math.floor(Math.random() * 50 + 20); // 20-70 people per project
  const totalGoal = projectCount * 80; // Target of 80 people per project
  
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="h-56 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {projectCount} Active Projects
          </span>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        
        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Impact Progress</span>
            <span className="text-sm text-muted-foreground">
              {estimatedPeopleSupported} people supported
            </span>
          </div>
          <ProgressBar 
            current={estimatedPeopleSupported} 
            target={totalGoal}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{projectCount}</span> projects active
          </div>
          <Link 
            to={`/projects/category/${id}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
