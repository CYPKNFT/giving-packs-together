
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { useWebVitals } from "@/hooks/usePerformanceMonitor";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import MyDonations from "./pages/MyDonations";
import Profile from "./pages/Profile";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import StartProject from "./pages/StartProject";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminOrganization from "./pages/admin/AdminOrganization";
import { AdminProvider } from "./contexts/AdminContext";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const App = () => {
  useWebVitals();

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <MyDonations />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/start-project" element={<StartProject />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/organization" 
              element={
                <AdminProtectedRoute requiredRole="org_admin">
                  <AdminOrganization />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/projects" 
              element={
                <AdminProtectedRoute>
                  <AdminProjects />
                </AdminProtectedRoute>
              } 
            />
          </Routes>
        </AdminProvider>
      </TooltipProvider>
    </ErrorBoundary>
  );
};

export default App;
