"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Stethoscope,
  MapPinned,
  Hospital,
  Receipt,
  CirclePlus,
  HousePlus,
  Grid,
  ScanHeart,
  ContactRound,
  Clock,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MenuProps {
  isSidebarOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ isSidebarOpen }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false); // ใช้สถานะใหม่เพื่อจัดการ hover

  const menuItems = [
    { name: "Hospital Dashboard", icon: Grid, href: "/" },
    { name: "Home Wards", icon: HousePlus, href: "/Page/home/homewards" },
    { name: "Health Station", icon: ScanHeart, href: "/Page/home/health" },
    { name: "Map", icon: MapPinned, href: "/Page/home/map" },
    { name: "Appointment", icon: Clock, href: "/Page/home/appointment" },
  ];

  const itemsManage = [
    { name: "Doctors", icon: Stethoscope, href: "/Page/management/doctors" },
    { name: "Nurse", icon: CirclePlus, href: "/Page/management/nurses" },
    { name: "Patient", icon: Users, href: "/Page/management/patients" },
    { name: "Users", icon: ContactRound, href: "/Page/management/users" },
  ];

  const report = [{ name: "Report", icon: Receipt, href: "/Page/report" }];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex h-screen overflow-y-auto">
      {isSidebarOpen && (
        <aside
          className={`bg-sky-50 p-4 h-screen transition-all duration-500 ease-in-out ${
            isHovered ? "w-50" : "w-22" // ขยายเมื่อ hover และหดเมื่อออก
          }`}
          onMouseEnter={() => setIsHovered(true)} // ขยายเมื่อเคอร์เซอร์อยู่ภายใน
          onMouseLeave={() => setIsHovered(false)} // หดเมื่อเคอร์เซอร์ออกจากเมนู
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
                    {isHovered && (
                      <span className="ml-2">{item.name}</span>
                    )}
                  </button>
                </li>
              ))}

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
                    {isHovered && (
                      <span className="ml-2">{item.name}</span>
                    )}
                  </button>
                </li>
              ))}
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
                    {isHovered && (
                      <span className="ml-2">{item.name}</span>
                    )}
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
