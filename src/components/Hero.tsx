import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-hero py-16 md:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce-in"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-fade-in"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up">
              Make a Difference, One Pack at a Time
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Help provide essential items to those in need. Our platform connects donors with charitable organizations to fulfill specific needs efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 hover-lift smooth-transition shadow-soft"
              >
                <Link to="/projects">Browse Projects</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="glass-effect border-white text-white hover:bg-white hover:text-primary smooth-transition"
              >
                <Link to="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-scale-in" style={{animationDelay: '0.6s'}}>
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
              alt="People helping others" 
              className="rounded-lg elegant-shadow max-w-full md:max-w-md hover-scale smooth-transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
