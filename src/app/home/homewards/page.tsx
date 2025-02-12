"use client";
import React, { useState, useEffect, useMemo } from "react";
import Nav from "@/component/nav";
import Menu from "@/component/menu";
import { Card } from "@mui/material";
import clsx from "clsx";
import {
  Heart,
  Droplet,
  Wind,
  ClipboardList,
  CalendarHeart,
  HeartPulse,
  EthernetPort,
} from "lucide-react";
import { title } from "process";
const tabs = [
  { title: "All", value: "all" },
  { title: "High", value: "high" },
  { title: "Low", value: "low" },
  { title: "Normal", value: "normal" },
];

const HomeWards = () => {
  // สถานะสำหรับเก็บค่าของแท็บข้อมูลที่เลือก
  const [dataTabs, setDataTabs] = useState("all");

  // สถานะสำหรับเปิด/ปิด Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // สถานะสำหรับเก็บเนื้อหาของ Modal
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  // ฟังก์ชันเปิด Modal พร้อมกำหนดเนื้อหาที่จะแสดง
  const openModal = (content: React.ReactNode) => setModalContent(content);

  // ฟังก์ชันปิด Modal โดยกำหนดค่า modalContent ให้เป็น null
  const closeModal = () => setModalContent(null);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex">
        <div className="w-56">
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* ปุ่มแท็บกรองข้อมูล */}
          <div className="flex ">
            <div className="flex w-96 border-b justify-start 0">
              {/*การใช้ .map() วนลูป */}
              {tabs.map(({ title, value }) => (
                <span   //เป็นข้อความธรรมดา แต่ยังให้คลิกได้
                  key={value}
                  onClick={() => setDataTabs(value)} //การเปลี่ยนค่า dataTabs เมื่อคลิกแท็บ
                  className={clsx(
                    //การใช้ clsx ในการกำหนดคลาส CSS
                    "cursor-pointer flex-1 py-2 text-center text-sm font-medium transition-colors",
                    value === dataTabs
                      ? "border-b-4 border-blue-500 text-blue-700"      //value เท่ากับ dataTabsทำให้แท็บนั้นมีเส้นขอบด้านล่างสีฟ้าและข้อความเป็นสีน้ำเงิน
                      : "text-gray-500 hover:text-blue-500"           //value ไม่เท่ากับ dataTabsทำให้ข้อความเป็นสีเทา
                  )}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            <Card>
              <div className="flex items-center">
                <img
                  src="https://shorturl.asia/QNoP1"
                  alt="profile"
                  className="w-28 h-28 rounded-full mr-4"
                />

                <div className="text-xs">
                  <h2>Mr.John</h2>
                  <p>
                    <strong>Date:</strong> 05/02/2025
                  </p>
                  <p>
                    <strong>HN:</strong> 123456789
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <img
                  src="https://shorturl.asia/QNoP1"
                  alt="profile"
                  className="w-28 h-28 rounded-full mr-4"
                />
                <div className="text-xs">
                  <h2>Mr.John</h2>
                  <p>
                    <strong>Date:</strong> 05/02/2025
                  </p>
                  <p>
                    <strong>HN:</strong> 123456789
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <img
                  src="https://shorturl.asia/QNoP1"
                  alt="profile"
                  className="w-28 h-28 rounded-full mr-4"
                />
                <div className="text-xs">
                  <h2>Mr.John</h2>
                  <p>
                    <strong>Date:</strong> 05/02/2025
                  </p>
                  <p>
                    <strong>HN:</strong> 123456789
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <img
                  src="https://shorturl.asia/QNoP1"
                  alt="profile"
                  className="w-28 h-28 rounded-full mr-4"
                />
                <div className="text-xs">
                  <h2>Mr.John</h2>
                  <p>
                    <strong>Date:</strong> 05/02/2025
                  </p>
                  <p>
                    <strong>HN:</strong> 123456789
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWards;
