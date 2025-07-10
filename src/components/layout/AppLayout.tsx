import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopNavigation } from "./TopNavigation";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopNavigation />
          <main className="flex-1 p-6 bg-secondary/30">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}