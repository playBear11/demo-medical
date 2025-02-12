"use client";
import React, { useState } from "react";
import Nav from "@/app/Components/nav";
import Menu from "@/app/Components/menu";

const page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Navigation */}
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Menu */}
        <div className={`w-56 ${isSidebarOpen ? "" : "hidden"}`}>
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>
      </div>
    </div>
  );
};

export default page;
