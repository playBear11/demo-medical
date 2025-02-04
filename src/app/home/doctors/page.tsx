"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/component/nav";
import Menu from "@/component/menu";

const Doctors = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  interface Doctor {
    name: string;
    speciality: string;
    department: string;
    position: string;
    avatar: string;
  }

  const openModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setIsModalOpen(false);
  };

  const DoctorCard = ({ doctor, onClick }: { doctor: Doctor; onClick: () => void }) => (
    <div
      className="bg-blue-100 p-4 rounded-xl shadow-md flex items-center gap-4 cursor-pointer"
      onClick={onClick}
    >
      <img src={doctor.avatar} alt={doctor.name} className="w-16 h-16 rounded-full" />
      <div>
        <h3 className="text-lg font-semibold text-black">{doctor.name}</h3>
        <p className="text-gray-500">{doctor.speciality}</p>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex">
        <div className="w-56">
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>
        <div className={`p-4 h-screen overflow-auto transition-all duration-300 ${isSidebarOpen ? "w-[calc(100%-14rem)]" : "w-full"}`}>
        
            <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-4 gap-6 h-32">
              {[{
                name: "Dr. John Doe",
                speciality: "General Practitioner",
                department: "General Medicine",
                position: "Senior Doctor",
                avatar: "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png"
              }, {
                name: "Dr. Jane Smith",
                speciality: "Dermatologist",
                department: "General Medicine",
                position: "Senior Doctor",
                avatar: "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png"
              }, {
                name: "Dr. Jane Smith",
                speciality: "Dermatologist",
                department: "General Medicine",
                position: "Senior Doctor",
                avatar: "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png"
              }, {
                name: "Dr. Jane Smith",
                speciality: "Dermatologist",
                department: "General Medicine",
                position: "Senior Doctor",
                avatar: "https://png.pngtree.com/png-clipart/20241003/original/pngtree-doctor-cartoon-illustration-png-image_16179286.png"
                
              }].map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} onClick={() => openModal(doctor)} />
              ))}
            </div>
          </div>
        </div>
     
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-4 text-black flex items-center justify-center">{selectedDoctor.name}</h2>
            <p className="text-sm text-black">
              Department : {selectedDoctor.department} <br />
              Position : {selectedDoctor.position} <br />
              Speciality : {selectedDoctor.speciality}
            </p>
            <div className="flex justify-end mt-4">
              <button onClick={closeModal} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
