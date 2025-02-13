"use client";
import { useState, useEffect } from "react"; // Importing React hooks
import { Card, Modal, Box } from "@mui/material";
import Nav from "@/app/Components/nav";
import Menu from "@/app/Components/menu";
import clsx from "clsx";

// Sample data with status
const patientData = [
  {
    name: "Mr. John",
    date: "05/02/2025",
    hn: "123456789",
    status: "high", // red
  },
  {
    name: "Mr. Smith",
    date: "05/02/2025",
    hn: "987654321",
    status: "low", // yellow
  },
  {
    name: "Mrs. Jane",
    date: "05/02/2025",
    hn: "456789123",
    status: "normal", // green
  },
  {
    name: "Ms. Sarah",
    date: "05/02/2025",
    hn: "789123456",
    status: "high", // red
  },
];

const tabs = [
  { title: "All", value: "all" },
  { title: "High", value: "high" },
  { title: "Low", value: "low" },
  { title: "Normal", value: "normal" },
];

const HomeWards = () => {
  const [dataTabs, setDataTabs] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะการเปิดโมดัล
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [modalDetailTitle, setModalDetailTitle] = useState<string>("");
  const [modalDetailContent, setModalDetailContent] = useState<string>("");

  const handleCardClick = (patient: any) => {
    setSelectedPatient(patient);
    setModalContent(
      <div>
        <h2>{patient.name}</h2>
        <p>  <strong>Date:</strong> {patient.date} </p>
        <p>  <strong>HN:</strong> {patient.hn} </p>
        <p>  <strong>Status:</strong> {patient.status} </p>
      </div>
    );
    setIsModalOpen(true); // เปิดโมดัล
  };

  const handleCloseModal = () => { setIsModalOpen(false); // ปิดโมดัล
    const handleOpenDetailModal = (label: string, value: string) => {
      setModalDetailTitle(label);
      setModalDetailContent(value);
      setIsModalOpen(true);
    };

    const handleCloseDetailModal = () => {  setIsModalOpen(false);
    };
    throw new Error("Function not implemented.");
  };

  function handleOpenDetailModal(label: string, value: string): void {
    throw new Error("Function not implemented.");
  }

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
          <div className="flex">
            <div className="flex w-96 border-b justify-start">
              {tabs.map(({ title, value }) => (
                <span
                  key={value}
                  onClick={() => setDataTabs(value)}
                  className={clsx(
                    "cursor-pointer flex-1 py-2 text-center text-sm font-medium transition-colors",
                    value === dataTabs
                      ? "border-b-4 border-blue-500 text-blue-700"
                      : "text-gray-500 hover:text-blue-500"
                  )}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {patientData
              .filter(
                (patient) => dataTabs === "all" || patient.status === dataTabs
              )
              .map((patient, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden rounded-none border border-gray-300"
                  sx={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
                  onClick={() => handleCardClick(patient)} // คลิกที่การ์ดเพื่อเปิดโมดัล
                >
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div
                      className={clsx(
                        "absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16",
                        {
                          "bg-red-500": patient.status === "high",
                          "bg-yellow-500": patient.status === "low",
                          "bg-green-500": patient.status === "normal",
                        }
                      )}
                    />
                  </div>
                  <div className="flex items-center p-4">
                    <img
                      src="https://shorturl.asia/QNoP1"
                      alt="profile"
                      className="w-28 h-28 rounded-full mr-4"
                    />
                    <div className="text-xs">
                      <h2>{patient.name}</h2>
                      <p>
                        <strong>Date:</strong> {patient.date}
                      </p>
                      <p>
                        <strong>HN:</strong> {patient.hn}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>

      {/* โมดัล */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1100,
            height: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            padding: 3,
            boxShadow: 24,
          }}
        >
          <div className="flex space-x-14 text-sm text-gray-500">
            {/* 🔹 ฝั่งซ้าย: ข้อมูลผู้ป่วย */}
            <div className="w-64 h-96 flex flex-col items-center p-4 border-r ">
              {/* รูปอยู่ตรงกลาง */}
              <img
                src="https://shorturl.asia/QNoP1"
                alt="patient profile"
                className="w-40 h-40 rounded-full border"
              />

              {/* ข้อความชิดซ้าย */}
              <div className="text-left w-full mt-4 space-y-2 text-sm">
                <h2 className="text-base font-semibold mt-5">
                  {selectedPatient?.name}
                </h2>
                <p>TEL: {selectedPatient?.number || "069998555"}</p>
                <p>HN: {selectedPatient?.hn}</p>
                <p>Weight: {selectedPatient?.weight || "52 kg"}</p>
              </div>
            </div>

            {/* 🔹 ฝั่งขวา: ค่าทางการแพทย์ */}
            <div className="w-2/3 grid grid-cols-2 gap-6 ">
              {[
                { label: "Symptom", value: "Coughing" },
                { label: "Temperature", value: "37.5°C" },
                { label: "Blood Sugar", value: "120 mg/dL" },
                { label: "Heart Rate", value: "80 bpm" },
                { label: "Oxygen", value: "98%" },
                { label: "Blood Pressure", value: "120/80 mmHg" },
              ].map((item) => (
                <div key={item.label} className="p-3 border rounded-lg shadow-sm" >
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-lg font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 ปุ่ม Close */}
          <button
            onClick={handleCloseModal}
            className="mt-10 mr-4 text-red-500 font-semibold float-right"
          >
            {" "}
            Close{" "}
          </button>
        </Box>
      </Modal>

      {/* 🔹 โมดัลสำหรับดูรายละเอียดเพิ่มเติม 
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            padding: 3,
            boxShadow: 24,
          }}
        >
          <h2 className="text-lg font-semibold">{modalDetailTitle}</h2>
          <p className="mt-2">{modalDetailContent}</p>
          <button
            onClick={handleCloseModal}
            className="mt-4 text-blue-500"
          >
            Close
          </button>
        </Box>
      </Modal>*/}
    </div>
  );
};

export default HomeWards;
