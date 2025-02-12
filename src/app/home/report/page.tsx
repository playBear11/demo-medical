"use client";
import React, { useState } from "react";
import Nav from "@/component/nav";
import Menu from "@/component/menu";
import { TextField } from "@mui/material";

const page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedReport, setSelectedReport] = useState("hospital");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex">
        <div className="w-56">
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>
          <div className={`p-4 h-screen overflow-auto transition-all duration-300 ${isSidebarOpen ? "w-[calc(100%-14rem)]" : "w-full"}`}>

          <h1 className="text-2xl flex mt-12 ml-3 text-black font-semibold mb-3">
            Report
          </h1>
          <hr/>
          <p className="text-gray-700 mb-4 text-base ml-3 mt-5"> Choose Report</p>

          <div className="flex space-x-6 text-xs ml-3">
            {" "}
            {/* เปลี่ยนเป็น flex และใช้ space-x-6 สำหรับระยะห่างแนวนอน */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  value="hospital"
                  checked={selectedReport === "hospital"}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="sr-only" // Hide default radio button
                />
                <div
                  className={`w-4 h-4 border-2 rounded-full ${
                    selectedReport === "hospital"
                      ? "border-emerald-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedReport === "hospital" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  )}
                </div>
              </div>
              <span className="text-gray-800">Hospital Report</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  value="users"
                  checked={selectedReport === "users"}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border-2 rounded-full ${
                    selectedReport === "users"
                      ? "border-emerald-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedReport === "users" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  )}
                </div>
              </div>
              <span className="text-gray-800">All Users Report</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  value="patients"
                  checked={selectedReport === "patients"}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border-2 rounded-full ${
                    selectedReport === "patients"
                      ? "border-emerald-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedReport === "patients" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  )}
                </div>
              </div>
              <span className="text-gray-800">All Patients Report</span>
            </label>
          </div>

          <div className="mt-10 ml-3">
           <TextField
           label="Date Start"
           type="date"
           value={startDate} // ใช้ state ของ startDate
           onChange={handleStartDateChange}
           sx={{ width: 400 }} // กำหนดขนาดของ TextField
           InputLabelProps={{
             shrink: true, // ทำให้ label หดเมื่อเลือกวันที่
           }}
         />
       </div>
 
       <div className="mt-5 ml-3">
         <TextField
           label="Date End"
           type="date"
           value={endDate} // ใช้ state ของ endDate
           onChange={handleEndDateChange}
           sx={{ width: 400 }} // กำหนดขนาดของ TextField
           InputLabelProps={{
             shrink: true, // ทำให้ label หดเมื่อเลือกวันที่
           }}
         />
          </div>

          <button className="bg-blue-400 text-white w-96  mt-5 ml-5 h-8 rounded-lg">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};
export default page;
