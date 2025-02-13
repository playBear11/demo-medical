"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ใช้สำหรับ App Router
import { LogOut, Bell, MenuIcon, Settings } from "lucide-react";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Nav: React.FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const router = useRouter(); // ใช้ Next.js Router

  const handleLogout = () => {
    router.push("/Page/auth/login"); // เปลี่ยนเส้นทางไปยังหน้า Login
  };

  const handleSettings = () => {
    setIsSettingOpen(true);
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="bg-indigo-200 shadow-md px-4 py-1 flex items-center justify-between">
      <div className="flex items-center">
      {/**   <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mr-4 text-black hover:text-blue-600"
        >
          <MenuIcon className="w-6 h-6" />
        </button>*/}
        <div>
          <img
            src="https://shorturl.asia/W1qXH"
            alt="โลโก้"
            className="h-12 mr-2"
            style={{ imageRendering: "crisp-edges" }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-blue-600">
          <Bell className="w-6 h-6" />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="https://shorturl.asia/1NPwK"
              alt="Profile"
              className="w-14 h-14 rounded-full cursor-pointer"
            />
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={handleSettings}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <Settings className="inline-block w-4 h-4 mr-2" />
                ตั้งค่า
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <LogOut className="inline-block w-4 h-4 mr-2" />
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;