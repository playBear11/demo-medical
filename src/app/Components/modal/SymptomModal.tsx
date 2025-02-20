"use client";
import { useState } from "react";

interface HealthDataProps {
  isOpen: boolean;
  onClose: () => void;
}

const HealthData: React.FC<HealthDataProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // ข้อมูลวันที่และอาการ
  const checkData = [
    { date: "10 January 2568", symptom: "Coughing" },
    { date: "12 January 2568", symptom: "Fever" },
    { date: "15 January 2568", symptom: "Headache" },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 relative">
        {/* ปุ่มกากบาทสำหรับปิดโมดัล */}
        <button
          className="absolute top-2 right-2 text-gray-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h3 className="text-xl font-semibold mb-4">Symptom Check Dates</h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left text-sm font-medium text-gray-600">Symptom</th>
              <th className="p-2 text-left text-sm font-medium text-gray-600">Date of Check</th>
            </tr>
          </thead>
          <tbody>
            {checkData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 text-sm">{item.symptom}</td>
                <td className="p-2 text-sm">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthData;
