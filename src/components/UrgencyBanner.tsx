
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Clock, Target } from "lucide-react";

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
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white shadow-lg border-t border-white/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="animate-pulse">
                <Zap className="w-5 h-5 text-yellow-300" />
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white font-bold border-white/30">
                🎯 CHALLENGE
              </Badge>
            </div>
            <div>
              <span className="font-bold text-lg">
                {matchingFund ? "🚀 Double Impact Challenge!" : "🎯 Final Sprint!"}
              </span>
              <p className="text-sm opacity-90">
                {matchingFund 
                  ? "Every $ = $2 impact until " + new Date(endDate).toLocaleDateString()
                  : `Join the mission to reach $${targetAmount.toLocaleString()}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-center">
              <Clock className="w-4 h-4" />
              <div>
                <div className="text-lg font-bold">{timeLeft}</div>
                <div className="text-xs opacity-75">left</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <Target className="w-4 h-4" />
              <div className="w-32">
                <Progress value={progress} className="bg-white/20 h-2" />
                <div className="text-xs mt-1 text-center">
                  ${remaining.toLocaleString()} to go
                </div>
              </div>
            </div>

            <Button 
              size="sm" 
              className="bg-white text-orange-600 hover:bg-white/90 font-bold"
            >
              Join Challenge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyBanner;
