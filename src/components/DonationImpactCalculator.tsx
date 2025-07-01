
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Heart } from "lucide-react";

const DonationImpactCalculator = () => {
  const [amount, setAmount] = useState([25]);

  // Mock impact calculations - in real app this would come from API
  const calculateImpact = (donationAmount: number) => {
    const impacts = [
      { threshold: 5, text: "Provides 1 meal for a family" },
      { threshold: 10, text: "School materials for 1 child" },
      { threshold: 25, text: "5 meals + clean water/week" },
      { threshold: 50, text: "Medical supplies for 3 families" },
      { threshold: 100, text: "Child's education for a month" },
      { threshold: 200, text: "Emergency shelter for family" },
      { threshold: 500, text: "Education program for 5 children" }
    ];

    const matchingImpact = impacts.reverse().find(impact => donationAmount >= impact.threshold);
    return matchingImpact?.text || "Every dollar makes a difference";
  };

  const handleDonate = () => {
    console.log(`Donating $${amount[0]}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Card className="h-full">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg">Impact Calculator</CardTitle>
        <p className="text-xs text-gray-600">See your donation impact</p>
      </CardHeader>
      <CardContent className="space-y-4 h-full flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-medium">Amount</label>
            <span className="text-xl font-bold text-primary">${amount[0]}</span>
          </div>
          <Slider
            value={amount}
            onValueChange={setAmount}
            max={500}
            min={5}
            step={5}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$5</span>
            <span>$500</span>
          </div>
        </div>
        
        <div className="bg-primary/10 p-4 rounded-lg text-center flex-1 flex flex-col justify-center">
          <div className="text-primary font-semibold text-xs mb-2">Your Impact:</div>
          <div className="text-sm font-medium text-gray-800 leading-tight">
            {calculateImpact(amount[0])}
          </div>
        </div>
        
        <Button 
          onClick={handleDonate}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-full text-sm"
          size="sm"
        >
          <Heart className="w-4 h-4 mr-2" />
          Donate ${amount[0]}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DonationImpactCalculator;
