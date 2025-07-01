
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface StoryCardProps {
  image: string;
  quote: string;
  beneficiaryName: string;
  donationLink: string;
}

const StoryCard = ({ image, quote, beneficiaryName, donationLink }: StoryCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={image} 
            alt={beneficiaryName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">{beneficiaryName}</h4>
            <p className="text-sm text-gray-600">Beneficiary</p>
          </div>
        </div>
        <blockquote className="flex-grow text-gray-700 italic mb-4">
          "{quote}"
        </blockquote>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open(donationLink, '_blank')}
          className="w-full"
        >
          <Heart className="w-4 h-4 mr-2" />
          Support Similar Projects
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
