"use client";
import React, { useState,} from "react";
import {
  AccountCircleOutlined,
  EmailOutlined,
  LockOutlined,
} from "@mui/icons-material";
import {
  NotificationsOutlined,
  VolumeUpOutlined,
  DoNotDisturbOutlined,
} from "@mui/icons-material";
import useTheme from "@/app/Hook/useTheme"; // นำเข้าฮุกที่สร้างขึ้น


const ProfileSetting = () => {
  // กำหนด state สำหรับชื่อผู้ใช้และรูปโปรไฟล์
  const [username, setUsername] = useState("user123");
  const [profileImage, setProfileImage] = useState<string | null>(null);


  // ฟังก์ชันสำหรับจัดการเมื่อเลือกไฟล์รูปภาพใหม่
  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // ดึงไฟล์จาก input
      setProfileImage(URL.createObjectURL(file)); // เปลี่ยน URL ของไฟล์
    }
  };


  // ฟังก์ชันสำหรับลบรูปโปรไฟล์
  const handleImageRemove = () => {
    setProfileImage(null); // ตั้งค่าเป็น null เพื่อลบรูป
  };


  // ฟังก์ชันสำหรับจัดการเมื่อเปลี่ยนชื่อผู้ใช้
  const handleUsernameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(event.target.value); // อัปเดตชื่อผู้ใช้
  };


  return (
    <div>
      {/* ส่วนจัดการรูปโปรไฟล์ */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mt-5 mb-5">Profile Picture</h3>


        {/* หากมีรูปโปรไฟล์จะแสดงภาพและปุ่มลบ */}
        {profileImage ? (
          <div className="flex justify-between items-center">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />


            <button
              onClick={handleImageRemove} // เมื่อคลิกปุ่มลบ จะเรียกฟังก์ชันนี้
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove Picture
            </button>
          </div>
        ) : (
          // หากยังไม่มีรูปโปรไฟล์ แสดง input ให้เลือกไฟล์
          <div>
            <input
              type="file"
              onChange={handleImageChange} // เมื่อเลือกไฟล์ใหม่ จะเรียกฟังก์ชันนี้
              className="mb-4 justify-center"
            />
          </div>
        )}


        {/* อินพุตสำหรับเปลี่ยนชื่อผู้ใช้ */}
        <label className="block mb-2 mt-6 font-semibold">Username</label>
        <input
          type="text"
          value={username} // แสดงชื่อผู้ใช้ที่เก็บใน state
          onChange={handleUsernameChange} // เมื่อมีการเปลี่ยนชื่อจะเรียกฟังก์ชันนี้
          className="border p-2 mb-4 w-full"
        />
      </div>
    </div>
  );
};


const AccountSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Account Settings</h2>


      {/* Username */}
      <label className="flex items-center mb-2 mt-6 ">
        <AccountCircleOutlined className="mr-2" />
        <span className="w-3/12 font-semibold">Username</span>
        <input
          type="text"
          className="input input-bordered w-10/12 mt-1 text-sm"
          placeholder="Enter your username"
        />
      </label>


      {/* Email */}
      <label className="flex items-center mb-2 mt-6">
        <EmailOutlined className="mr-2" />
        <span className="w-3/12 font-semibold">Email</span>
        <input
          type="email"
          className="input input-bordered w-10/12 mt-1 text-sm"
          placeholder="Enter your email"
        />
      </label>


      {/* Password */}
      <label className="flex items-center mb-2 mt-6">
        <LockOutlined className="mr-2" />
        <span className="w-3/12 font-semibold">Password</span>
        <input
          type="password"
          className="input input-bordered w-10/12 mt-1 text-sm"
          placeholder="Enter your password"
        />
      </label>
    </div>
  );
};


