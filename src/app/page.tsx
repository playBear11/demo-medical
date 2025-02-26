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

            {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = iconMapping[stat.icon as keyof typeof iconMapping]
              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg ${stat.iconColor.includes('text-blue') ? 'bg-blue-100' : stat.iconColor.includes('text-green') ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {Icon && <Icon className={`${stat.iconColor} w-5 h-5`} />}
                    </div>
                    <h3 className="text-base font-medium text-gray-800 ml-3">{stat.title}</h3>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    {Array.isArray(stat.value) ? (
                      stat.value.map((department, index) => (
                        <div key={index} className="flex justify-between mb-1">
                          <span>{department.department}:</span>
                          <span className="font-medium">{department.patients} patients</span>
                        </div>
                      ))
                    ) : typeof stat.value === "object" ? (
                      Object.entries(stat.value).map(([key, val]) => (
                        <div key={key} className="flex justify-between mb-1">
                          <span>{key}:</span>
                          <span className="font-medium">{val}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-lg font-semibold text-gray-800 my-2">
                        {stat.value}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                    <p className={`text-xs ${stat.change?.startsWith("+") ? "text-green-500" : "text-red-500"} font-medium`}>
                      {stat.change}
                    </p>
                    <button
                      className="text-xs text-blue-500 hover:text-blue-700 font-medium hover:underline"
                      onClick={() => openModal(<div>{stat.description}</div>)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 shadow-sm rounded-xl border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-100">Patients per Month</h3>
              <div className="h-64">
                <Line 
                  data={lineChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-4 text-right">
                <button
                  className="text-sm text-blue-500 hover:text-blue-700 font-medium hover:underline"
                  onClick={() => openModal(<Line data={lineChartData} />)}
                >
                  View Full Chart
                </button>
              </div>
            </div>

            <div className="bg-white p-5 shadow-sm rounded-xl border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-100">Daily Appointments</h3>
              <div className="h-64">
                <Bar 
                  data={barChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-4 text-right">
                <button
                  className="text-sm text-blue-500 hover:text-blue-700 font-medium hover:underline"
                  onClick={() => openModal(<Bar data={barChartData} />)}
                >
                  View Full Chart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            {modalContent}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
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