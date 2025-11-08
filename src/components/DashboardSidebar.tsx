import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  Building2,
  Scale,
  ClipboardList,
  Newspaper,
  Calendar,
  MapPin,
  FolderOpen,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sidebarData } from '@/data/mockData';
import gadLogo from '@/assets/gad-logo.png';

const iconMap = {
  home: Home,
  building: Building2,
  scale: Scale,
  'clipboard-list': ClipboardList,
  newspaper: Newspaper,
  calendar: Calendar,
  'map-pin': MapPin,
  'folder-open': FolderOpen,
  'bar-chart-3': BarChart3,
  settings: Settings,
};

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    // Handle query params
    const pathWithoutQuery = path.split('?')[0];
    const currentPathWithoutQuery = currentPath.split('?')[0];
    return currentPathWithoutQuery === pathWithoutQuery || currentPath.startsWith(pathWithoutQuery + '/');
  };
  const isGroupActive = (item: any) => {
    if (item.path) return isActive(item.path);
    if (item.children) {
      return item.children.some((child: any) => isActive(child.path));
    }
    return false;
  };

  const getNavClasses = (path: string) =>
    cn(
      "transition-colors duration-200",
      isActive(path)
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    );

  return (
    <Sidebar className={cn("border-r border-sidebar-border", collapsed ? "w-14" : "w-64")}>
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center">
              <img 
                src={gadLogo} 
                alt="GAD Membrillal Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground text-sm">
                  GAD Membrillal
                </h2>
                <p className="text-xs text-sidebar-foreground/60">
                  Sistema Admin
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-2">
          <SidebarGroup>
            <SidebarMenu className="space-y-1">
              {sidebarData.map((item, index) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap] || Home;
                const hasChildren = item.children && item.children.length > 0;
                const groupActive = isGroupActive(item);

                if (hasChildren) {
                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        className={cn(
                          "w-full justify-between transition-colors duration-200",
                          groupActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && (
                            <span className="text-sm font-medium">{item.title}</span>
                          )}
                        </div>
                        {!collapsed && (
                          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        )}
                      </SidebarMenuButton>

                      {/* Submenu */}
                      {!collapsed && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border/30 pl-4">
                          {item.children.map((child, childIndex) => (
                            <SidebarMenuButton key={childIndex} asChild>
                              <NavLink
                                to={child.path}
                                className={cn(
                                  "text-sm py-2 px-3 rounded-md block",
                                  getNavClasses(child.path)
                                )}
                              >
                                {child.title}
                              </NavLink>
                            </SidebarMenuButton>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 py-2 px-3 rounded-md",
                          getNavClasses(item.path)
                        )}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && (
                          <span className="text-sm font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;