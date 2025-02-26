"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BloodGlucoseData } from "@/app/Data/medical/medical-data";

// กำหนด props ของ BloodSugarModal
interface BloodSugarModalProps {
  isOpen: boolean; // เช็คว่า modal เปิดอยู่หรือไม่
  onClose: () => void; // ฟังก์ชันสำหรับปิด modal
}

const BloodSugarModal: React.FC<BloodSugarModalProps> = ({
  isOpen,
  onClose,
}) => {
  // สถานะที่ใช้เก็บข้อมูลน้ำตาลในเลือด
  const [data, setData] = useState<BloodGlucoseData[]>([]);
  // สถานะการโหลดข้อมูล
  const [loading, setLoading] = useState<boolean>(false);
  // สถานะข้อผิดพลาด
  const [error, setError] = useState<string | null>(null);
  // สถานะการเรียงลำดับ
  const [sortConfig, setSortConfig] = useState<{
    key: keyof BloodGlucoseData;
    direction: "ascending" | "descending";
  } | null>(null);

  // ดึงข้อมูลเมื่อ modal เปิด
  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  // ฟังก์ชันดึงข้อมูลน้ำตาลในเลือดจาก API
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blood-glucose/?person=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // ตรวจสอบผลลัพธ์และแปลงข้อมูล
      const bloodGlucoseData = response.data.results || [];

      // แปลงข้อมูลให้ตรงกับ interface ที่กำหนด
      const formattedData: BloodGlucoseData[] = bloodGlucoseData.map(
        (item: {
          blood_glucose: number;
          created_at: string;
          created_by: any;
        }) => ({
          glucose: item.blood_glucose,
          date: item.created_at.split("T")[0], // ใช้แยกวันที่จาก timestamp
          time: item.created_at.split("T")[1]?.split("+")[0] || "", // แยกเวลา
          location: item.created_by ? "Hospital" : "Unknown", // สมมุติค่าของ location
          status:
            item.blood_glucose > 180
              ? "ฉุกเฉิน"
              : item.blood_glucose > 120
                ? "สุ่มเสี่ยง"
                : "ปกติ", // กำหนดสถานะตามค่าน้ำตาล
        })
      );

      setData(formattedData);
    } catch (err) {
      console.error("Error fetching blood glucose data:", err);
      if (axios.isAxiosError(err)) {
        setError(
          "Failed to fetch data: " + (err.response?.data?.detail || err.message)
        );
      } else {
        setError("Failed to load data");
      }
    } finally {
      setLoading(false);
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
  const requestSort = (key: keyof BloodGlucoseData) => {
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
  const getSortIcon = (key: keyof BloodGlucoseData) => {
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
            บันทึกระดับน้ำตาลในเลือด
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
                    onClick={() => requestSort("glucose")}
                  >
                    ค่าน้ำตาล (mg/dL) {getSortIcon("glucose")}
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
                            <svg
                              className="w-5 h-5 mr-2 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              ></path>
                            </svg>
                            <span className="font-medium">{item.glucose}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.time}
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
                          <p className="mt-1 text-sm">
                            ไม่พบข้อมูลน้ำตาลในเลือด
                          </p>
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
            onClick={fetchData}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm mr-2 transition-colors"
          >
            รีเฟรช
          </button>
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

export default BloodSugarModal;
