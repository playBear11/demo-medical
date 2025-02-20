"use client";

import React from "react";

interface TemperatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TemperatureModal: React.FC<TemperatureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

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
        <h3 className="text-xl font-semibold">Temperature Details</h3>
        <table className="mt-4 min-w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="border p-2 text-center text-sm">
              <th>Temp</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody >
            <tr className="border p-2 text-xs text-center">
              <td>35.9</td>
              <td>2024-07-10</td>
              <td>10:28</td>
              <td>
                444 Olympia Thai Plaza 2nd Fl, แขวงสามเสนนอก เขตห้วยขวาง
                กรุงเทพมหานคร 10310, Thailand
              </td>
              <td className={getStatusClass("สุ่มเสี่ยง")}>สุ่มเสี่ยง</td>
            </tr>
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

export default TemperatureModal;
