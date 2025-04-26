
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";

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

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 grid md:grid-cols-5 gap-4 items-center">
        <div className="md:col-span-1">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full aspect-square object-cover rounded-md"
          />
        </div>
        <div className="md:col-span-2">
          <h4 className="text-lg font-bold">{item.name}</h4>
          <p className="text-gray-600 mt-1">{item.description}</p>
          <p className="text-primary font-semibold mt-2">${item.price.toFixed(2)} per item</p>
        </div>
        <div className="md:col-span-2">
          <ProgressBar 
            current={item.current} 
            target={item.needed}
          />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleDonate}
              className="bg-primary hover:bg-primary-dark"
            >
              Donate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemNeeds;
