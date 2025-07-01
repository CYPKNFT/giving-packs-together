
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

interface PrimaryDonationCTAProps {
  variant?: "default" | "alternative";
  onDonate: () => void;
}

const PrimaryDonationCTA = ({ variant = "default", onDonate }: PrimaryDonationCTAProps) => {
  const buttonText = variant === "alternative" ? "Continue Your Impact" : "Make Another Donation";

  return (
    <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center">
          <Button 
            onClick={onDonate}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Heart className="w-5 h-5 mr-2" />
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrimaryDonationCTA;
