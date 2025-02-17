"use client";
import { useState } from "react";
import Nav from "./nav";
import Menu from "./menu";
import AuthGuard from "../Hook/authenguard";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ค่าเริ่มต้นเปิด Sidebar

  return (
    <div className="flex h-screen">
        <AuthGuard>

      {/* Sidebar */}
      <Menu isSidebarOpen={isSidebarOpen} />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-hidden bg-gray-100 ">{children}</main>
      </div>
        </AuthGuard>
    </div>
  );
};

export default MainLayout;
