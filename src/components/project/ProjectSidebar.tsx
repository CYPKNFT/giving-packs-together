import DonationImpactCalculator from "@/components/DonationImpactCalculator";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const ProjectSidebar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="animate-fade-in">
        <DonationImpactCalculator />
      </div>
      <div className="animate-fade-in">
        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default ProjectSidebar;