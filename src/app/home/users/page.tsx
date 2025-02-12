"use client";
import React, { use, useEffect, useState } from "react";
import Nav from "@/component/nav";
import Menu from "@/component/menu";
import AddModal from "@/component/modal/adduser";
import DeleteModal from "@/component/modal/delete";
import EditModal from "@/component/modal/edit";
import clsx from "clsx";
import { FilePenLine, FileX } from "lucide-react";

interface Users {
  id: any;
  profile: string;
  HN_Number: string;
  name: string;
  ID_Card: string;
  gender: string;
}

const Users = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ควบคุม Sidebar
  // ตัวอย่างข้อมูลผู้ใช้ (users)
  const [users, setUsers] = useState<Users[]>([
    {
        profile: "https://github.com/shadcn.png",
        HN_Number: "1255555",
        name: "macros",
        ID_Card: "********",
        gender: "Male",
        id: undefined
    },
    {
        profile: "https://github.com/shadcn.png",
        HN_Number: "1255556",
        name: "maxy",
        ID_Card: "********",
        gender: "Female",
        id: undefined
    },
    {
        profile: "https://github.com/shadcn.png",
        HN_Number: "1255557",
        name: "macro",
        ID_Card: "********",
        gender: "Male",
        id: undefined
    },
    {
        profile: "https://github.com/shadcn.png",
        HN_Number: "1255558",
        name: "macy",
        ID_Card: "********",
        gender: "Female",
        id: undefined
    },
  ]);

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
          user.name.toString().includes(searchQuery) ||
          user.HN_Number.toLowerCase().includes(searchQuery) ||
          user.ID_Card.toLowerCase().includes(searchQuery)
      );
      setResults(filtered); // อัปเดตผลลัพธ์การค้นหาด้วยข้อมูลที่กรองแล้ว
    } else {
      setResults(users); // หากช่องค้นหาว่าง ให้แสดงข้อมูลทั้งหมด
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // สร้างอาร์เรย์ใหม่ที่รวมผู้ใช้เดิมทั้งหมดคือ ยูส และเพิ่มผู้ใช้ใหม่ นิวยูส
  const handleAddUsers = (userData: { username: string; email: string; first_name: string; last_name: string; }) => {
    const newUser: Users = {
      id: undefined,
      profile: "https://github.com/shadcn.png",
      HN_Number: "1234567",
      name: `${userData.first_name} ${userData.last_name}`,
      ID_Card: "********",
      gender: "Unknown",
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers); // อัปเดตสถานะของ users ด้วยอาร์เรย์ที่มีข้อมูลใหม่ (updatedUsers)
    setResults(updatedUsers); //// อัปเดตสถานะของผลลัพธ์การแสดงผล (results) ด้วยอาร์เรย์ที่มีข้อมูลใหม่ (updatedUsers)
    setIsAddModalOpen(false);
  };


const closeAddModal = () => {
  setIsAddModalOpen(false); // ปิด modal
};

// ฟังก์ชันสำหรับเปิด Modal การแก้ไขข้อมูล
const openEditModal = (user: any) => {
    setSelectedUser(user); // ตั้งค่าผู้ใช้ที่เลือก
    setIsEditModalOpen(true); // เปิด EditModal
  };

  // ฟังก์ชันสำหรับเปิด Modal การลบข้อมูล
  const openDeleteModal = (user: any) => {
    setSelectedUser(user); // กำหนด user ที่เลือก
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // ตั้งค่า isOpen เป็น false เพื่อปิด Modal
  };

  const handleDeleteUser = (user: any) => {
    if (!user) return; // ถ้า user เป็น null ให้หยุดทำงาน
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    setResults((prevResults) => prevResults.filter((u) => u.id !== user.id));
  };

  const handleDelete = () => {
    if (selectedUser) {
      handleDeleteUser(selectedUser); // ลบข้อมูล
      setIsDeleteModalOpen(false); // ปิด modal
    }
  };

  const [dataTabs, setDataTabs] = useState("all");
  const tabs = [
    { title: "All", value: "all" },
    { title: "อสม", value: "osm" },
    { title: "นักบริบาล", value: "caregiver" },
  ];

  return (
    <div className=" h-screen bg-white flex flex-col overflow-hidden">
      {/* ส่วนของ Navigation */}
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* ส่วนของ Menu */}
      <div className="flex">
        <div className="w-56">
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>

        <div
          className={`p-4 h-screen overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "w-[calc(100%-14rem)]" : "w-full"
          }`}
        >
          <div className="flex justify-between items-center mt-8">
            {/* ช่องค้นหาที่สามารถพิมพ์ข้อความเพื่อค้นหาได้ */}
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="p-2 border border-gray-300 rounded-lg text-gray-600 h-8 w-56 text-sm"
              value={query} // กำหนดค่าเริ่มต้นให้ช่องค้นหาเป็นค่าของ state `searchQuery`
              onChange={handleSearch} // ใช้ฟังก์ชัน handleSearch ใน onChange
            />

            {/* ปุ่ม "Add Member" ที่จะอยู่ขวาล่างของตาราง */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm h-8 py-2 px-4 rounded-lg flex items-center"
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
              Add Member
            </button>
          </div>
          <div className="flex mt-5 ">
            <div className="flex w-48 border-b justify-start">
              {/*การใช้ .map() วนลูป */}
              {tabs.map(({ title, value }) => (
                <span //เป็นข้อความธรรมดา แต่ยังให้คลิกได้
                  key={value}
                  onClick={() => setDataTabs(value)} //การเปลี่ยนค่า dataTabs เมื่อคลิกแท็บ
                  className={clsx(
                    //การใช้ clsx ในการกำหนดคลาส CSS
                    "cursor-pointer flex-1 py-2 text-center text-[12px] font-medium transition-colors",
                    value === dataTabs
                      ? "border-b-4 border-blue-500 text-blue-700" //value เท่ากับ dataTabsทำให้แท็บนั้นมีเส้นขอบด้านล่างสีฟ้าและข้อความเป็นสีน้ำเงิน
                      : "text-gray-500 hover:text-blue-500" //value ไม่เท่ากับ dataTabsทำให้ข้อความเป็นสีเทา
                  )}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white mt-5">
              <thead className="bg-blue-300 text-black ">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                    PROFILE
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                    HN-NUMBER
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                    NAME
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                    ID CARD NUMBER
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                    GENDER
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                    DETAIL
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 ">
                {users.map((user) => (
                  <tr key={user.HN_Number}>
                    <td className="px-6 py-4 justify-center flex whitespace-nowrap">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.profile || "/placeholder.svg"}
                        alt={user.name}
                      />
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                      {user.HN_Number}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                      {user.ID_Card}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 text-sm whitespace-nowrap">
                      {user.gender}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => openEditModal(users)}
                      >
                        <FilePenLine className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FileX className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Add User */}
          <AddModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)} //callback function ที่กำหนดสิ่งที่ต้องทำเมื่อ Modal ต้องปิด
            onSubmit={handleAddUsers} // ทำการเพิ่มข้อมูล
          />

          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)} // ปิด modal
            user={selectedUser} // ส่งผู้ใช้ที่เลือก
            onSubmit={(updatedUser) => {
              // อัปเดตข้อมูลผู้ใช้
              const updatedUsers = users.map(
                (user) => (user.id === updatedUser.id ? updatedUser : user) // ตรวจสอบว่า user.id ตรงกับ updatedUser.id หรือไม่
                // ถ้าตรงกัน จะใช้ข้อมูลใหม่ (updatedUser) แทน, ถ้าไม่ตรง จะคงข้อมูลเดิมไว้
              );
              setUsers(updatedUsers); // อัปเดตสถานะ users ด้วยอาร์เรย์ใหม่ที่มีการแก้ไขข้อมูลผู้ใช้
              setResults(updatedUsers); // อัปเดตการแสดงผล result ให้ตรงกับข้อมูลที่เราแก้ไขไว้
              setIsEditModalOpen(false); // ปิด modal
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
