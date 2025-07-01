
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  current: number;
  needed: number;
}

interface ItemNeedsProps {
  item: Item;
  onDonate: (itemId: string, quantity: number) => void;
}

const ItemNeeds = ({ item, onDonate }: ItemNeedsProps) => {
  const handleDonate = () => {
    onDonate(item.id, 1);
  };

  const percentage = Math.min(Math.round((item.current / item.needed) * 100), 100);
  
  const getProgressColor = () => {
    if (percentage < 25) return "bg-red-500";
    if (percentage < 50) return "bg-orange-500";
    if (percentage < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getProgressStatus = () => {
    if (percentage < 25) return "Urgent";
    if (percentage < 50) return "Low";
    if (percentage < 75) return "Moderate";
    return "Well Stocked";
  };

  const getStatusColor = () => {
    if (percentage < 25) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    if (percentage < 75) return 'bg-yellow-600';
    return 'bg-green-500';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Image Section - Removed hover scale */}
        <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-300"
          />
        </div>
        
        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          <h4 className="font-bold text-lg mb-2">{item.name}</h4>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">{item.description}</p>
          <p className="text-primary font-bold text-lg mb-4">${item.price.toFixed(2)} per item</p>
          
          {/* Progress Section */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-medium">
                {item.current}/{item.needed} collected
              </span>
              <span className={`font-bold px-3 py-1 rounded-full text-white text-xs ${getStatusColor()}`}>
                {getProgressStatus()}
              </span>
            </div>
            
            {/* Custom Progress Bar */}
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="absolute right-2 top-0 text-xs font-bold text-white leading-4">
                {percentage}%
              </span>
            </div>
          </div>
          
          {/* Donate Button */}
          <Button 
            onClick={handleDonate}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
          >
            <span className="mr-2">💝</span> Donate Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemNeeds;
