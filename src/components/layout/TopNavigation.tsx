import { useState } from "react";
import { Bell, Search, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

export function TopNavigation() {
  const initialNotifications = [
    { type: "plan", message: "Your Premium Plan expires on Dec 31, 2024.", time: "2 days left" },
    { type: "user", message: "User John Doe added.", time: "Just now" },
    { type: "user", message: "Role 'Admin' assigned to Jane Smith.", time: "5 min ago" },
    { type: "user", message: "Invitation accepted by Alex Brown.", time: "1 hour ago" },
    { type: "user", message: "User Emily Clark removed.", time: "Yesterday" },
  ];
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialNotifications.length);

  // Simulate receiving a new notification
  const addNotification = (note) => {
    setNotifications((prev) => [note, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  // Example: Call addNotification to simulate a new notification
  // addNotification({ type: "user", message: "New user invited.", time: "Now" });

  const handleBellClick = () => {
    setShowNotifications((v) => !v);
    if (!showNotifications && unreadCount > 0) {
      setUnreadCount(0); // Mark notifications as read when opening dropdown
    }
  };

  return (
    <header className="h-16 bg-card border-b flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search QR codes..." 
            className="pl-10 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative" onClick={handleBellClick}>
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-background border border-muted rounded-lg shadow-lg z-40">
              <div className="p-4 border-b border-muted font-semibold text-lg flex justify-between items-center">
                Notifications
                <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                  Close
                </Button>
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="p-4 text-muted-foreground">No notifications</li>
                ) : (
                  notifications.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-4 hover:bg-muted/20 transition-colors">
                      <span className={`w-2 h-2 rounded-full mt-2 ${note.type === 'plan' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                      <div>
                        <div className="text-sm text-foreground">{note.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">{note.time}</div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-muted-foreground">john@example.com</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}