
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectCount: number;
}

const CategoryCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  projectCount 
}: CategoryCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
        <span className="text-sm text-gray-500">{projectCount} Projects</span>
        <Link 
          to={`/projects/category/${id}`}
          className="text-primary hover:text-primary-dark font-medium"
        >
          View Projects
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