const NotificationsSettings = () => {
  return (
    <div>
      <h2 className="text-xs text-gray-600 font-semibold mb-2 mt-5 flex items-center">
        <NotificationsOutlined className="w-4 h-4 mr-2 text-gray-600 " />
        Notifications
      </h2>


      {/* การเปิด/ปิดการแจ้งเตือน */}
      <div className="flex items-center justify-between mb-4 px-8 text-sm">
        <span>Enable Notifications</span>
        <input type="checkbox" className="toggle toggle-primary w-4 h-4" />
      </div>


      {/* การตั้งค่าเสียงแจ้งเตือน */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-600 mt-7 mb-2 flex items-center">
          <VolumeUpOutlined className="w-4 h-4 mr-2 text-gray-600" />
          Notification Sound Settings
        </h3>
        <div className="flex items-center justify-between mb-2  px-8 text-sm">
          <span>Enable Notification Sound</span>
          <input type="checkbox" className="toggle toggle-secondary w-4 h-4" />
        </div>
        <div>
          <label htmlFor="sound-select" className="block mb-1 text-sm px-8">
            Select Notification Sound:
          </label>
          <select
            id="sound-select"
            className="select select-bordered w-full text-sm px-7"
          >
            <option value="default">Default</option>
            <option value="chime">Chime</option>
            <option value="alert">Alert</option>
          </select>
        </div>
      </div>


      {/* โหมดห้ามรบกวน */}
      <div>
        <h3 className="text-xs font-semibold mb-2 mt-7 text-gray-600 flex items-center">
          <DoNotDisturbOutlined className="w-4 h-4 mr-2 text-gray-600" />
          Do Not Disturb Mode
        </h3>
        <div className="flex items-center justify-between mb-2 text-sm px-8">
          <span>Enable Do Not Disturb</span>
          <input type="checkbox" className="toggle toggle-accent w-4 h-4" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label htmlFor="dnd-duration" className="block mb-1  px-8">
            Set DND Duration (hours):
          </label>
          <input
            type="number"
            id="dnd-duration"
            className="input input-bordered "
            placeholder="Enter duration in hours"
          />
        </div>
      </div>
    </div>
  );
};


const LanguageSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Language</h2>
      <select className="select select-bordered w-full">
        <option value="en">English</option>
        <option value="th">ไทย</option>
      </select>
    </div>
  );
};


const ThemeSettings = () => {
  const { theme, toggleTheme } = useTheme(); // ใช้ hook

  return (
    <div className="flex items-center space-x-4 justify-between mt-10">
      <span className="text-sm">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <div className="w-14 h-7 bg-gray-400 rounded-full dark:bg-gray-800"></div>
        <div
          className={`w-6 h-6 mx-1 bg-white rounded-full absolute top-0.5 transition-transform ${
            theme === "dark" ? "transform translate-x-6" : ""
          }`}
        >
          <span className="absolute inset-0 flex items-center justify-center">
            {theme === "light" ? "🌞" : "🌙"}
          </span>
        </div>
      </label>
    </div>
  );
};


interface SettingsPageProps {
  isOpen: boolean
  onClose: () => void
}

const SettingsPage: React.FC<SettingsPageProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>("profile")

  if (!isOpen) return null

  const handleSaveSettings = () => {
    console.log("Saving settings")
    alert("All settings have been saved!")
  }

  const menuItems = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "account", label: "Account Settings", icon: "⚙️" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "language", label: "Language", icon: "🌐" },
    { id: "theme", label: "Theme", icon: "🎨" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-4xl h-5/6 rounded-lg shadow-lg flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-200">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left mb-4 p-2 rounded ${
                activeTab === item.id ? "bg-blue-100" : "hover:bg-gray-200"
              } flex items-center`}
            >
              <span className="mr-2">{item.icon}</span> {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="w-3/4 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">{menuItems.find((item) => item.id === activeTab)?.label}</h1>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">
              ✕
            </button>
          </div>

          {activeTab === "profile" && <ProfileSetting />}
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "notifications" && <NotificationsSettings />}
          {activeTab === "language" && <LanguageSettings />}
          {activeTab === "theme" && <ThemeSettings />}

          <div className="flex justify-end mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveSettings}
            >
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage