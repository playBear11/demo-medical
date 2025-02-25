"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface BloodSugarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface entry {
 glucose: number
  date: string
  time: string
  location: string
  ID_Card: string
  gender: string
  username: string
  email: string
  first_name: string
  last_name: string
}
const BloodSugarModal: React.FC<BloodSugarModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [results, setResults] = useState<any[]>([]); // ผลลัพธ์การค้นหาจะเริ่มต้นเป็นข้อมูลทั้งหมด
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access_token"); // ตรวจสอบว่า token มีค่าหรือไม่
        if (!token) {
          console.error("No access token found");
          return; // ถ้าไม่มี token ก็ไม่ทำการ fetch
        }

        const response = await axios.get(
          "http://192.168.1.94:8005/api/blood-glucose/?person=1",
          {
            headers: {
              Authorization: `Bearer ${token}`, // ส่ง token ใน Header
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);  // ดูข้อมูลที่ได้รับจาก API

        const usersData = response.data.results;
        setUsers(usersData);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "ฉุกเฉิน":
        return "text-red-500"; // Red color for "ฉุกเฉิน"
      case "สุ่มเสี่ยง":
        return "text-yellow-500"; // Yellow color for "สุ่มเสี่ยง"
      case "ปกติ":
        return "text-green-500"; // Green color for "ปกติ"
      default:
        return "text-gray-500"; // Default color if status is unknown
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
        <h3 className="text-xl font-semibold">Blood Sugar Details</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Glucos", "Date", "Time", "Location", "Status"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {users.length > 0 ? (
              users.map((entry, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm">
                    {entry.glucose}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {entry.date}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {entry.time}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    {entry.location}
                  </td>
                  <td
                    className={`px-6 py-4 text-center text-sm ${getStatusClass(entry.status)}`}
                  >
                    {entry.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-gray-600 text-sm"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end">
          <button
            className="mt-4 text-white bg-blue-500 hover:bg-blue-700 p-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BloodSugarModal;
