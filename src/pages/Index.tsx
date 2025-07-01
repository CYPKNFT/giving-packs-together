
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactStoriesSection from "@/components/ImpactStoriesSection";
import { mockCategories, mockFeaturedProjects } from "@/data/mockData";

const Index = () => {
  const categories = [
    {
      name: "Education",
      description: "Support projects that provide access to quality education for all.",
      image: "https://images.unsplash.com/photo-1550048210-8c4eb9c4ca9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
    },
    {
      name: "Healthcare",
      description: "Fund initiatives that improve healthcare services and access for underserved communities.",
      image: "https://images.unsplash.com/photo-1532938314630-e9bc9a7ca7a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Environment",
      description: "Invest in projects that protect our planet and promote sustainable living.",
      image: "https://images.unsplash.com/photo-1488859033259-9836995ebcc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Poverty Alleviation",
      description: "Contribute to programs that empower individuals and families to overcome poverty.",
      image: "https://images.unsplash.com/photo-1518369886546-7963c144eb9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2147&q=80",
    },
  ];

  const featuredProjects = mockFeaturedProjects || [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Explore Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockCategories.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  id={category.id}
                  title={category.title}
                  description={category.description}
                  imageUrl={category.imageUrl}
                  projectCount={category.projectCount}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
              <Button asChild variant="outline">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  organization={project.organization}
                  itemsFulfilled={project.itemsFulfilled}
                  itemsNeeded={project.itemsNeeded}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stories Section */}
        <ImpactStoriesSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
