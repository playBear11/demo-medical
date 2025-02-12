"use client";

import React, { useEffect, useState } from "react";
import SettingsPage from "./setting";
import { LogOut, Bell, MenuIcon, Settings } from "lucide-react";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  //const [isSidebarOpen, setIsSidebarOpen] = useState(true); // สร้าง state `isSidebarOpen` เพื่อตรวจสอบว่า Sidebar เปิดหรือปิด ค่าเริ่มต้นเป็น `true` (เปิดอยู่)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // สร้าง state `isProfileDropdownOpen` เพื่อตรวจสอบว่า Dropdown ของโปรไฟล์เปิดอยู่หรือไม่ ค่าเริ่มต้นเป็น `false`

  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะการเปิด-ปิด Modal
  const [isSettingOpen, setIsSettingOpen] = useState(false); // เปิด/ปิดหน้า Setting
  const openSetting = () => {
    setIsSettingOpen(true); // เปิดการตั้งค่า
    setIsModalOpen(false); // ปิด dropdown menu
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:3000/";
  };

  const handleSettings = () => {
    setIsSettingOpen(true); // เปิดหน้าตั้งค่า
    setIsProfileDropdownOpen(false); // ปิด dropdown menu
  };

  return (
    <nav className="bg-indigo-200 shadow-md  px-4 py-1 flex items-center justify-between">
      <div className="flex items-center ">
        {/* ปุ่มเปิด/ปิด Sidebar */}
       {/*} <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mr-4 text-black hover:text-blue-600"
        >
          <MenuIcon className="w-6 h-6" />
        </button>*/}
        <div>
          <img
            src="https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.15752-9/476480983_1142717804266793_8799618483270989112_n.png?stp=dst-png_s2048x2048&_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_ohc=-GSo7qW6YNgQ7kNvgHf80Im&_nc_oc=AdgnNALkqpJ9UESZcCrcJDvaVaaaRSrll9yZS2-kttNBmYayCSGWzCSOihEuet_Hss8&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&oh=03_Q7cD1gGg9ClPunKbiy6NenG9ksNutLMobSgkf07IcPbtkNEEhg&oe=67C94259"
            alt="โลโก้"
            className="h-12 mr-2"
            style={{ imageRendering: "crisp-edges" }} // ✅ ใช้ใน JSX
          />
        </div>
        {/*<span className="text-base font-semibold text-gray-800">
          Name hospital
        </span>*/}
      </div>

      <div className="flex items-center space-x-4">
        {/* การแจ้งเตือน */}
        <button className="text-gray-600 hover:text-blue-600 ">
          <Bell className="w-6 h-6" />
        </button>

        {/* โปรไฟล์ */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="https://shorturl.asia/1NPwK" // ใช้ URL ของโปรไฟล์
              alt="Profile"
              className="w-14 h-14 rounded-full cursor-pointer"
            />
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={() => setIsSettingOpen(true)}
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
          <SettingsPage
            isOpen={isSettingOpen}
            onClose={() => setIsSettingOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
