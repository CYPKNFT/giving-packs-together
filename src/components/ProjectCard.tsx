
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  organization: string;
  itemsFulfilled: number;
  itemsNeeded: number;
}

const ProjectCard = ({
  id,
  title,
  description,
  imageUrl,
  organization,
  itemsFulfilled,
  itemsNeeded,
}: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">by {organization}</p>
        <p className="text-gray-600 line-clamp-3 mb-4">{description}</p>
        <ProgressBar 
          current={itemsFulfilled} 
          target={itemsNeeded} 
          label="Items Fulfilled" 
        />
      </CardContent>
      <CardFooter className="px-6 py-4 bg-gray-50 border-t">
        <Link
          to={`/projects/${id}`}
          className="text-white bg-primary hover:bg-primary-dark font-medium py-2 px-4 rounded w-full text-center"
        >
          View Project
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
