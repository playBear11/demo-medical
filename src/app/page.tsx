"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Line, Bar } from "react-chartjs-2";
import {
  FaUsers,
  FaBed,
  FaHeartbeat,
  FaStar,
  FaCalendar,
  FaMoneyBill,
  FaCheckCircle,
} from "react-icons/fa";
import MainLayout from "./Components/mainlayout"; // นำเข้า MainLayout

const Home = () => {
  const router = useRouter();
  
  
  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะการเปิด-ปิด Modal
  const [modalContent, setModalContent] = useState<string | React.ReactNode>(
    null
  ); // สถานะเก็บเนื้อหาของ Modal
  const [dropdownOpen, setDropdownOpen] = useState(false); // สถานะการแสดง/ซ่อน dropdown ของโปรไฟล์


  // ข้อมูลตัวอย่างสำหรับกราฟ (line chart)
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // ข้อมูลที่แสดงบนแกน X
    datasets: [
      {
        label: "Patients per Month", // ชื่อกราฟ
        data: [120, 150, 100, 180, 200, 250, 300], // ข้อมูลจำนวนผู้ป่วยในแต่ละเดือน
        borderColor: "rgba(75, 192, 192, 1)", // สีขอบของกราฟ
        borderWidth: 2, // ความหนาของขอบกราฟ
      },
    ],
  };


  // ข้อมูลตัวอย่างสำหรับข้อมูลสรุปของโรงพยาบาล
  const hospitalOverview = [
    {
      title: "Total Patients per Department", // จำนวนผู้ป่วยทั้งหมดในแต่ละแผนก
      value: "Cardiology: 250, Neurology: 180, Pediatrics: 300", // ข้อมูลแสดงจำนวนผู้ป่วยในแต่ละแผนก
      description: "Current patients in each department", // คำอธิบาย
    },
    {
      title: "Available Beds", // จำนวนเตียงที่ว่าง/เต็ม
      value: "50 Available / 120 Total", // จำนวนเตียงที่ว่างและทั้งหมด
      description: "Beds status in the hospital", // คำอธิบาย
    },
    {
      title: "Medical Staff Available", // จำนวนแพทย์/พยาบาลที่พร้อมให้บริการ
      value: "150 Doctors, 200 Nurses", // จำนวนแพทย์และพยาบาล
      description: "Available medical staff for services", // คำอธิบาย
    },
    {
      title: "Patient Satisfaction Rating", // การประเมินความพึงพอใจของผู้ป่วย
      value: "4.5/5", // คะแนนการประเมิน
      description: "Based on recent surveys", // คำอธิบาย
    },
  ];


  // ข้อมูลตัวอย่างสำหรับกราฟ (bar chart)
  const barChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ], 
    
    
    // ข้อมูลที่แสดงบนแกน X
    datasets: [
      {
        label: "Daily Appointments", // ชื่อกราฟ
        data: [20, 25, 30, 35, 40, 45, 50], // ข้อมูลการนัดหมายในแต่ละวัน
        backgroundColor: "rgba(153, 102, 255, 0.6)", // สีพื้นหลังของกราฟ
        borderColor: "rgba(153, 102, 255, 1)", // สีขอบของกราฟ
        borderWidth: 1, // ความหนาของขอบกราฟ
      },
    ],
  };


  // ข้อมูลตัวอย่างสำหรับสถิติ
  const stats = [
    {
      title: "New Patients", // ชื่อสถิติ
      value: 532, // ค่า
      change: "+12%", // การเปลี่ยนแปลง
      description: "compared to last month", // คำอธิบาย
    },
    {
      title: "Appointments Today",
      value: 74,
      change: "-5%",
      description: "compared to yesterday",
    },
    {
      title: "Total Revenue",
      value: "$23,540",
      change: "+8%",
      description: "this month",
    },
    {
      title: "Pending Appointments",
      value: 15,
      change: "-3%",
      description: "currently",
    },
  ];


  // ฟังก์ชันเปิด Modal
  const openModal = (content: React.ReactNode) => {
    setModalContent(content); // ตั้งค่าเนื้อหาของ Modal
    setIsModalOpen(true); // เปิด Modal
  };


  // ฟังก์ชันปิด Modal
  const closeModal = () => {
    setModalContent(null); // ล้างเนื้อหาของ Modal
    setIsModalOpen(false); // ปิด Modal
  };


  // ฟังก์ชันเปิด/ปิด dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ควบคุม Sidebar


  return (
    <MainLayout> {/* ✅ ใช้ MainLayout ครอบเนื้อหา */}
    <div className="h-screen flex flex-col">
      <div className="p-4 mb-10 overflow-scroll"> 
          <div className=" h-64  bg-gradient-to-r from-indigo-400 via-blue-400 to-sky-300 rounded-2xl mb-5 flex justify-between items-center p-6">
            {/* ส่วนข้อความด้านซ้าย */}
            <div className="text-white">
              <h1
                className="text-white text-2xl font-extrabold px-4 py-2 ml-4"
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                Good Morning
              </h1>
              <p
                className="text-white px-4 ml-4 "
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                Have Your Enjoyed!!
              </p>
            </div>


            {/* รูปหมอด้านขว */}
            <img
              src="https://png.pngtree.com/png-vector/20221119/ourmid/pngtree-smiling-male-doctor-with-stethoscope-png-image_6471575.png"
              alt="Doctor Illustration"
              className="h-64 "
            />
          </div>


          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* แสดงสถิติ */}
            {stats.map((stat, index) => (
              <div
                key={index}
                className=" p-2 shadow-md rounded-lg border h-28"
              >
                <div className="flex items-center m-2 h-20">
                  {/*แสดงไอคอน */}
                  {stat.title === "New Patients" && (
                    <FaUsers className="text-red-600 text-4xl mr-2" />
                  )}
                  {stat.title === "Appointments Today" && (
                    <FaCalendar className="text-violet-600 text-4xl mr-2" />
                  )}
                  {stat.title === "Total Revenue" && (
                    <FaMoneyBill className="text-pink-600 text-4xl mr-2" />
                  )}
                  {stat.title === "Pending Appointments" && (
                    <FaCheckCircle className="text-sky-600 text-4xl mr-2" />
                  )}


                  <div>
                    <h3 className="text-sm mx-1 font-semibold text-black ">
                      {stat.title}
                    </h3>
                    <p className="text-base mx-1 text-blue-400 font-bold">
                      {stat.value}
                    </p>
                    <p
                      className={`text-xs ${
                        stat.change.startsWith("+")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </p>
                    <button
                      className=" text-blue-500 text-sm mx-1 hover:underline"
                      onClick={() =>
                        openModal(
                          <div>
                            <h2 className="text-xl text-black font-bold mb-4">
                              {stat.title} Details
                            </h2>
                            <p className="text-lg text-gray-500">
                              {stat.description}
                            </p>
                            <p className="text-2xl text-blue-400 font-bold mt-2">
                              {stat.value}
                            </p>
                            <p
                              className={`text-sm ${
                                stat.change.startsWith("+")
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {stat.change}
                            </p>
                          </div>
                        )
                      }
                    >
                      View Details {/* ปุ่มดูรายละเอียด */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Section: Hospital Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* แสดงข้อมูลสรุปของโรงพยาบาล */}
            {hospitalOverview.map((overview, index) => (
              <div
                key={index}
                className="bg-white p-3 shadow-md rounded-lg border h-28"
              >
                <div className="flex items-center m-2 h-20">
                  {/* แสดงไอคอน */}
                  {overview.title === "Total Patients per Department" && (
                    <FaUsers className="text-orange-600 text-4xl mr-2" />
                  )}
                  {overview.title === "Available Beds" && (
                    <FaBed className="text-blue-600 text-4xl mr-2" />
                  )}
                  {overview.title === "Medical Staff Available" && (
                    <FaHeartbeat className="text-yellow-600 text-4xl mr-2" />
                  )}
                  {overview.title === "Patient Satisfaction Rating" && (
                    <FaStar className="text-green-600 text-4xl mr-2" />
                  )}


                  <div>
                    <h3 className="text-sm mx-1 font-bold text-black">
                      {overview.title}
                    </h3>
                    <p className="text-xs mx-1 mt-2 text-pink-500 font-light">
                      {overview.value}
                    </p>
                    <button
                      className="mt-2 text-sm mx-1 text-blue-500 hover:underline"
                      onClick={() =>
                        openModal(
                          <div>
                            <h2 className="text-xl text-black font-bold mb-4">
                              {overview.title} Details
                            </h2>
                            <p className="text-base text-gray-500">
                              {overview.description}
                            </p>
                            <p className="text-sm text-sky-500 font-bold mt-2">
                              {overview.value}
                            </p>
                          </div>
                        )
                      }
                    >
                      View Details {/* ปุ่มดูรายละเอียด */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 shadow-md rounded-lg border-2">
              <h3 className="text-lg text-black font-semibold mb-4">
                Patients per Month
              </h3>
              <Line data={lineChartData} /> {/* แสดงกราฟ Line */}
              <button
                className="mt-4 text-blue-500 hover:underline"
                onClick={() => openModal(<Line data={lineChartData} />)} //เปิด Modal เพื่อดูกราฟเต็ม
              >
                View Full Chart
              </button>
            </div>


            <div className="bg-white p-6 shadow-md rounded-lg border-2">
              <h3 className="text-lg text-black font-semibold mb-4">
                Daily Appointments
              </h3>
              <Bar data={barChartData} /> {/* แสดงกราฟ Bar */}
              <button
                className="mt-4 text-blue-500 hover:underline"
                onClick={() => openModal(<Bar data={barChartData} />)} // เปิด Modal เพื่อดูกราฟเต็ม
              >
                View Full Chart
              </button>
            </div>
          </div>


          {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            {modalContent}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </MainLayout>
  );
};


export default Home;