"use client";
import React, { useState } from "react";
import Link from "next/link";
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

  const menuItems = [
    { name: "Hospital Dashboard", icon: Grid, href: "/home" },
    {name: "Home Wards", icon: HousePlus, href:"/home/homewards"},
    {name: "Health Station", icon: ScanHeart, href:"/home/health-station"},
    { name: "Map", icon: MapPinned, href: "/home/map" },
    {name: "Appointment", icon: Clock, href: "/home/appoint"}
];

  const itemsManage = [
    { name: "Doctors", icon: Stethoscope, href: "/home/doctors" },
    { name: "Nurse", icon: CirclePlus, href: "/home/nurse" },
    { name: "Patient", icon: Users, href: "/home/patient" },
    { name: "Users", icon: ContactRound, href: "/home/users" },
   // { name: "Staff Management", icon: Speech, href: "/home/staffmanage" },
  ];

  const report = [
    { name: "Report", icon: Receipt, href: "/home/report" },
    
  ];

  return (
    <div className="flex h-screen overflow-y-auto">
      {isSidebarOpen && (
        <aside className="bg-gray-100 p-4 h-screen w-56">
          <nav className="flex-1">
            <ul className="space-y-1.5 px-2">
              <hr className="my-2 border-gray-300" />
              <div className="text-[9px] font-extrabold text-gray-600 -mb-1">
                GENERAL
              </div>
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </Link>
                </li>
              ))}
            

              <hr className="my-2 border-gray-300" />
              <div className="text-[9px] font-extrabold text-gray-600 mb-1">
                MANAGEMENT
              </div>
              {itemsManage.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <hr className="my-2 border-gray-300" />
              <div className="text-[9px] font-extrabold text-gray-600 mb-1">
                REPORT
              </div>
              {report.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
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
