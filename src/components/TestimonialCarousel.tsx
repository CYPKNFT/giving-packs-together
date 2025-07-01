
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "This organization changed my family's life. The support we received helped us through our darkest times.",
    author: "Sarah M.",
    role: "Beneficiary"
  },
  {
    id: 2,
    text: "Volunteering here has been incredibly rewarding. Seeing the direct impact of our work is amazing.",
    author: "James L.",
    role: "Volunteer"
  },
  {
    id: 3,
    text: "The transparency and dedication of this team gives me confidence in every donation I make.",
    author: "Maria K.",
    role: "Donor"
  },
  {
    id: 4,
    text: "They don't just provide help, they provide hope. The care they show is truly Christ-like.",
    author: "Robert D.",
    role: "Community Member"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-4">
            <Quote className="w-8 h-8 text-primary mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Community Voices</h3>
          </div>
          
          <blockquote className="text-gray-700 text-sm leading-relaxed mb-4 flex-1 flex items-center">
            <p className="italic">"{currentTestimonial.text}"</p>
          </blockquote>
          
          <div className="text-center">
            <p className="font-semibold text-gray-800">{currentTestimonial.author}</p>
            <p className="text-xs text-gray-500">{currentTestimonial.role}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAutoPlaying(true), 5000);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCarousel;
