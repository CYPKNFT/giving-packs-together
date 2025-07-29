
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StoryCard from "./StoryCard";

const ImpactStoriesSection = () => {
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
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0",
      quote: "The educational scholarship program enabled me to complete my studies and now I'm giving back to my community as a nurse.",
      beneficiaryName: "David Kim",
      donationLink: "/projects/education"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca",
      quote: "Thanks to the housing assistance program, my family finally has a safe place to call home.",
      beneficiaryName: "Ana Rodriguez",
      donationLink: "/projects/housing"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Impact Stories</h2>
            <p className="text-gray-600">See how your donations are making a real difference</p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {stories.map((story) => (
                <CarouselItem key={story.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <StoryCard {...story} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
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
