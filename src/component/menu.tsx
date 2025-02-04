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
  const [isPharmacyOpen, setIsPharmacyOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isHospitalOpen, setIsHospitalOpen] = useState(false);

  const menuItems = [{ name: "Hospital Dashboard", icon: Home, href: "/home" }];

  const itemsManage = [
    { name: "Doctors", icon: Stethoscope, href: "/home/doctors" },
    { name: "Nurse", icon: CirclePlus, href: "/home/nurse" },
    { name: "Patient", icon: Users, href: "/home/patient" },
    { name: "Map", icon: MapPinned, href: "/home/map" },
    { name: "Laboratory", icon: FlaskConical, href: "/home/laboratory" },
    { name: "Staff Management", icon: Speech, href: "/home/staff" },
  ];

  const report = [
    { name: "Billing Report", icon: Receipt, href: "/home/" },
    {
      name: "Patient Report",
      icon: ClipboardPlus,
      href: "/home/patient-report",
    },
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

              {/* Pharmacy Dropdown */}
              <li>
                <button
                  onClick={() => setIsPharmacyOpen(!isPharmacyOpen)}
                  className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <Calendar className="w-5 h-5 mr-3" /> Pharmacy

                  {/*ลูกศรชี้ขึ้นลงเมื่อกด */}

                  {isPharmacyOpen ? (
                    <ChevronUp className="w-4 h-4 ml-auto" />       
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  )}
                </button>
                {isPharmacyOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/medicine-warehouse"
                        className="w-full p-2 rounded-lg text-xs hover:bg-white hover:text-blue-600"
                      >
                        Medicine Warehouse
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/prescription"
                        className="w-full p-2 rounded-lg text-xs hover:bg-white hover:text-blue-600"
                      >
                        Prescription
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/report"
                        className="w-full p-2 rounded-lg text-xs hover:bg-white hover:text-blue-600"
                      >
                        Report
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Appointment Dropdown */}
              <li>
                <button
                  onClick={() => setIsAppointmentOpen(!isAppointmentOpen)}
                  className="flex items-center w-full p-2 rounded-lg text-black text-xs hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <Calendar className="w-5 h-5 mr-3" /> Appointment
                  
                  {/*ลูกศรชี้ขึ้นลงเมื่อกด */}
                  
                  {isAppointmentOpen ? (
                    <ChevronUp className="w-4 h-4 ml-auto" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  )}
                </button>

                {isAppointmentOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/home/appoint"
                        className="w-full p-2 rounded-lg text-xs hover:bg-white hover:text-blue-600"
                      >
                        All Appointments
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/home/doctorappoint"
                        className="w-full p-2 rounded-lg text-xs hover:bg-white hover:text-blue-600"
                      >
                        Doctor Appointments
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/home/patientappoint"
                        className="w-full p-2 rounded-lg text-xs hover:bg-white hover:text-blue-600"
                      >
                        Patient Appointments
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

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
