import { useEffect, useState } from "react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    alt: "People helping others"
  },
  {
    url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    alt: "Community volunteers working together"
  },
  {
    url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca",
    alt: "Hands coming together in unity"
  },
  {
    url: "https://images.unsplash.com/photo-1593113630400-ea4288922497",
    alt: "Donation and charity support"
  },
  {
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    alt: "Volunteers organizing donations"
  }
];

const HeroGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Main Gallery Container */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden elegant-shadow">
        {/* Background Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="text-white">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <p className="text-sm font-medium mb-1">Making Impact Together</p>
              <p className="text-xs opacity-90">{images[currentIndex].alt}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-8 rounded-md overflow-hidden border-2 transition-all duration-300 hover-scale ${
              index === currentIndex 
                ? "border-white/80 shadow-soft" 
                : "border-white/30 opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={images[index].url}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-1 mt-3">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-white/90"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroGallery;