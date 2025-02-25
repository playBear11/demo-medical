"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Nav from "@/app/Components/pagecom/nav"
import Menu from "@/app/Components/pagecom/menu"
import { FilePenLine } from "lucide-react"
import axios from "axios"
import type { Nurse } from "@/app/Data/nurse/nurses-data" // นำเข้า data

const Nurse = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNurse, setSelectedNursesr] = useState<Nurse | null>(null) // ข้อมูลแพทย์ที่เลือก
  const [editedNurse, setEditedNurse] = useState<Nurse | null>(null) // ข้อมูลที่แก้ไข
  const [users, setUsers] = useState<Nurse[]>([])
  const [results, setResults] = useState<Nurse[]>([]) // เริ่มต้นด้วย array ว่าง

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access_token") // หรือที่คุณเก็บ token ไว้
        const response = await axios.get("http://192.168.1.94:8005/auths/users/?profession__rank=2", {
          headers: {
            Authorization: `Bearer ${token}`, // 🔹 เพิ่ม Token ใน Header
            "Content-Type": "application/json",
          },
        })
        const usersData = response.data.results
        setUsers(usersData)
        setResults(usersData)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  const openModal = (nurse: Nurse) => {
    setSelectedNursesr(nurse)
    setEditedNurse({
      ...nurse,
      first_name: nurse.name.split(" ")[0], // แยก firstname
      last_name: nurse.name.split(" ")[1] || "", // แยก lastname
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedNursesr(null)
    setEditedNurse(null)
    setIsModalOpen(false)
  }

  // ฟังก์ชันที่ใช้สำหรับการแก้ไขข้อมูลในฟอ��์ม
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (editedNurse) {
      setEditedNurse({
        ...editedNurse,
        [name]: value,
      })
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editedNurse) {
      // อัปเดตชื่อเต็มหลังจากแก้ไข
      const updatedNurseName = `${editedNurse.first_name} ${editedNurse.last_name}`

      // อัปเดตข้อมูลแพทย์ที่เลือกใน array
      const updatedNurses = users.map((nurseItem: { username: string }) =>
        nurseItem.username === editedNurse.username ? { ...editedNurse, name: updatedNurseName } : nurseItem,
      )

      console.log("Updated Nurse:", editedNurse)
      setIsModalOpen(false) // ปิด Modal หลังจากบันทึก
    }
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
          <div className="p-4 overflow-auto flex-1">
            <h1 className="text-2xl text-black font-bold mb-4">Nurse</h1>
            <hr />
            <div className="mt-5 flex justify-end">
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
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Profile", "Username", "Name", "Hospital", "Gender", "Detail"].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(results) && results.length > 0 ? (
                    results.map((nurse) => (
                      <tr key={nurse.id}>
                        <td className="px-6 py-4 flex justify-center">
                          <img
                            src={nurse.avatar || "/placeholder.svg"}
                            alt={nurse.username}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </td>
                        {[nurse.username, `${nurse.first_name} ${nurse.last_name}`, nurse.hospital, nurse.gender].map(
                          (value, i) => (
                            <td key={i} className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                              {value}
                            </td>
                          ),
                        )}
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => openModal(nurse)} className="text-blue-600 hover:text-blue-900">
                            <FilePenLine className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-600 text-sm">
                        No nurses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isModalOpen && selectedNurse && editedNurse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg max-w-md w-full">
              {/* Header */}
              <div className="bg-blue-400 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
                <h2 className="text-xs font-semibold">Nurse Edit</h2>
                <button onClick={closeModal} className="text-white hover:text-gray-200">
                  ✕
                </button>
              </div>

              {/* Form */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-gray-700 text-sm font-semibold">Information</h3>
                  <hr />
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Username</label>
                    <input
                      type="text"
                      defaultValue={selectedNurse.username}
                      className="w-full p-2 border rounded focus:outline-none text-black text-xs focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Firstname</label>
                    <input
                      type="text"
                      name="firstname"
                      value={editedNurse.first_name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none text-black text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Lastname</label>
                    <input
                      type="text"
                      name="lastname"
                      value={editedNurse.last_name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 text-black text-xs focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={editedNurse.gender}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 text-black text-xs focus:ring-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Hospital</label>
                    <input
                      type="text"
                      defaultValue={selectedNurse.hospital}
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
    </div>
  )
}

export default Nurse

