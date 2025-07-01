
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface UrgencyBannerProps {
  show: boolean;
  endDate: string;
  matchingFund?: boolean;
  currentAmount?: number;
  targetAmount?: number;
}

const UrgencyBanner = ({ 
  show, 
  endDate, 
  matchingFund = true, 
  currentAmount = 15000, 
  targetAmount = 50000 
}: UrgencyBannerProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft("Expired");
      }
    };

    if (show) {
      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
      return () => clearInterval(timer);
    }
  }, [show, endDate]);

  if (!show) return null;

  const progress = (currentAmount / targetAmount) * 100;
  const remaining = targetAmount - currentAmount;

  return (
    <div className="sticky top-32 z-30 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-white text-orange-600 font-bold">
                URGENT
              </Badge>
              <span className="font-bold text-lg">
                {matchingFund ? "Double Your Impact!" : "Campaign Ending Soon!"}
              </span>
            </div>
            <p className="text-sm opacity-90">
              {matchingFund 
                ? "All donations matched until " + new Date(endDate).toLocaleDateString()
                : `Help us reach our goal of $${targetAmount.toLocaleString()}`}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft}</div>
              <div className="text-xs opacity-75">remaining</div>
            </div>
            
            <div className="hidden md:block w-40">
              <Progress value={progress} className="bg-white/20" />
              <div className="text-xs mt-1 text-center">
                ${remaining.toLocaleString()} to go
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyBanner;
