
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Sparkles, TrendingUp, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const CommunitySpotlight = () => {
  const [currentHighlight, setCurrentHighlight] = useState(0);

  const highlights = [
    {
      type: "milestone",
      icon: Users,
      title: "Community Milestone!",
      description: "Together we've reached 1,000 lives changed this month",
      cta: "See Impact Stories",
      link: "/projects",
      color: "from-blue-500 to-purple-600"
    },
    {
      type: "trending",
      icon: TrendingUp,
      title: "Trending Project",
      description: "School Supplies Drive is 85% funded - help finish it!",
      cta: "Complete Project",
      link: "/projects/project-1",
      color: "from-green-500 to-teal-600"
    },
    {
      type: "gratitude",
      icon: Heart,
      title: "Thank You!",
      description: "Your generosity is creating ripples of hope worldwide",
      cta: "Continue Impact",
      link: "/projects",
      color: "from-pink-500 to-rose-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % highlights.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = highlights[currentHighlight];
  const IconComponent = current.icon;

  return (
    <div className="my-8">
      <Card className={`border-0 bg-gradient-to-r ${current.color} text-white shadow-lg overflow-hidden relative`}>
        <div className="absolute inset-0 bg-black/10" />
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Community
                  </Badge>
                </div>
                <h3 className="text-lg font-bold mb-1">{current.title}</h3>
                <p className="text-white/90 text-sm">{current.description}</p>
              </div>
            </div>
            
            <Button 
              asChild
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Link to={current.link}>
                {current.cta}
              </Link>
            </Button>
          </div>
          
          {/* Progress indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {highlights.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentHighlight ? 'bg-white' : 'bg-white/40'
                }`}
                onClick={() => setCurrentHighlight(index)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunitySpotlight;
