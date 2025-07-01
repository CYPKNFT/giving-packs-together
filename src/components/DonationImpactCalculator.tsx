
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

  // Calculate progress percentage for visual effect
  const progressPercentage = Math.min((amount[0] / 500) * 100, 100);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="text-center pb-3">
        <CardTitle className="text-lg">Impact Calculator</CardTitle>
        <p className="text-xs text-gray-600">See your donation impact</p>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 space-y-4">
        {/* Amount Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-gray-700">Amount</label>
            <span className="text-2xl font-bold text-primary">${amount[0]}</span>
          </div>
          
          <Slider
            value={amount}
            onValueChange={setAmount}
            max={500}
            min={5}
            step={5}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>$5</span>
            <span>$500</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Progress to Max Impact</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary/60 to-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Impact Display */}
        <div className="bg-primary/5 p-3 rounded-lg flex-1 flex flex-col justify-center">
          <div className="text-primary font-semibold text-xs mb-2 text-center">Your Impact:</div>
          <div className="text-sm font-medium text-gray-800 leading-snug text-center">
            {calculateImpact(amount[0])}
          </div>
        </div>
        
        {/* Donate Button */}
        <Button 
          onClick={handleDonate}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-full text-sm"
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
