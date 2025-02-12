"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/component/nav";
import Menu from "@/component/menu";
import { title } from "process";

import {
  Users,
  UserCheck,
  BicepsFlexed,
  LogOut,
  ShieldCheck,
  UserPlus,
  CircleOff,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Staff = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ควบคุม Sidebar
  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะการเปิด-ปิด Modal
  const [modalContent, setModalContent] = useState<string | React.ReactNode>(
    null
  ); // สถานะเก็บเนื้อหาของ Modal

  const staffOverview = [
    {
      title: "All Staff", // จำนวนทั้งหมดของแพทย์, พยาบาล, แอดมินหมอ, อสม.
      value: "250", // ข้อมูลแสดงจำนวนผู้ป่วยในแต่ละแผนก
      description:
        "Total number of personnel in the hospital, including doctors, nurses, admin and village health volunteers.", // คำอธิบาย
    },
    {
      title: "Active Staff", // บุคลากรที่ปฏิบัติงานอยู่
      value: "230", // จำนวนเตียงที่ว่างและทั้งหมด
      description:
        "Personnel who are still working in the hospital and have not resigned or are in the probationary period", // คำอธิบาย
    },
    {
      title: "On Duty Now", // บุคลากรที่กำลังเวรอยู่ตอนนี้
      value: "120", // จำนวนแพทย์และพยาบาล
      description: "Number of personnel currently on duty at this time", // คำอธิบาย
    },
    {
      title: "On Leave", // บุคลากรที่กำลังลางาน
      value: "15", // คะแนนการประเมิน
      description:
        "Number of personnel not on duty due to vacation, sick leave, or other reasons", // คำอธิบาย
    },
    {
      title: "New Staff", // บุคลากรที่เข้ามาทำงานใหม่ในเดือนนี้
      value: "10", // คะแนนการประเมิน
      description: "Number of personnel hired this month", // คำอธิบาย
    },
    {
      title: "Resigned Staff", // บุคลากรที่ลาออก
      value: "5", // คะแนนการประเมิน
      description:
        "Number of personnel who resigned or had their contracts terminated this month", // คำอธิบาย
    },
    {
      title: "On Probation", // บุคลากรที่อยู่ระหว่างทดลองงาน
      value: "8", // คะแนนการประเมิน
      description:
        "Number of personnel who are on probation and have not yet been hired as permanent employees", // คำอธิบาย
    },
  ];

  // ข้อมูลจำนวนบุคลากรตามประเภทงาน
  const staffByTypeData = {
    labels: ["แพทย์", "พยาบาล", "แอดมินหมอ", "อสม."],
    datasets: [
      {
        label: "จำนวนบุคลากร",
        data: [50, 200, 30, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // ข้อมูลบุคลากรตามแผนก
  const staffByDepartmentData = {
    labels: ["แผนกฉุกเฉิน", "ผู้ป่วยใน", "ผู้ป่วยนอก", "ห้องผ่าตัด"],
    datasets: [
      {
        label: "จำนวนบุคลากร",
        data: [40, 80, 60, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // ข้อมูลอัตราการลาออก
  const turnoverRateData = {
    labels: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
    datasets: [
      {
        label: "เข้าใหม่",
        data: [5, 8, 6, 9, 7, 10],
        borderColor: "#36A2EB",
        backgroundColor: "#36A2EB",
      },
      {
        label: "ลาออก",
        data: [3, 5, 4, 6, 5, 7],
        borderColor: "#FF6384",
        backgroundColor: "#FF6384",
      },
    ],
  };

  // ข้อมูลสัดส่วนแพทย์ต่อพยาบาล
  const doctorNurseRatioData = {
    labels: ["แพทย์", "พยาบาล"],
    datasets: [
      {
        data: [1, 4],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  // ข้อมูลจำนวนเวรที่บุคลากรทำในเดือนนี้
  const shiftsPerMonthData = {
    labels: ["สัปดาห์ที่ 1", "สัปดาห์ที่ 2", "สัปดาห์ที่ 3", "สัปดาห์ที่ 4"],
    datasets: [
      {
        label: "จำนวนเวร",
        data: [40, 45, 38, 42],
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const smallPieOptions = {
    plugins: {
      legend: {
        display: false, // ซ่อน label รอบ Pie Chart
      },
    },
  };

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

  return (
    <div className="h-screen  bg-white flex flex-col overflow-hidden">
      {/* ส่วนของ Navigation */}
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* ส่วนของ Menu และเนื้อหา */}
      <div className="flex">
        <div className="w-56">
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Section: Staff Overview */}
        <div className="flex-1 h-screen p-4  overflow-y-scroll">
          {" "}
          {/* พื้นหลังสีขาว */}
          <h1 className="text-black mb-4 font-bold">Staff Management</h1>
          <hr />
          <div className="grid grid-cols-4 gap-6 mt-10">
            {staffOverview.map((overview, index) => (
              <div
                key={index}
                className="bg-white p-3 shadow-md rounded-lg border h-28"
              >
                <div className="flex items-center  m-2 h-20">
                  {/* แสดงไอคอน */}
                  <div className="mr-2 sm:mr-3 md:mr-4">
                    {overview.title === "All Staff" && (
                      <Users className="text-orange-600 text-6xl mr-2 space-x-4" />
                    )}
                    {overview.title === "Active Staff" && (
                      <UserCheck className="text-blue-600 text-6xl mr-2" />
                    )}
                    {overview.title === "On Duty Now" && (
                      <BicepsFlexed className="text-yellow-600 text-6xl mr-2" />
                    )}
                    {overview.title === "On Leave" && (
                      <CircleOff className="text-green-600 text-6xl mr-2" />
                    )}
                    {overview.title === "New Staff" && (
                      <UserPlus className="text-green-600 text-6xl mr-2" />
                    )}
                    {overview.title === "Resigned Staff" && (
                      <LogOut className="text-green-600 text-6xl mr-2" />
                    )}
                    {overview.title === "On Probation" && (
                      <ShieldCheck className="text-green-600 text-6xl mr-2" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm mx-1 font-bold text-black">
                      {overview.title}
                    </h3>
                    <p className="text-xs mx-1 mt-2 text-pink-500 font-light">
                      {overview.value}
                    </p>

                    <div className="flex justify-end w-52">
                      <button
                        className="mt-2 text-sm  self-end mt-autox-1 text-blue-500 hover:underline"
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
              </div>
            ))}
          </div>
          {/** กราฟ ชาร์ทแสดงข้อมูล */}
          {/*}  <h2 className="text-black mb-4 font-bold mt-10">
            Staff Analytics & Charts
            </h2>  */}
          <hr className="mt-10" />
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-10 text-black ">
            <div className="bg-white p-4 shadow-md rounded-lg border">
              <h3 className="text-lg font-bold mb-4">
                จำนวนบุคลากรตามประเภทงาน
              </h3>
              <div className="flex items-center h-72">
                {/* Pie Chart (ซ้าย) */}
                <div className="w-1/2 flex justify-center items-center">
                  <div className="w-40 h-40">
                    {" "}
                    {/* กำหนดขนาด Pie Chart */}
                    <Pie data={staffByTypeData} options={smallPieOptions} />
                  </div>
                </div>

                {/* ข้อมูล (ขวา) */}
                <div className="w-1/2 flex justify-center items-center">
                  <ul className="space-y-2">
                    {staffByTypeData.labels.map((label, index) => (
                      <li key={index} className="flex items-center">
                        <span
                          className="w-4 h-4 mr-2 inline-block"
                          style={{
                            backgroundColor:
                              staffByTypeData.datasets[0].backgroundColor[
                                index
                              ],
                          }}
                        ></span>
                        <span>
                          {label}: {staffByTypeData.datasets[0].data[index]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="mt-4 text-blue-500 hover:underline"
                  onClick={() => openModal(<Bar data={staffByTypeData} />)}
                >
                  View Full Chart
                </button>
              </div>
            </div>

            <div className="bg-white p-4 shadow-md rounded-lg border">
              <h3 className="text-lg font-bold mb-4">บุคลากรตามแผนก</h3>
              <Bar data={staffByDepartmentData} />
              <div className="flex justify-end">
                <button
                  className="mt-4 text-blue-500 hover:underline"
                  onClick={() =>
                    openModal(<Bar data={staffByDepartmentData} />)
                  }
                >
                  View Full Chart
                </button>
              </div>
            </div>

            <div className="bg-white p-4 shadow-md rounded-lg border">
              <h3 className="text-lg font-bold mb-4">
                อัตราการลาออก (Turnover Rate)
              </h3>
              <Line data={turnoverRateData} />

              {/* ใช้ flex + justify-end เพื่อขยับปุ่มไปทางขวา */}
              <div className="flex justify-end">
                <button
                  className="mt-4 text-blue-500 hover:underline"
                  onClick={() => openModal(<Bar data={turnoverRateData} />)}
                >
                  View Full Chart
                </button>
              </div>
            </div>

            <div className="bg-white p-4 shadow-md rounded-lg border">
              <h3 className="text-lg font-bold mb-4">
                {" "}
                สัดส่วนแพทย์ต่อพยาบาล{" "}
              </h3>
              <div className="flex items-center h-72 ">
                {/* Pie Chart (ซ้าย) */}
                <div className="w-1/2 flex justify-center items-center">
                  <div className="w-40 h-40">
                    {" "}
                    {/* กำหนดขนาด Pie Chart */}
                    <Pie
                      data={doctorNurseRatioData}
                      options={smallPieOptions}
                    />
                  </div>
                </div>

                <div className="w-1/2 flex justify-center items-center">
                  <ul className="space-y-2 ">
                    {doctorNurseRatioData.labels.map((label, index) => (
                      <li key={index} className="flex items-center">
                        <span
                          className="w-4 h-4 mr-2 inline-block "
                          style={{
                            backgroundColor:
                              doctorNurseRatioData.datasets[0].backgroundColor[
                                index
                              ],
                          }}
                        ></span>
                        <span>
                          {label}:{" "}
                          {doctorNurseRatioData.datasets[0].data[index]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-end items-end">
                <button
                  className="mt-4 text-blue-500 hover:underline "
                  onClick={() => openModal(<Bar data={doctorNurseRatioData} />)} // เปิด Modal เพื่อดูกราฟเต็ม
                >
                  View Full Chart
                </button>
              </div>
            </div>
{/*
            <div className="bg-white p-4 shadow-md rounded-lg border col-span-2">
              <h3 className="text-lg font-bold mb-4">
                จำนวนเวรที่บุคลากรทำในเดือนนี้
              </h3>
              <Bar data={shiftsPerMonthData} />
              <div className="flex justify-end">
                <button
                  className="mt-4 text-blue-500 hover:underline"
                  onClick={() => openModal(<Bar data={turnoverRateData} />)}
                >
                  View Full Chart
                </button>
              </div>
            </div>
          </div>  */}
          <hr className="mb-10 " />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
              {modalContent} {/* แสดงเนื้อหาภายใน Modal */}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={closeModal} // ปิด Modal
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Staff;
