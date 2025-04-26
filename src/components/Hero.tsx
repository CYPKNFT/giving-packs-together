
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary-light to-primary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Make a Difference, One Pack at a Time
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8">
              Help provide essential items to those in need. Our platform connects donors with charitable organizations to fulfill specific needs efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Link to="/projects">Browse Projects</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
              alt="People helping others" 
              className="rounded-lg shadow-lg max-w-full md:max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
