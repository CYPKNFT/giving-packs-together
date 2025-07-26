
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
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-r from-primary to-primary-dark text-white elegant-shadow border-t border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="animate-pulse-glow">
                <Target className="w-6 h-6 text-primary-glow" />
              </div>
              <div className="bg-gradient-to-r from-white/20 to-white/10 px-3 py-1 rounded-full border border-white/30">
                <span className="font-bold text-sm">URGENT CHALLENGE</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg">Emergency Food Relief Drive</h3>
              <p className="text-sm text-white/90">
                Help us reach our goal • {timeLeft} remaining
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(progress)}%</div>
              <div className="text-xs text-white/75">Complete</div>
            </div>
            
            <div className="hidden md:block">
              <div className="w-40 bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-glow to-white smooth-transition"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs mt-1 text-center text-white/75">
                ${remaining.toLocaleString()} needed
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-bold hover-lift smooth-transition px-6"
            >
              Donate Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyBanner;
