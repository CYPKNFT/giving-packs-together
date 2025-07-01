
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
      { threshold: 5, text: "Provides 1 meal for a family in need" },
      { threshold: 10, text: "Supplies school materials for 1 child" },
      { threshold: 25, text: "Provides 5 meals and clean water for a week" },
      { threshold: 50, text: "Funds medical supplies for 3 families" },
      { threshold: 100, text: "Supports a child's education for a month" },
      { threshold: 200, text: "Provides emergency shelter for a family" },
      { threshold: 500, text: "Funds a complete education program for 5 children" }
    ];

    const matchingImpact = impacts.reverse().find(impact => donationAmount >= impact.threshold);
    return matchingImpact?.text || "Every dollar makes a difference";
  };

  const handleDonate = () => {
    // In a real app, this would redirect to donation form with pre-filled amount
    console.log(`Donating $${amount[0]}`);
    // For now, scroll to top where the main CTA is
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Impact Calculator</CardTitle>
              <p className="text-gray-600">See how much difference your donation can make</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium">Donation Amount</label>
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
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$5</span>
                  <span>$500</span>
                </div>
              </div>
              
              <div className="bg-primary/10 p-6 rounded-lg text-center">
                <div className="text-primary font-semibold mb-2">Your Impact:</div>
                <div className="text-lg font-medium text-gray-800">
                  {calculateImpact(amount[0])}
                </div>
              </div>
              
              <Button 
                onClick={handleDonate}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-full"
                size="lg"
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate ${amount[0]}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DonationImpactCalculator;
