"use client";
import type React from "react";
import { useState } from "react";
import Nav from "@/app/Components/pagecom/nav";
import Menu from "@/app/Components/pagecom/menu";

interface Health {
  bodyTemp: string;
  height: string;
  timestamp: string;
  name_TH: string;
  name_EN: string;
  ID_Card: string;
  date: string;
  address: string;
  heartbeat: string;
  sys: string;
  dia: string;
}

const HealthPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ข้อมูลตัวอย่าง
  const [healthData, setHealthData] = useState<Health[]>([
    {
      name_TH: "สมชาย ใจดี",
      name_EN: "Somchai Jaidee",
      ID_Card: "1234567890123",
      date: "13/02/2012",
      address: "กรุงเทพมหานคร",
      heartbeat: "80",
      sys: "120",
      dia: "80",
      bodyTemp: "",
      height: "",
      timestamp: "21/01/2025",
    },
    {
      name_TH: "สมสุข ใจร้าย",
      name_EN: "Somsuk Jairai",
      ID_Card: "1234567890123",
      date: "13/02/2012",
      address: "กรุงเทพมหานคร",
      heartbeat: "80",
      sys: "120",
      dia: "80",
      bodyTemp: "",
      height: "",
      timestamp: "21/01/2025",
    },
    {
      name_TH: "โซโดะ ดี",
      name_EN: "Sodo dee",
      ID_Card: "1234567890123",
      date: "13/02/2012",
      address: "กรุงเทพมหานคร",
      heartbeat: "80",
      sys: "120",
      dia: "80",
      bodyTemp: "",
      height: "",
      timestamp: "21/01/2025",
    },
    {
      name_TH: "เซกะ ซู",
      name_EN: "Zeka Soo",
      ID_Card: "1234567890123",
      date: "13/02/2012",
      address: "กรุงเทพมหานคร",
      heartbeat: "80",
      sys: "120",
      dia: "80",
      bodyTemp: "",
      height: "",
      timestamp: "21/01/2025",
    },
    // เพิ่มข้อมูลตัวอย่างเพิ่มเติมได้
  ]);
  const [query, setQuery] = useState(""); // คำค้นหาจากผู้ใช้
  const [results, setResults] = useState<Health[]>(healthData); // ผลลัพธ์การค้นหาจะเริ่มต้นเป็นข้อมูลทั้งหมด

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase(); // รับค่าจากช่องค้นหาและแปลงให้เป็นตัวพิมพ์เล็ก
    setQuery(searchQuery); // อัปเดตคำค้นหาที่ผู้ใช้พิมพ์

    if (searchQuery) {
      // ค้นหาข้อมูลผู้ใช้ที่ตรงกับคำค้นหาหรือไม่ โดยใช้ฟังก์ชัน filter
      const filtered = healthData.filter(
        (user) =>
          user.name_TH.toLowerCase().includes(searchQuery) ||
          user.name_EN.toLowerCase().includes(searchQuery) ||
          user.ID_Card.toLowerCase().includes(searchQuery)
      );
      setResults(filtered); // อัปเดตผลลัพธ์การค้นหาด้วยข้อมูลที่กรองแล้ว
    } else {
      setResults(healthData); // หากช่องค้นหาว่าง ให้แสดงข้อมูลทั้งหมด
    }
  };
  // State สำหรับเปิด/ปิดโมดัล
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State สำหรับข้อมูลที่จะแสดงในโมดัล
  const [selectedHealthData, setSelectedHealthData] = useState<any>(null);

  // ฟังก์ชันเปิดโมดัล
  const openModal = (healthData: any) => {
    setSelectedHealthData(healthData);
    setIsModalOpen(true);
  };

  // ฟังก์ชันปิดโมดัล
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHealthData(null);
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Menu isSidebarOpen={isSidebarOpen} />
        <div
          className={`flex-1 p-6 overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "w-[calc(100%-14rem)]" : "w-full"
          }`}
        >
          {/* Content */}
          <div className="p-4 h-screen   flex-1 transition-all duration-300">
            <h1 className="text-2xl text-black font-bold mb-4">Health</h1>
            <hr />
            <div className="flex mt-8">
              {/* Div สำหรับช่องค้นหา */}
              <div className="flex space-x-4 flex-grow">
                
                {/* Search Input for Name */}
                <input
                  type="search"
                  placeholder="Search by Name"
                  aria-label="Search"
                  className="p-2 border border-gray-300 rounded-lg text-gray-600 h-8 w-56 text-sm"
                  value={query}
                  onChange={handleSearch}
                />
                {/* Search Input for ID Card */}
                <input
                  type="search"
                  placeholder="Search by ID Card"
                  aria-label="Search"
                  className="p-2 border border-gray-300 rounded-lg text-gray-600 h-8 w-56 text-sm"
                  value={query}
                  onChange={handleSearch}
                />
              </div>

              {/* Div สำหรับปุ่ม search */}
              <div className="flex items-center">
                <button
                  onClick={() => alert("search")}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm h-8 py-2 px-4 rounded-lg flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  search
                </button>
              </div>
            </div>

            <div className="overflow-y-scroll mt-5">
              <table className="min-w-full bg-white mt-5">
                <thead className="bg-blue-300 text-black ">
                  <tr>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold tracking-wider">
                      NAME TH
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold  tracking-wider">
                      NAME EN
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold  tracking-wider">
                      ID CARD NUMBER
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold  tracking-wider">
                      BIRTH DATE
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold tracking-wider">
                      ADDRESS
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold  tracking-wider">
                      HEARTBEAT (bpm)
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold  tracking-wider">
                      SYS (mmhg)
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold  tracking-wider">
                      DIA (mmhg)
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold  tracking-wider">
                      BODY TEMP (°C)
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold  tracking-wider">
                      HEIGHT (cm)
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold  tracking-wider">
                      TIMESTAMP
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {results.map((user, index) => (
                    <tr
                      key={index}
                      onClick={() => openModal(user)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.name_TH}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.name_EN}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.ID_Card}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.date}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.address}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.heartbeat}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.sys}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.dia}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.bodyTemp || "-"}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.height || "-"}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                        {user.timestamp || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* แสดงโมดัล */}
        {isModalOpen && selectedHealthData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl max-w-3xl shadow-lg w-full h-5/6">
              <div className="bg-blue-400 p-6 rounded-t-lg h-20">
                <h2 className="text-xl font-bold mb-4 text-white">
                  User Health Data
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white ">
                  <thead className="bg-gray-100 h-10">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Field
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                        Name (TH)
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {selectedHealthData.name_TH}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                        Name (EN)
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {selectedHealthData.name_EN}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                        ID Card
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {selectedHealthData.ID_Card}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                        Birth Date
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {selectedHealthData.date}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                        Address
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {selectedHealthData.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                        Heartbeat
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {selectedHealthData.heartbeat} bpm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                        Blood Pressure
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {selectedHealthData.sys}/{selectedHealthData.dia} mmHg
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                        Body Temperature
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {selectedHealthData.bodyTemp || "-"} °C
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                        Height
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {selectedHealthData.height || "-"} cm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
                        Timestamp
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {selectedHealthData.timestamp}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-10 text-right mr-5 ">
                <button
                  onClick={closeModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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

export default HealthPage;
