
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactStoriesSection from "@/components/ImpactStoriesSection";
import { useProjects } from "@/hooks/queries/useProjects";
import { useCategories } from "@/hooks/queries/useCategories";

const Index = () => {
  // Use React Query to fetch data
  const { data: featuredProjects = [], isLoading: projectsLoading } = useProjects({ limit: 3 });
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const loading = projectsLoading || categoriesLoading;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Explore Categories</h2>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">Loading categories...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
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
            )}
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
            {loading ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">Loading featured projects...</p>
              </div>
            ) : (
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
            )}
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
