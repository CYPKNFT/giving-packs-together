import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Building2,
  FolderPlus,
  Package,
  Heart,
  BarChart3,
  Settings,
  Users,
  FileText,
  Bell
} from "lucide-react";

const AdminSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50";

  const mainMenuItems = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      title: "Organization",
      url: "/admin/organization",
      icon: Building2,
      badge: null
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: FolderPlus,
      badge: "3"
    },
    {
      title: "Items & Needs",
      url: "/admin/items",
      icon: Package,
      badge: null
    },
    {
      title: "Donations",
      url: "/admin/donations",
      icon: Heart,
      badge: "12"
    }
  ];

  const analyticsItems = [
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
      badge: null
    },
    {
      title: "Reports",
      url: "/admin/reports",
      icon: FileText,
      badge: null
    }
  ];

  const managementItems = [
    {
      title: "Team Members",
      url: "/admin/team",
      icon: Users,
      badge: null
    },
    {
      title: "Notifications",
      url: "/admin/notifications",
      icon: Bell,
      badge: "5"
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
      badge: null
    }
  ];

  const isExpanded = mainMenuItems.some((item) => isActive(item.url)) ||
                   analyticsItems.some((item) => isActive(item.url)) ||
                   managementItems.some((item) => isActive(item.url));

  const SidebarMenuItems = ({ items }: { items: typeof mainMenuItems }) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink to={item.url} end className={getNavCls}>
              <item.icon className="mr-2 h-4 w-4" />
              {!collapsed && (
                <>
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white border-r">
        {/* Logo Section */}
        <div className="p-6 border-b">
          {!collapsed ? (
            <div>
              <h2 className="text-lg font-bold text-primary">GivingPacks</h2>
              <p className="text-sm text-muted-foreground">Admin Portal</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">GP</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItems items={mainMenuItems} />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItems items={analyticsItems} />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItems items={managementItems} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;