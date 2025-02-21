"use client";
import { useState } from "react";
import { Card, Modal, Box } from "@mui/material";
import Nav from "@/app/Components/pagecom/nav";
import Menu from "@/app/Components/pagecom/menu";

import HealthData from "@/app/Components/modal/SymptomModal";
import TemperatureModal from "@/app/Components/modal/TemperatureModal";
import BloodSugarModal from "@/app/Components/modal/BloodSugarModal";
import HeartRateModal from "@/app/Components/modal/HeartRateModal";
import OxygenModal from "@/app/Components/modal/OxygenModal";
import BloodPressureModal from "@/app/Components/modal/BloodPressureModal";
import clsx from "clsx";
import { patientData } from "@/app/Data/patient/patient-data";
import { tabs } from "@/app/Data/tab/tab-data";
import { medicalData } from "@/app/Data/medical/medical-data"; // ✅ นำเข้าข้อมูลค่าทางการแพทย์

const HomeWards = () => {
  const [dataTabs, setDataTabs] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [isMedicalModalOpen, setIsMedicalModalOpen] = useState(false);
  const [selectedMedicalItem, setSelectedMedicalItem] = useState<{
    label: string;
    value: string;
    details: string;
  } | null>(null);

  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleModalToggle = (modalName: string) => {
    setOpenModal(openModal === modalName ? null : modalName);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // ปิดโมดัล
  };

  const handleOpenMedicalModal = (item: {
    label: string;
    value: string;
    details: string;
  }) => {
    setSelectedMedicalItem(item);
    setIsMedicalModalOpen(true);
  };

  const handleCloseMedicalModal = () => {
    setIsMedicalModalOpen(false);
    setTimeout(() => setSelectedMedicalItem(null), 300);
  };

  // เพิ่มฟังก์ชั่นในการเปิด Modal แสดงรายละเอียดของผู้ป่วย
  const handleOpenPatientModal = (patient: any) => {
    setSelectedPatient(patient);
    setIsModalOpen(true); // เปิด Modal ของผู้ป่วย
  };

  // ฟังก์ชั่นในการเปิดโมดัลตามประเภทการแพทย์
  const handleOpenMedicalModalByLabel = (item: {
    label: string;
    value: string;
    details: string;
  }) => {
    switch (item.label) {
      case "Symptom":
        setOpenModal("healthData");
        break;
      case "Temperature":
        setOpenModal("temperature");
        break;
      case "Blood Sugar":
        setOpenModal("bloodSugar");
        break;
      case "Heart Rate":
        setOpenModal("heartRate");
        break;
      case "Oxygen":
        setOpenModal("oxygen");
        break;
      case "Blood Pressure":
        setOpenModal("bloodPressure");
        break;
      default:
        setOpenModal(null);
    }
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
          {/* 🔹 Tabs ด้านบน */}
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

          {/* 🔹 รายชื่อผู้ป่วย */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 cursor-pointer">
            {patientData
              .filter(
                (patient) => dataTabs === "all" || patient.status === dataTabs
              )
              .map((patient, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden rounded-none border border-gray-300 hover:bg-gray-100"
                  sx={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
                  onClick={() => handleOpenPatientModal(patient)}
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
                      src="https://i.pinimg.com/1200x/b6/27/a0/b627a0dd92e5fbe11d13b856eebe7a56.jpg"
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
            <div className="flex justify-center space-x-10 text-sm text-gray-500">
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
                {medicalData.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 "
                    onClick={() => handleOpenMedicalModalByLabel(item)}
                  >
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
              
              Close
            </button>
          </Box>
        </Modal>

        {/* โมดัลที่เปิดตามค่าทางการแพทย์ */}
        <Modal
          open={openModal === "healthData"}
          onClose={() => setOpenModal(null)}
        >
          <HealthData
            isOpen={openModal === "healthData"}
            onClose={() => setOpenModal(null)}
          />
        </Modal>

        <Modal
          open={openModal === "temperature"}
          onClose={() => setOpenModal(null)}
        >
          <TemperatureModal
            isOpen={openModal === "temperature"}
            onClose={() => setOpenModal(null)}
          />
        </Modal>

        <Modal
          open={openModal === "bloodSugar"}
          onClose={() => setOpenModal(null)}
        >
          <BloodSugarModal
            isOpen={openModal === "bloodSugar"}
            onClose={() => setOpenModal(null)}
          />
        </Modal>

        <Modal
          open={openModal === "heartRate"}
          onClose={() => setOpenModal(null)}
        >
          <HeartRateModal
            isOpen={openModal === "heartRate"}
            onClose={() => setOpenModal(null)}
          />
        </Modal>

        <Modal open={openModal === "oxygen"} onClose={() => setOpenModal(null)}>
          <OxygenModal
            isOpen={openModal === "oxygen"}
            onClose={() => setOpenModal(null)}
          />
        </Modal>

        <Modal
          open={openModal === "bloodPressure"}
          onClose={() => setOpenModal(null)}
        >
          <BloodPressureModal
            isOpen={openModal === "bloodPressure"}
            onClose={() => setOpenModal(null)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default HomeWards;
