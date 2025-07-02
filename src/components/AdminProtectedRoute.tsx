import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import LoadingSpinner from '@/components/LoadingSpinner';

interface AdminProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'super_admin' | 'org_admin' | 'project_manager';
}

const AdminProtectedRoute = ({ children, requiredRole }: AdminProtectedRouteProps) => {
  const { loading, isAdmin, adminUser } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [loading, isAdmin, navigate]);

  useEffect(() => {
    if (!loading && isAdmin && requiredRole && adminUser) {
      const roleHierarchy = {
        'super_admin': 3,
        'org_admin': 2,
        'project_manager': 1
      };
      
      const userLevel = roleHierarchy[adminUser.role];
      const requiredLevel = roleHierarchy[requiredRole];
      
      if (userLevel < requiredLevel) {
        navigate('/admin/dashboard');
      }
    }
  }, [loading, isAdmin, adminUser, requiredRole, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  if (requiredRole && adminUser) {
    const roleHierarchy = {
      'super_admin': 3,
      'org_admin': 2,
      'project_manager': 1
    };
    
    const userLevel = roleHierarchy[adminUser.role];
    const requiredLevel = roleHierarchy[requiredRole];
    
    if (userLevel < requiredLevel) {
      return null;
    }
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;