
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "Winter Care Packages",
      description: "Providing essential winter items for homeless individuals.",
      status: "active",
      itemsNeeded: 120,
      itemsFulfilled: 48
    },
    {
      id: "2",
      title: "Back to School Supplies",
      description: "School supplies for underprivileged children.",
      status: "active",
      itemsNeeded: 200,
      itemsFulfilled: 150
    }
  ]);

  useEffect(() => {
    // Check if user is logged in and admin
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isAdminUser = localStorage.getItem("isAdmin") === "true";
    
    if (!isLoggedIn || !isAdminUser) {
      toast({
        title: "Access denied",
        description: "You must be logged in as an admin to view this page.",
        variant: "destructive",
      });
      navigate("/login");
    } else {
      setIsAdmin(true);
    }
  }, [navigate, toast]);

  const handleCreateProject = () => {
    navigate("/admin/create-project");
  };

  const handleEditProject = (id: string) => {
    navigate(`/admin/edit-project/${id}`);
  };

  if (!isAdmin) {
    return null; // Don't render anything until we've verified admin status
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={true} isAdmin={true} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleCreateProject} className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Create Project
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-primary/5 border-dashed border-2 border-primary/20 hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center h-64" onClick={handleCreateProject}>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <PlusCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold">Create New Project</h3>
              <p className="text-gray-600 mt-2">Add a new donation project</p>
            </CardContent>
          </Card>
          
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className="font-medium capitalize">{project.status}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Items Needed:</span>
                    <span className="font-medium">{project.itemsNeeded}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Items Fulfilled:</span>
                    <span className="font-medium">{project.itemsFulfilled}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${Math.min(100, (project.itemsFulfilled / project.itemsNeeded) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleEditProject(project.id)}
                >
                  Edit Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
