"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/app/Components/pagecom/nav";
import Menu from "@/app/Components/pagecom/menu";
import AddModal from "@/app/Components/modal/addModal";
import DeleteModal from "@/app/Components/modal/deleteModal";
import EditModal from "@/app/Components/modal/editModal";
import { FaSearch } from "react-icons/fa";

// กำหนด Interface สำหรับ props ที่ใช้ใน  user
interface Patient {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  id_card: string;
  gender: string;
  hn_number: string;
  hospital: string;
  last_record: string;
}


const Patient = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ควบคุม Sidebar

  // ตัวอย่างข้อมูลผู้ใช้ (users)
  const [users, setUsers] = useState<Patient[]>([]);

  // Code สำหรับ users และ State อื่น ๆ

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); //Modal การเพิ่มสมาชิก
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //Modal การแก้ไขสมาชิก
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); //Modal การลบสมาชิก
  const [selectedUser, setSelectedUser] = useState<any>(null); //ใช้เก็บข้อมูลของผู้ใช้ที่เลือก

  // สเตทสำหรับเก็บคำค้นหา
  const [query, setQuery] = useState(""); // คำค้นหาที่ผู้ใช้พิมพ์
  const [results, setResults] = useState(users); // ผลลัพธ์การค้นหาจะเริ่มต้นเป็นข้อมูลทั้งหมด

  // ฟังก์ชันสำหรับค้นหาผู้ใช้
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase(); // รับค่าจากช่องค้นหาและแปลงให้เป็นตัวพิมพ์เล็ก
    setQuery(searchQuery); // อัปเดตคำค้นหาที่ผู้ใช้พิมพ์

    if (searchQuery) {
      // ค้นหาข้อมูลผู้ใช้ที่ตรงกับคำค้นหาหรือไม่  โดยใช้ฟังก์ชัน filter
      const filtered = users.filter(
        (user) =>
          user.id_card.includes(searchQuery) ||
          user.hn_number.toLowerCase().includes(searchQuery) ||
          user.first_name.toLowerCase().includes(searchQuery) ||
          user.last_name.toLowerCase().includes(searchQuery) ||
          user.email.toLowerCase().includes(searchQuery)
      );
      setResults(filtered); // อัปเดตผลลัพธ์การค้นหาด้วยข้อมูลที่กรองแล้ว
    } else {
      setResults(users); // หากช่องค้นหาว่าง ให้แสดงข้อมูลทั้งหมด
    }
  };
// ฟังก์ชันจัดการการเพิ่มผู้ใช้
const handleAddUser = (userData: {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}) => {
  const newUser: Patient = {
    ...userData,
    avatar: "https://shorturl.asia/vn8Jr", // กำหนดค่า default
    id_card: (users.length > 0
      ? Math.max(...users.map((user) => Number.parseInt(user.id_card))) + 1
      : 1
    ).toString(),
    gender: "M",
    hn_number: `HN${(users.length > 0
      ? Math.max(
          ...users.map((user) =>
            Number.parseInt(user.hn_number.replace("HN", ""))
          )
        ) + 1
      : 1
    )
      .toString()
      .padStart(3, "0")}`, // เพิ่มหมายเลข HN อัตโนมัติ
    hospital: "test",
    last_record: new Date().toISOString(),
  };
  const updatedUsers = [...users, newUser];
  setUsers(updatedUsers);
  setResults(updatedUsers);
  setIsAddModalOpen(false);
};

// ฟังก์ชันจัดการการลบผู้ใช้
const handleDeleteUser = (user: Patient) => {
  if (!user) return;
  setUsers((prevUsers) =>
    prevUsers.filter((u) => u.id_card !== user.id_card)
  );
  setResults((prevResults) =>
    prevResults.filter((u) => u.id_card !== user.id_card)
  );
};

const handleDelete = () => {
  if (selectedUser) {
    handleDeleteUser(selectedUser);
    setIsDeleteModalOpen(false);
  }
};

// อัพเดทเวลา
const [currentTime, setCurrentTime] = useState(
  new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })
);



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("en-EN", { timeZone: "Asia/Bangkok" })
      ); // อัปเดตเวลาทุกๆ 1 วินาที
    }, 1000);

    return () => clearInterval(timer); // ล้าง timer เมื่อ component ถูก unmount
  }, []);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Nav
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Menu isSidebarOpen={isSidebarOpen} />
        <div
          className={`flex-1 p-6 overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "w-[calc(100%-14rem)]" : "w-full"
          }`}
        >
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Patient Management
            </h1>

            {/* Search and Add Button */}
            <div className="flex justify-between items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={query}
                  onChange={handleSearch}
                  className="w-64 px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Patient
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Card Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      HN Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hospital
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Record
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((patient) => (
                    <tr
                      key={patient.id_card} //เลขบัตร
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img //รูป
                            src={patient.avatar || "/placeholder.svg"}
                            alt={`${patient.first_name} ${patient.last_name}`}
                            className="h-10 w-10 rounded-full object-cover"
                          />

                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {patient.first_name} {patient.last_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {patient.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.id_card}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.hn_number}
                      </td>
                      <td className="px-6 py-ิ4 whitespace-nowrap text-sm text-gray-500">
                        {patient.hospital}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(patient.last_record).toLocaleDateString()}{" "}
                        {/* */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedUser(patient);
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(patient);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modals */}
          <AddModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddUser}
          />

          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={selectedUser}
            onSubmit={(updatedUser) => {
              const updatedUsers = users.map((user) =>
                user.id_card === updatedUser.id_card ? updatedUser : user
              );
              setUsers(updatedUsers);
              setResults(updatedUsers);
              setIsEditModalOpen(false);
            }}
          />

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDelete}
            user={selectedUser}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
      </div>
    </div>
  );
};
export default Patient;