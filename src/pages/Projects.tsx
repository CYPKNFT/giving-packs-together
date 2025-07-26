
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjects } from "@/hooks/queries/useProjects";
import { useCategories } from "@/hooks/queries/useCategories";

const Projects = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setActiveCategory(categoryId || null);
  }, [categoryId]);

  // Use React Query to fetch data
  const { data: projects = [], isLoading: projectsLoading } = useProjects({
    category: activeCategory || undefined
  });
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const loading = projectsLoading || categoriesLoading;

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleCategoryChange = (categoryId: string | null) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative py-32 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fade-in-up">Browse Projects</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              "Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done."
            </p>
            <p className="text-lg text-white/80 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              - Proverbs 19:17
            </p>
          </div>
        </section>
        
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
            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Loading projects...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
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
