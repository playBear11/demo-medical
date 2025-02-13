"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/app/Components/nav";
import Menu from "@/app/Components/menu";
import clsx from "clsx";

const tabs = [
  { title: "All", value: "all" },
  { title: "Pading", value: "hpading" },
  { title: "Confirm", value: "comfirm" },
  { title: "Complete", value: "complete" },
  { title: "Reject", value: "reject" },
  { title: "Late", value: "late" },
];

const Appointment = () => {
  const [dataTabs, setDataTabs] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ควบคุม Sidebar
  // ใช้ state สำหรับเก็บข้อมูลการนัดหมาย
  const [searchTerm, setSearchTerm] = useState(""); // คำค้นหาที่ใช้กรองข้อมูล
  const [editModal, setEditModal] = useState(false); // เปิด/ปิด modal สำหรับแก้ไข
  const [deleteModal, setDeleteModal] = useState(false); // เปิด/ปิด modal สำหรับลบ

  // ฟังก์ชันสำหรับยืนยันการลบ (ยังไม่ได้ใช้งานในโค้ดนี้)
  function confirmDeleteAppointment(
    event: React.MouseEvent<HTMLButtonElement>
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Navigation */}
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-56" : "w-0"
          }`}
        >
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 transition-all duration-300">
          <h2 className="text-xl font-semibold  mb-10 text-black">
            Appointment
          </h2>
          {/**  <hr />*/}

          <div className="flex">
            <div className="flex w-2/5 border-b justify-start ">
              {tabs.map(({ title, value }) => (
                <span
                  key={value}
                  onClick={() => setDataTabs(value)}
                  className={clsx(
                    "cursor-pointer flex-1 py-2 text-center text-sm font-medium transition-colors",
                    value === dataTabs
                      ? "border-b-4 border-blue-500 text-blue-700"
                      : "text-gray-500 hover:text-blue-500"
                  )}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>

          <table className="min-w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-blue-300 rounded-lg text-black">
                <th className="px-4 py-2 border-b">Profile</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">ID Card Number</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Date & Time</th>
                <th className="px-4 py-2 border-b">Meet</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-black text-xs text-center">
                <td className="px-4 py-2 border-b"> </td>
                <td className="px-4 py-2 border-b">John Doe</td>
                <td className="px-4 py-2 border-b">123456789</td>
                <td className="px-4 py-2 border-b">Active</td>
                <td className="px-4 py-2 border-b">2025-02-10 14:00</td>
                <td className="px-4 py-2 border-b">Zoom</td>
              </tr>
              {/* Repeat the above <tr> block for more rows */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
