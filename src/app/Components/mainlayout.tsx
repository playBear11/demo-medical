"use client";
import { useState } from "react";
import Nav from "./nav";
import Menu from "./menu";
import AuthGuard from "../Hook/authenguard";
import FloatingChat from "@/app/Page/home/chat/page";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ค่าเริ่มต้นเปิด Sidebar
  const [isChatVisible, setIsChatVisible] = useState(true); // เปิดแชทตลอดเวลา

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <AuthGuard>
        {/* Navbar */}
        <Nav
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex flex-1 ">
          {/* Sidebar */}
          <Menu isSidebarOpen={isSidebarOpen} />

          {/* Main Content */}
          <main className="flex-1 p-4 bg-gray-100 h-screen overflow-auto">
            {children}

            {/* ✅ Floating Chat (แสดงตลอดเวลา) */}
            <FloatingChat
              isVisible={isChatVisible}
              onClose={() => setIsChatVisible(false)}
            />
          </main>
        </div>
      </AuthGuard>
    </div>
  );
};

export default MainLayout;
