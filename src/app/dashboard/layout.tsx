"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, selectIsSidebarOpen } from "@/redux/sidebarSlice";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  return (
    <div className="h-screen flex flex-col">
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => dispatch(toggleSidebar())}
      />
      <div className="flex flex-row">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => dispatch(toggleSidebar())}
        />
        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  );
}
