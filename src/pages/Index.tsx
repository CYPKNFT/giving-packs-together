
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { mockCategories, mockFeaturedProjects } from "@/data/mockData";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [featuredCategories, setFeaturedCategories] = useState(mockCategories.slice(0, 3));
  const [featuredProjects, setFeaturedProjects] = useState(mockFeaturedProjects);

  // Simulate checking login status
  useEffect(() => {
    // In a real app, you would check if the user is logged in
    setIsLoggedIn(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse Categories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore different types of charitable projects and find causes that resonate with you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCategories.map((category) => (
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
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/projects">View All Categories</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Projects Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These projects are currently in urgent need of support. Your contribution can make a significant impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform makes it easy to connect donors with charitable organizations in need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Browse Projects</h3>
                <p className="text-gray-600">
                  Explore different categories and find projects that align with your values.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Choose Items</h3>
                <p className="text-gray-600">
                  Select specific items to donate or contribute money for organizations to purchase needed supplies.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Make an Impact</h3>
                <p className="text-gray-600">
                  Your donations go directly to fulfilling specific needs, and you can track their impact.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join our community of donors and help provide essential items to those in need. Every contribution matters.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
