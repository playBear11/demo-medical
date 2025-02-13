"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/app/Components/nav";
import Menu from "@/app/Components/menu";
import AddModal from "@/app/Components/modal/add";
import DeleteModal from "@/app/Components/modal/delete";
import EditModal from "@/app/Components/modal/edit";

// กำหนด Interface สำหรับ props ที่ใช้ใน  user
interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean; //สถานะผู้ใช้ (true = เปิดใช้งาน)
  date_joined: string;
}

const Patient = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ควบคุม Sidebar

  // ตัวอย่างข้อมูลผู้ใช้ (users)
  const [users, setUsers] = useState<User[]>([
    //กำหนดสถานะ (state) สำหรับจัดเก็บข้อมูลประเภทอาร์เรย์
    {
      id: 1,
      username: "********",
      email: "********@********.com",
      first_name: "********",
      last_name: "********",
      is_active: true,
      date_joined: "2024-08-09T18:01:17.988250+07:00",
    },
    {
      id: 2,
      username: "********",
      email: "********@********.com",
      first_name: "********",
      last_name: "********",
      is_active: true,
      date_joined: "2024-08-09T18:01:17.988250+07:00",
    },
    {
      id: 3,
      username: "********",
      email: "********@********.com",
      first_name: "********",
      last_name: "********",
      is_active: true,
      date_joined: "2024-08-09T18:01:17.988250+07:00",
    },
    {
      id: 4,
      username: "********",
      email: "********@********.com",
      first_name: "********",
      last_name: "********",
      is_active: true,
      date_joined: "2024-08-09T18:01:17.988250+07:00",
    },
    {
      id: 5,
      username: "********",
      email: "********@********.com",
      first_name: "********",
      last_name: "********",
      is_active: true,
      date_joined: "2024-08-09T18:01:17.988250+07:00",
    },
    {
      id: 6,
      username: "********",
      email: "********@********.com",
      first_name: "********",
      last_name: "********",
      is_active: true,
      date_joined: "2024-08-09T18:01:17.988250+07:00",
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
          user.id.toString().includes(searchQuery) ||
          user.username.toLowerCase().includes(searchQuery) ||
          user.first_name.toLowerCase().includes(searchQuery) ||
          user.last_name.toLowerCase().includes(searchQuery) ||
          user.email.toLowerCase().includes(searchQuery)
      );
      setResults(filtered); // อัปเดตผลลัพธ์การค้นหาด้วยข้อมูลที่กรองแล้ว
    } else {
      setResults(users); // หากช่องค้นหาว่าง ให้แสดงข้อมูลทั้งหมด
    }
  };
  function setSearchQuery(value: string): void {
    //// ฟังก์ชันสำหรับอัปเดตค่าของ searchQuery
    throw new Error("Function not implemented.");
  }
  function setFilteredUsers(arg0: (prevUsers: any) => any) {
    // ฟังก์ชันสำหรับอัปเดตค่าของ filteredUsers
    throw new Error("Function not implemented.");
  }

  function closeModal() {
    throw new Error("Function not implemented.");
  }

  //เพิ่มฟังก์ชันเพื่อเปิด modal เมื่อกดปุ่ม "Add Member"
  const openAddModal = () => {
    setIsAddModalOpen(true); // เปิด modal
  };

  // ปรับปรุงฟังก์ชัน handleAddUser
  const handleAddUser = (
    userData: Omit<User, "id" | "is_active" | "date_joined">
  ) => {
    // สร้าง ID ใหม่โดยใช้ ID สูงสุดที่มีอยู่ + 1
    const newId = Math.max(...users.map((user) => user.id)) + 1;

    // สร้างข้อมูลผู้ใช้ใหม่
    const newUser: User = {
      ...userData,
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
      is_active: true,
      date_joined: new Date().toISOString(),
    };

    // สร้างอาร์เรย์ใหม่ที่รวมผู้ใช้เดิมทั้งหมดคือ ยูส และเพิ่มผู้ใช้ใหม่ นิวยูส
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

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })
  ); // สร้าง state สำหรับเก็บเวลาปัจจุบัน

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
      {/* Navigation */}
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-56" : "w-0"
          }`}
        >
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Content */}
        <div className="p-4 h-screen overflow-auto flex-1 transition-all duration-300">
        <h1 className="text-2xl text-black font-bold mb-4">Patient</h1>
        <hr />
          <div className="flex justify-between items-center mt-8">
            {/* Search Input */}
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="p-2 border border-gray-300 rounded-lg text-gray-600 h-8 w-56 text-sm"
              value={query}
              onChange={handleSearch}
            />

            {/* Add Member Button */}
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

          {/* ส่วนที่ใช้แสดงตารางของผู้ใช้ */}
          <div className=" overflow-y-auto  max-h-[450px]">
            {/* ตารางแสดงข้อมูลผู้ใช้ */}
            <table className="w-full divide-y divide-gray-200 mt-5">
              {/* ส่วนหัวของตาราง */}
              <thead className="bg-blue-300 text-black text-sm h-10">
                <tr className="px-6 py-3" >
                  <th scope="col">ID</th>  {/* คอลัมน์ ID */}
                  <th scope="col">Username</th> {/* คอลัมน์ Username */}
                  <th scope="col">Email</th>  {/* คอลัมน์ Email */}
                  <th scope="col">First Name</th> {/* คอลัมน์ First Name */}
                  <th scope="col">Last Name</th>    {/* คอลัมน์ Last Name */}
                  <th scope="col">Date Joined</th>  {/* คอลัมน์ Date Joined */}
                  <th scope="col">Actions</th>   {/* คอลัมน์ Actions */}
                </tr>
              </thead>

              {/* ส่วนเนื้อหาของตารางที่แสดงข้อมูลผู้ใช้ */}
              <tbody className="bg-white divide-y divide-gray-200 ">
                {/* วนลูปผ่านข้อมูลใน `users` และแสดงผลในแต่ละแถว */}
                {results.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">   {/* ใช้ key เป็น `id` และใช้ hover เพื่อเปลี่ยนสีแถว */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900 text-center">{user.id}</td>    {/* แสดง ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900 text-center">{user.username}</td>    {/* แสดง Username */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900 text-center">{user.email}</td>   {/* แสดง Email */}
                    <td className="px-6 py-2 text-black text-center text-xs">{user.first_name}</td>   {/* แสดง First Name */}
                    <td className="px-6 py-2 text-black text-center text-xs">{user.last_name}</td>  {/* แสดง Last Name */}
                    <td className="px-6 py-2 text-black text-center text-xs">  {/* แสดง Date Joined โดยใช้ `toLocaleString` เพื่อแสดงเป็นรูปแบบที่อ่านได้ */}
                      {new Date().toLocaleString("en-EN", {  timeZone: "Asia/Bangkok", })}</td>
                    <td className="px-6 py-2  text-center text-xs">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-blue-600 mr-4 "
                      > Edit </button>
                      <button
                        onClick={() => openDeleteModal(user)}
                        className="text-red-600"
                      >  Delete </button>
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
            onSubmit={handleAddUser} // ทำการเพิ่มข้อมูล
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

          {/* DeleteModal */}
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)} //callback function ที่กำหนดสิ่งที่ต้องทำเมื่อ Modal ต้องปิด
            onDelete={handleDelete} // ทำการยืนยันการลบข้อมูล
            user={selectedUser} // ส่งข้อมูล user ที่เลือกมา
            handleDeleteUser={handleDeleteUser} // ฟังก์ชันการลบ
          />
        </div>
      </div>
    </div>
  );
};

export default Patient;
