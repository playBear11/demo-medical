"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TemperatureData } from "@/app/Data/medical/medical-data";

// กำหนด props ของ TemperatureModal
interface TemperatureModalProps {
  isOpen: boolean; // เช็คว่า modal เปิดอยู่หรือไม่
  onClose: () => void; // ฟังก์ชันสำหรับปิด modal
}

const TemperatureModal: React.FC<TemperatureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState<TemperatureData[]>([]);
  // สถานะการโหลดข้อมูล
  const [loading, setLoading] = useState<boolean>(false);
  // สถานะข้อผิดพลาด
  const [error, setError] = useState<string | null>(null);
  // สถานะการเรียงลำดับ
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TemperatureData;
    direction: "ascending" | "descending";
  } | null>(null);

  // ดึงข้อมูลเมื่อ modal เปิด
  useEffect(() => {
    if (isOpen) {
      fetchTemperatureData();
    }
  }, [isOpen]);

  // ฟังก์ชันดึงข้อมูลอุณหภูมิจาก API
  const fetchTemperatureData = async () => {
    setLoading(true); // ตั้งค่าให้กำลังโหลด
    setError(null); // เคลียร์ข้อผิดพลาด
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found");
        return;
      }
      const response = await axios.get(
       `${process.env.NEXT_PUBLIC_API_URL}/api/body-temperature/?person=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // ตรวจสอบผลลัพธ์และแปลงข้อมูล
      if (response.data?.results) {
        const formattedData = response.data.results.map((item: any) => ({
          temp: parseFloat(item.body_temp), // แปลงอุณหภูมิเป็นตัวเลข
          date: item.created_at.split("T")[0], // ดึงวันที่
          time: item.created_at.split("T")[1].split("+")[0], // ดึงเวลา
          location: "ไม่ระบุ", // ใส่สถานที่เป็นค่าเริ่มต้น
          status:
            parseFloat(item.body_temp) >= 38
              ? "ฉุกเฉิน"
              : parseFloat(item.body_temp) >= 37.5
                ? "สุ่มเสี่ยง"
                : "ปกติ", // กำหนดสถานะตามอุณหภูมิ
        }));
        setData(formattedData); // ตั้งค่า data ใหม่
      } else {
        setData([]); // ถ้าไม่มีข้อมูล ให้เป็นอาร์เรย์ว่าง
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          "Failed to fetch data: " +
            (error.response?.data?.detail || error.message)
        );
      }
    } finally {
      setLoading(false); // ปิดการโหลด
    }
  };

  // ฟังก์ชันเลือกคลาสสีตามสถานะ
  const getStatusClass = (status: string) => {
    switch (status) {
      case "ฉุกเฉิน":
        return "bg-red-100 text-red-800 font-semibold";
      case "สุ่มเสี่ยง":
        return "bg-yellow-100 text-yellow-800 font-semibold";
      case "ปกติ":
        return "bg-green-100 text-green-800 font-semibold";
      default:
        return "text-gray-500";
    }
  };

  // ฟังก์ชันเรียงลำดับข้อมูล
  const requestSort = (key: keyof TemperatureData) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // เรียงลำดับข้อมูล
  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // แสดงไอคอนการเรียงลำดับ
  const getSortIcon = (key: keyof TemperatureData) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <span className="text-gray-300">↕</span>;
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  // ถ้า modal ไม่เปิดก็ไม่ต้องแสดงอะไร
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-4/5 max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            บันทึกอุณหภูมิร่างกาย
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto flex-1">
          {/* แสดงข้อความเมื่อกำลังโหลด */}
          {loading && (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* แสดงข้อความข้อผิดพลาด */}
          {error && (
            <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-4">
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {error}
              </p>
            </div>
          )}

          {/* ตาราง */}
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("temp")}
                  >
                    อุณหภูมิ {getSortIcon("temp")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("date")}
                  >
                    วันที่ {getSortIcon("date")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("time")}
                  >
                    เวลา {getSortIcon("time")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("location")}
                  >
                    สถานที่ {getSortIcon("location")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("status")}
                  >
                    สถานะ {getSortIcon("status")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.length > 0
                  ? sortedData.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                           
                            <span className="font-medium">
                              {item.temp.toFixed(1)}°C
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(item.date).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.time.substring(0, 5)} น.
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusClass(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  : !loading && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
                            ></path>
                          </svg>
                          <p className="mt-1 text-sm">ไม่พบข้อมูลอุณหภูมิ</p>
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end">
          <button
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm transition-colors"
            onClick={onClose}
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemperatureModal;
