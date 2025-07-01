
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects, mockCategories } from "@/data/mockData";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Helper function to get category name from categoryId
  const getCategoryName = (categoryId: string) => {
    const category = mockCategories.find(cat => cat.id === categoryId);
    return category ? category.title : "Unknown";
  };

  const filteredProjects = projects?.filter(project => {
    const categoryName = getCategoryName(project.categoryId);
    const searchMatch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = categoryFilter === "All" || categoryName === categoryFilter;
    return searchMatch && categoryMatch;
  });

  const categories = ["All", ...new Set(projects?.map(project => getCategoryName(project.categoryId)))];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <Link to="/admin/create-project">
            <Button><Plus className="mr-2" /> Create New Project</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map(project => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>by {project.organization}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge>{getCategoryName(project.categoryId)}</Badge>
                <p>{project.description.substring(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Link to={`/projects/${project.id}`}>
                      <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
