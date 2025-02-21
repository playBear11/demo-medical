"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Line, Bar } from "react-chartjs-2"
import { lineChartData } from "../app/Data/charts/lineChartData"
import { barChartData } from "../app/Data/charts/barChartData"
import { iconMapping } from "../app/Data/constants/icons"
import { stats } from "../app/Data/statdash/stats"
import MainLayout from "./Components/pagecom/mainlayout"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
);

const Home = () => {
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false) // สถานะการเปิด-ปิด Modal
  const [modalContent, setModalContent] = useState<string | React.ReactNode>(null) // สถานะเก็บเนื้อหาของ Modal
  const [dropdownOpen, setDropdownOpen] = useState(false) // สถานะการแสดง/ซ่อน dropdown ของโปรไฟล์


  // ฟังก์ชันเปิด Modal
  const openModal = (content: React.ReactNode) => {
    setModalContent(content) // ตั้งค่าเนื้อหาของ Modal
    setIsModalOpen(true) // เปิด Modal
  }

  // ฟังก์ชันปิด Modal
  const closeModal = () => {
    setModalContent(null) // ล้างเนื้อหาของ Modal
    setIsModalOpen(false) // ปิด Modal
  }

  // ฟังก์ชันเปิด/ปิด dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000); // อัปเดตทุกๆ 1 วินาที

    return () => clearInterval(intervalId); // ทำความสะอาด interval เมื่อ component ถูก unmount
  }, []);

  return (
    <MainLayout>
      <div className="flex min-h-screen overflow-auto">
        {/* Main content section */}
        <div className="w-full p-4">
        
            <div className="h-64 bg-gradient-to-r from-indigo-400 via-blue-400 to-sky-300 rounded-2xl mb-5 flex justify-between items-center p-6">
              <div className="text-white">
                <h1
                  className="text-white text-2xl font-extrabold px-4 py-2 ml-4"
                  style={{ fontFamily: "Dancing Script, cursive" }}
                >
                  Good Morning
                </h1>
                <p
                  className="text-white  px-4 ml-4"
                  style={{ fontFamily: "Dancing Script, cursive" }}
                >
                  Have Your Enjoyed!!
                </p>
                <p
                  className="text-white text-xs px-4 ml-4 mt-3"
                  style={{ fontFamily: "Dancing Script, cursive" }}
                >
                  {currentDateTime}
                </p>
              </div>
              <img
                src="https://png.pngtree.com/png-vector/20221119/ourmid/pngtree-smiling-male-doctor-with-stethoscope-png-image_6471575.png"
                alt="Doctor Illustration"
                className="h-64"
              />
            </div>

            {/* Updated Statistics Section with correct icon rendering */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, index) => {
                const Icon = iconMapping[stat.icon as keyof typeof iconMapping]
                return (
                  <div
                    key={index}
                    className="p-2 shadow-md rounded-lg border bg-white flex flex-col justify-between h-full"
                  >
                    <div className="flex items-center m-2 h-20">
                      {Icon && <Icon className={`${stat.iconColor} w-6 h-6 mr-2`} />}
                      <div className="flex flex-col w-full">
                        <h3 className="text-base mt-3 font-semibold text-black">{stat.title}</h3>
                        <p className="text-xs text-blue-400 mt-1">
                          {Array.isArray(stat.value)
                            ? stat.value.map((department, index) => (
                                <span key={index}>
                                  {department.department}: {department.patients} patients
                                  <br />
                                </span>
                              ))
                            : typeof stat.value === "object"
                              ? Object.entries(stat.value).map(([key, val]) => (
                                  <span key={key}>
                                    {key}: {val}
                                    <br />
                                  </span>
                                ))
                              : stat.value}
                        </p>
                        <p className={`text-xs ${stat.change?.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                          {stat.change}
                        </p>
                        <button
                          className="mt-2 text-xs mx-1 text-blue-500 hover:underline ml-auto"
                          onClick={() => openModal(<div>{stat.description}</div>)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 shadow-md rounded-lg border-2">
                <h3 className="text-lg text-black font-semibold mb-4">Patients per Month</h3>
                <Line data={lineChartData} /> {/* แสดงกราฟ Line */}
                <button
                  className="mt-4 text-blue-500 hover:underline text-end w-full"
                  onClick={() => openModal(<Line data={lineChartData} />)} //เปิด Modal เพื่อดูกราฟเต็ม
                >
                  View Full Chart
                </button>
              </div>

              <div className="bg-white p-6 shadow-md rounded-lg border-2">
                <h3 className="text-lg text-black font-semibold mb-4">Daily Appointments</h3>
                <Bar data={barChartData} />
                <button
                  className="mt-4 text-blue-500 hover:underline text-end w-full "
                  onClick={() => openModal(<Bar data={barChartData} />)}
                >
                  View Full Chart
                </button>
              </div>
            </div>
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
    </MainLayout>
  )
}

export default Home
