import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Plus, 
  QrCode, 
  BarChart3, 
  Users, 
  CreditCard, 
  Eye,
  HelpCircle 
} from "lucide-react";
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
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Create New", url: "/create", icon: Plus },
  { title: "My QR Codes", url: "/qr-codes", icon: QrCode },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "User Management", url: "/users", icon: Users },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "View Plan", url: "/plans", icon: Eye },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/");
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 transition-colors";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-card border-r">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-xl text-foreground">QRGen Pro</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-muted-foreground font-medium">
            {!isCollapsed && "Main Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      className={getNavCls({ isActive: isActive(item.url) })}
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}