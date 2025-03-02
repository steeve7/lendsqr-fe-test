// app/dashboard/layout.tsx
"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar"; // your sidebar component
import Header from "@/components/Header"; // your sidebar component

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="h-screen flex flex-col">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-row h-screen">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6 h-[180vh]">{children}</main>
      </div>
    </div>
  );
}
