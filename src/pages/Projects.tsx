
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockCategories, mockProjects } from "@/data/mockData";

const Projects = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState(mockCategories);
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Simulate checking login status
  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || project.categoryId === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (categoryId: string | null) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Browse Projects</h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Discover charitable projects that need your support. Filter by category or search for specific needs.
            </p>
          </div>
        </div>
        
        {/* Categories Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Categories</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Button 
                variant={activeCategory === null ? "default" : "outline"} 
                onClick={() => handleCategoryChange(null)}
                className="w-full"
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button 
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category.id)}
                  className="w-full"
                >
                  {category.title}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold">Projects</h2>
              
              <div className="max-w-sm w-full">
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">No projects found matching your criteria</p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setActiveCategory(null);
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
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
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
