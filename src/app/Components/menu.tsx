"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Users,
  MessageSquare,
  Stethoscope,
  Calendar,
  MapPinned,
  Hospital,
  FlaskConical,
  Speech,
  Receipt,
  ClipboardPlus,
  ChevronDown,
  ChevronUp,
  CirclePlus,
  HousePlus,
  Pill,
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


  const menuItems = [
    { name: "Hospital Dashboard", icon: Grid, href: "/" },
    {name: "Home Wards", icon: HousePlus, href:"/Page/home/homewards"},
    {name: "Health Station", icon: ScanHeart, href:"/Page/home/health"},
    { name: "Map", icon: MapPinned, href: "/Page/home/map" },
    {name: "Appointment", icon: Clock, href: "/Page/home/appointment"}
  ];


  const itemsManage = [
    { name: "Doctors", icon: Stethoscope, href: "/Page/management/doctors" },
    { name: "Nurse", icon: CirclePlus, href: "/Page/management/nurses" },
    { name: "Patient", icon: Users, href: "/Page/management/patients" },
    { name: "Users", icon: ContactRound, href: "/Page/management/users" },
    // { name: "Staff Management", icon: Speech, href: "/home/staffmanage" },
  ];


  const report = [
    { name: "Report", icon: Receipt, href: "/Page/report" },
  ];


  const handleNavigation = (href: string) => {
    router.push(href);
  };


  return (
    <div className="flex h-screen overflow-y-auto">
      {isSidebarOpen && (
        <aside className="bg-sky-50 p-4 h-screen w-56">
          <nav className="flex-1">
            <ul className="space-y-1.5 px-2">
              <hr className="my-2 border-gray-300" />
              <div className="text-[9px] font-extrabold text-gray-600 -mb-1">
                GENERAL
              </div>
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </button>
                </li>
              ))}


              <hr className="my-2 border-gray-300" />
              <div className="text-[9px] font-extrabold text-gray-600 mb-1">
                MANAGEMENT
              </div>
              {itemsManage.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                </li>
              ))}
              <hr className="my-2 border-gray-300" />
              <div className="text-[9px] font-extrabold text-gray-600 mb-1">
                REPORT
              </div>
              {report.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
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