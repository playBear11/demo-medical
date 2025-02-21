"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/Hook/useAuth";
import {
  Users,
  Stethoscope,
  MapPinned,
  Receipt,
  CirclePlus,
  HousePlus,
  Grid,
  ScanHeart,
  ContactRound,
  Clock,
} from "lucide-react";

interface MenuProps {
  isSidebarOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ isSidebarOpen }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const { role } = useAuth();
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("user_role")?.trim().toLowerCase();
    console.log("Stored Role:", storedRole);  // ตรวจสอบค่าจาก localStorage
    console.log("Hook Role:", role);  // ตรวจสอบค่าจาก useAuth
    setCurrentRole(role?.toLowerCase() || storedRole || null);
  }, [role]);
  

  const menuItems = [
    { name: "Hospital Dashboard", icon: Grid, href: "/" },
    { name: "Home Wards", icon: HousePlus, href: "/Page/home/homewards" },
    { name: "Health Station", icon: ScanHeart, href: "/Page/home/health" },
    { name: "Map", icon: MapPinned, href: "/Page/home/map" },
    { name: "Appointment", icon: Clock, href: "/Page/home/appointment" },
  ];

  const itemsManage = [
    { name: "Doctors", icon: Stethoscope, href: "/Page/management/doctors" },
    { name: "Nurses", icon: CirclePlus, href: "/Page/management/nurses" },
    { name: "Patients", icon: Users, href: "/Page/management/patients" },
    {
      name: "Volunteers",
      icon: ContactRound,
      href: "/Page/management/volunteers",
    },
  ].filter((item) => {
    const userRole = currentRole || "";   // ใช้ currentRole ที่ตั้งไว้ใน useEffect

    if (userRole == "hospital admin") {
      return true;   // ถ้าเป็น Admin ให้แสดงทุกอย่าง
    }
    if (userRole === "doctor") {    // ถ้าเป็น Doctor ให้แสดง Nurses, Patients, Volunteers
      return ["Nurses", "Patients", "Volunteers"].includes(item.name);
    }
  
    if (userRole === "nurse") {     // ถ้าเป็น Nurse ให้แสดง Patients, Volunteers
      return ["Patients", "Volunteers"].includes(item.name);
    }
  
  });
  const report = [{ name: "Report", icon: Receipt, href: "/Page/report" }];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex h-screen overflow-y-auto">
      {isSidebarOpen && (
        <aside
          className={`bg-sky-50 p-4 h-screen transition-all duration-500 ease-in-out ${
            isHovered ? "w-50" : "w-22"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <nav className="flex-1">
            <ul className="space-y-1.5 px-2">
              <hr className="my-2 border-gray-300" />
              {isHovered && (
                <div className="text-[9px] font-extrabold text-gray-600 mb-1">
                  GENERAL
                </div>
              )}
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    {isHovered && <span className="ml-2">{item.name}</span>}
                  </button>
                </li>
              ))}

              {itemsManage.length > 0 && (
                <>
                  <hr className="my-2 border-gray-300" />
                  {isHovered && (
                    <div className="text-[9px] font-extrabold text-gray-600 mb-1">
                      MANAGEMENT
                    </div>
                  )}
                  {itemsManage.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                      >
                        <item.icon className="w-5 h-5" />
                        {isHovered && <span className="ml-2">{item.name}</span>}
                      </button>
                    </li>
                  ))}
                </>
              )}

              <hr className="my-2 border-gray-300" />
              {isHovered && (
                <div className="text-[9px] font-extrabold text-gray-600 mb-1">
                  REPORT
                </div>
              )}
              {report.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    {isHovered && <span className="ml-2">{item.name}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
};

export default Menu;