"use client";

import React from "react";

interface BloodSugarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BloodSugarModal: React.FC<BloodSugarModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
        <h3 className="text-xl font-semibold">Blood Sugar Details</h3>
        <table className="mt-4 min-w-full table-auto">
          <thead>
            <tr className="border p-2 text-center text-sm">
              <th>Glucos</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border p-2 text-xs text-center">
              <td>17</td>
              <td>2024-07-10</td>
              <td>10:51</td>
              <td>ไม่มีข้อมูล</td>
              <td>สุ่มเสี่ยง</td>
            </tr>
            <tr className="border p-2 text-xs text-center">
              <td>227</td>
              <td>2024-07-10</td>
              <td>10:48</td>
              <td>ไม่มีข้อมูล</td>
              <td>ฉุกเฉิน</td>
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

export default BloodSugarModal;
