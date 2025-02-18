"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Bell,
  MenuIcon,
  Settings as LucideSettings,
} from "lucide-react";
import Settings from "./setting";
import Notification from "./Notification";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Nav: React.FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false); // สถานะสำหรับ Notification
  const router = useRouter();

  const handleLogout = () => {
    router.push("/Page/auth/login");
  };

  const handleSettings = () => {
    setIsSettingOpen(true);
    setIsProfileDropdownOpen(false);
  };

  const handleCloseSettings = () => {
    setIsSettingOpen(false);
  };

  return (
    <nav className="bg-indigo-200 shadow-md px-4 py-1 flex items-center justify-between">
      <div className="flex items-center">
        <a href="#" onClick={(e) => e.preventDefault()}>
          <img
            src="https://shorturl.asia/W1qXH"
            alt="Click Me"
            className="h-12 mr-2"
            onClick={() => router.push("/")}
            style={{ imageRendering: "crisp-edges" }}
          />
        </a>
      </div>

      <div className="flex items-center space-x-4">
        {/* ไอคอนแจ้งเตือน */}
        <div className="relative">
          <button
            onClick={() =>
              setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
            } // เปลี่ยนสถานะการเปิดปิดของ Notification
            className="text-gray-600 hover:text-blue-600"
          >
            <Bell className="w-6 h-6" />
          </button>
          {isNotificationDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-blue-50 rounded-xl shadow-lg py-1 z-10">
              <Notification />
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
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
                <LucideSettings className="inline-block w-4 h-4 mr-2" />
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

      {isSettingOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button onClick={() => setIsSettingOpen(true)}>
              Open Settings
            </button>
            <Settings isOpen={isSettingOpen} onClose={handleCloseSettings} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
