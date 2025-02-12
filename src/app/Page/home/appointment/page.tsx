"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/app/Components/nav";
import Menu from "@/app/Components/menu";
import { SearchIcon, XIcon } from "lucide-react";
import { Diversity1 } from "@mui/icons-material";



const Appointment = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ควบคุม Sidebar
  // ใช้ state สำหรับเก็บข้อมูลการนัดหมาย
  const [searchTerm, setSearchTerm] = useState(""); // คำค้นหาที่ใช้กรองข้อมูล
  const [editModal, setEditModal] = useState(false); // เปิด/ปิด modal สำหรับแก้ไข
  const [deleteModal, setDeleteModal] = useState(false); // เปิด/ปิด modal สำหรับลบ
  

  // state สำหรับเก็บข้อมูลที่จะแก้ไข
  const [editPatientName, setEditPatientName] = useState(""); //ข้อมูลคนไข้
  const [editDoctor, setEditDoctor] = useState(""); //ข้อมูลแพทย์
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editStatus, setEditStatus] = useState("Pending");
  const [editProblem, setEditProblem] = useState("");

  // ฟังก์ชันสำหรับยืนยันการลบ (ยังไม่ได้ใช้งานในโค้ดนี้)
  function confirmDeleteAppointment(
    event: React.MouseEvent<HTMLButtonElement>
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className=" h-screen  bg-white flex flex-col overflow-hidden">
      {/* ส่วนของ Navigation */}
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* ส่วนของ Menu */}
      <div className="flex">
        <div className="w-56">
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>
        

        <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mt-10 mb-4 text-black">Appointment</h2>
      <hr/>
      <table className="min-w-full table-auto border-collapse border mt-5">
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