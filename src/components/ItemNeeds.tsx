
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

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4 items-start">
          <div className="w-16 h-16 flex-shrink-0">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
            <p className="text-gray-600 text-xs mb-2 line-clamp-2">{item.description}</p>
            <p className="text-primary font-medium text-xs mb-3">${item.price.toFixed(2)} per item</p>
            
            {/* Progress Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">{item.current}/{item.needed} collected</span>
                <span className={`font-medium px-2 py-1 rounded text-white text-xs ${
                  percentage < 25 ? 'bg-red-500' :
                  percentage < 50 ? 'bg-orange-500' :
                  percentage < 75 ? 'bg-yellow-600' : 'bg-green-500'
                }`}>
                  {getProgressStatus()}
                </span>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="absolute right-0 -top-5 text-xs font-medium text-gray-700">
                  {percentage}%
                </span>
              </div>
            </div>
            
            <div className="flex justify-end mt-3">
              <Button 
                onClick={handleDonate}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-xs px-3 py-1 h-7"
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemNeeds;
