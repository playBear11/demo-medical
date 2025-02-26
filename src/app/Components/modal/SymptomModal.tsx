"use client";

import { useState } from "react";

interface HealthDataProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SymptomData {
  symptom: string;
  date: string;
}

const HealthData: React.FC<HealthDataProps> = ({ isOpen, onClose }) => {
  // ข้อมูลวันที่และอาการ
  const checkData = [
    { date: "10 January 2568", symptom: "Coughing" },
    { date: "12 January 2568", symptom: "Fever" },
    { date: "15 January 2568", symptom: "Headache" },
  ];

  // สถานะการเรียงลำดับ
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SymptomData;
    direction: 'ascending' | 'descending';
  } | null>(null);

  // ฟังก์ชันเรียงลำดับข้อมูล
  const requestSort = (key: keyof SymptomData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // เรียงลำดับข้อมูล
  const sortedData = (() => {
    let sortableItems = [...checkData];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  })();

  // แสดงไอคอนการเรียงลำดับ
  const getSortIcon = (key: keyof SymptomData) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <span className="text-gray-300">↕</span>;
    }
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  // ฟังก์ชันเลือกคลาสสีตามอาการ
  const getSymptomClass = (symptom: string) => {
    switch (symptom.toLowerCase()) {
      case "fever":
        return "bg-red-100 text-red-800 font-semibold";
      case "coughing":
        return "bg-yellow-100 text-yellow-800 font-semibold";
      case "headache":
        return "bg-orange-100 text-orange-800 font-semibold";
      default:
        return "bg-blue-100 text-blue-800 font-semibold";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-4/5 max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">ข้อมูลอาการผู้ป่วย</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto flex-1">
          {/* ตาราง */}
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('symptom')}
                  >
                    อาการ {getSortIcon('symptom')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('date')}
                  >
                    วันที่ตรวจ {getSortIcon('date')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.length > 0 ? (
                  sortedData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 rounded-full ${getSymptomClass(item.symptom)}`}>
                          {item.symptom}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>{item.date}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-6 py-10 text-center text-gray-500">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
                      </svg>
                      <p className="mt-1 text-sm">ไม่พบข้อมูลอาการ</p>
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

export default HealthData;