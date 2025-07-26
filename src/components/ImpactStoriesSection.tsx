
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StoryCard from "./StoryCard";

const ImpactStoriesSection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mock data - in real app this would come from API
  const stories = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1494790108755-2616c58e6d0b",
      quote: "Thanks to the donations, I now have access to clean water and my children can go to school instead of walking miles to fetch water.",
      beneficiaryName: "Maria Santos",
      donationLink: "/projects/water-access"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      quote: "The school supplies program helped me pursue my education. I'm now studying to become a teacher to help others in my community.",
      beneficiaryName: "Ahmed Hassan",
      donationLink: "/projects/education"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      quote: "The food assistance program helped my family during difficult times. Now I volunteer to help distribute food to other families in need.",
      beneficiaryName: "Sarah Johnson",
      donationLink: "/projects/food-security"
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentStory((prev) => (prev + 1) % stories.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, stories.length]);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Impact Stories</h2>
            <p className="text-gray-600">See how your donations are making a real difference</p>
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story, index) => (
                <div key={story.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <StoryCard {...story} />
                </div>
              ))}
            </div>
            
          </div>
          
          
          <div className="text-center mt-8">
            <Button variant="outline">
              See More Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStoriesSection;
