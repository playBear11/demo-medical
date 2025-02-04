"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/component/nav";
import Menu from "@/component/menu";

const Nurse = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ควบคุม Sidebar
  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะสำหรับเปิด/ปิด Modal
  const [selectedNurse, setSelectedNursesr] = useState<Nurse | null>(null); // ข้อมูลแพทย์ที่เลือก

  const openModal = (nurse: Nurse) => {
    setSelectedNursesr(nurse); // ตั้งค่าเนื้อหาของ Modal
    setIsModalOpen(true); // เปิด Modal
  };
  const closeModal = () => {
    setSelectedNursesr(null); // ล้างเนื้อหาของ Modal
    setIsModalOpen(false); // ปิด Modal
  };

  // ข้อมูลแพทย์
  interface Nurse {
    name: string; // ชื่อแพทย์
    department: string; //แผนก
    position: string; //ตำแหน่ง
    avatar: string; //รูปภาพ
  }
  const NurseCard = ({
    nurse, // สร้าง DoctorCard สำหรับแสดงข้อมูลแพทย์
    onClick, // ฟังก์ชันเมื่อคลิกที่แพทย์
  }: {
    // รับค่า doctor และ onClick
    nurse: Nurse; // ข้อมูลแพทย์
    onClick: () => void; // ฟังก์ชันเมื่อคลิกที่แพทย์
  }) => {
    return (
      <div
        className="bg-blue-100  p-4 rounded-xl shadow-md flex items-center gap-4 cursor-pointer"
        onClick={onClick}
      >
        <img
          src={nurse.avatar}
          alt={Nurse.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold text-black">{Nurse.name}</h3>
          <p className="text-gray-500">{nurse.department}</p>
        </div>
      </div>
    );
  };




  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* ส่วนของ Navigation */}
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* ส่วนของ Menu */}
      <div className="flex">
        <div className="w-56">
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>

        <div className={`p-4 h-screen overflow-auto transition-all duration-300 ${isSidebarOpen ? "w-[calc(100%-14rem)]" : "w-full"}`}>

        <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-4 gap-6 h-32">
          <NurseCard // แสดงข้อมูลพยาบาล
            nurse={{
              name: "Dr. John Doe",
              department: "General Medicine",
              position: "Senior Doctor",
              avatar:
                "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png",
            }}
            onClick={() =>
              openModal({
                name: "Dr. John Doe",
                department: "General Medicine",
                position: "Senior Doctor",
                avatar:
                  "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png",
              })
            }
          />

          <NurseCard
            nurse={{
              name: "Dr. Jane Smith",
              department: "General Medicine",
              position: "Senior Doctor",
              avatar:
                "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png",
            }}
            onClick={() =>
              openModal({
                name: "Dr. Jane Smith",
                department: "General Medicine",
                position: "Senior Doctor",
                avatar:
                  "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png",
              })
            }
          />

          <NurseCard
            nurse={{
              name: "Dr. Jane Smith",
              department: "General Medicine",
              position: "Senior Doctor",
              avatar:
                "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png",
            }}
            onClick={() =>
              openModal({
                name: "Dr. Jane Smith",
                department: "General Medicine",
                position: "Senior Doctor",
                avatar:
                  "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png",
              })
            }
          />

          <NurseCard
            nurse={{
              name: "Dr. Jane Smith",
              department: "General Medicine",
              position: "Senior Doctor",
              avatar:
                "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png",
            }}
            onClick={() =>
              openModal({
                name: "Dr. Jane Smith",
                department: "General Medicine",
                position: "Senior Doctor",
                avatar:
                  "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png",
              })
            }
          />

          {/* เพิ่ม DoctorCard อื่นๆ ตามต้องการ */}
        </div>
      </div>

      {/* โมดัลแสดงข้อมูลแพทย์ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <img
              src={selectedNurse?.avatar} // แสดงรูปภาพแพทย์
              alt={selectedNurse?.name} // แสดงชื่อแพทย์
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-4 text-black flex items-center justify-center">
              {selectedNurse?.name} {/* แสดงชื่อแพทย์*/}
            </h2>
            <p className="text-sm text-black">
              Department : {selectedNurse?.department} <br />{" "}
              {/* // แสดงแผนก */}
              Position : {selectedNurse?.position} {/* // แสดงตำแหน่ง */}
              <br />
              {/* // แสดงความเชี่ยวชาญ */}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal} // ปิด Modal
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full"
              >
                Close
              </button>
            </div>
          </div>
          </div>
      )}
      </div>
    </div>
  );
};

export default Nurse;
