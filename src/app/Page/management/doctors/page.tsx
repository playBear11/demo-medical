"use client";

import { useState } from "react";
import Nav from "@/app/Components/nav";
import Menu from "@/app/Components/menu";
import { FilePenLine } from "lucide-react";

interface Doctor {
  name: string;
  username: string;
  hospital: string;
  gender: string;
  avatar: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. John Doe",
    username: "johndoe",
    hospital: "Hospital A",
    gender: "Male",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dr. Jane Smith",
    username: "janesmith",
    hospital: "Hospital B",
    gender: "Female",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dr. Mike Johnson",
    username: "mikejohnson",
    hospital: "Hospital C",
    gender: "Male",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dr. Sarah Lee",
    username: "sarahlee",
    hospital: "Hospital D",
    gender: "Female",
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

const Doctors = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const openModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-56">
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>
        <div
          className={`p-4 overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "w-[calc(100%-14rem)]" : "w-full"
          }`}
        >
          <h1 className="text-2xl text-black font-bold mt-12 mb-4">Doctors</h1>

          <hr />

          {/* ปุ่ม "Add Member" ที่จะอยู่ขวาล่างของตาราง */}
          <div className="mt-5 flex  justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-400 hover:bg-blue-800 text-white text-sm w-26 h-8 py-2 px-4 rounded-lg flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add
            </button>
          </div>

          <table className="w-full border-collapse bg-gray-50 mt-5">
            <thead>
              <tr className="bg-blue-300">
                <th className=" p-2 text-center text-black text-sm">Profile</th>
                <th className=" p-2 text-center text-black text-sm">
                  Username
                </th>
                <th className=" p-2 text-center text-black text-sm">Name</th>
                <th className=" p-2 text-center text-black text-sm">
                  Hospital
                </th>
                <th className=" p-2 text-center text-black text-sm">Gender</th>
                <th className=" p-2 text-center text-black text-sm">Detail</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className=" p-2">
                    <img
                      src={doctor.avatar || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className=" text-xs  text-gray-600 text-center p-2">
                    {doctor.username}
                  </td>
                  <td className=" text-xs  text-gray-600 text-center p-2">
                    {doctor.name}
                  </td>
                  <td className=" text-xs  text-gray-600 text-center p-2">
                    {doctor.hospital}
                  </td>
                  <td className=" text-xs  text-gray-600 text-center p-2">
                    {doctor.gender}
                  </td>
                  <td className=" text-xs  text-gray-600 text-center p-2">
                    <button
                      onClick={() => openModal(doctor)}
                      className=" text-blue-400 px-3 py-1 rounded hover:text-blue-600 transition-colors"
                    >
                      <FilePenLine className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full">
            {/* Header */}
            <div className="bg-blue-400 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xs font-semibold">Doctor Edit</h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-gray-700 text-sm font-semibold">
                  Information
                </h3>
                <hr />
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedDoctor.username}
                    className="w-full p-2 border rounded focus:outline-none text-black text-xs focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Firstname
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedDoctor.name.split(" ")[1]}
                    className="w-full p-2 border rounded focus:outline-none text-black text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Lastname
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedDoctor.name.split(" ")[2] || ""}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 text-black text-xs focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Gender
                  </label>
                  <select
                    defaultValue={selectedDoctor.gender}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 text-black text-xs focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Hospital
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedDoctor.hospital}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 text-black text-xs focus:ring-blue-500"
                    disabled
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-600 transition-colors mt-6"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Doctors;