"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AccountCircleOutlined,
  EmailOutlined,
  LockOutlined,
} from "@mui/icons-material";
import {
  PersonOutline,
  SettingsOutlined,
  NotificationsNoneOutlined,
  LanguageOutlined,
  PaletteOutlined,
  NotificationsOutlined,
  VolumeUpOutlined,
  DoNotDisturbOutlined,
} from "@mui/icons-material";


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
  // ใช้ useState เพื่อเก็บสถานะของธีม (light หรือ dark)
  const [theme, setTheme] = useState("light");


  useEffect(() => {
    console.log("Component mounted or theme changed");
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      console.log("Saved theme found:", savedTheme);
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      console.log("No saved theme, using light mode");
      document.documentElement.classList.add("light");
    }
  }, []);
 
  const toggleTheme = () => {
    console.log("Toggling theme");
    if (theme === "light") {
      console.log("Switching to dark mode");
      setTheme("dark");
      document.documentElement.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      console.log("Switching to light mode");
      setTheme("light");
      document.documentElement.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
    }
  };


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


const SettingsPage = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState({
    username: "user123",
    email: "",
    password: "",
    notificationsEnabled: false,
    notificationSound: "default",
    dndDuration: 0,
    language: "en",
    isDarkMode: false,
  });


  if (!isOpen) return null;
  const handleSaveSettings = () => {
    console.log("Saving settings:", settings);
    alert("All settings have been saved!");
  };


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 text-black text-xs ">
      <div className="flex w-9/12 h-5/6 p-6 bg-blue-100 rounded-3xl shadow-lg relative">
        <div className="flex w-full h-full p-6 bg-white rounded-3xl shadow-lg relative">
          {/* Sidebar */}
          <div className="w-1/4 p-4 border-r ">
            <button
              onClick={() => setActiveTab("profile")}
              className="w-full text-left mb-4 p-2 hover:bg-blue-100 flex items-center font-semibold"
            >
              <PersonOutline className="mr-2" /> Profile
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className="w-full text-left mb-4 p-2 hover:bg-blue-100 flex items-center font-semibold"
            >
              <SettingsOutlined className="mr-2" /> Account Settings
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className="w-full text-left mb-4 p-2 hover:bg-blue-100 flex items-center font-semibold"
            >
              <NotificationsNoneOutlined className="mr-2" /> Notifications
            </button>
            <button
              onClick={() => setActiveTab("language")}
              className="w-full text-left mb-4 p-2 hover:bg-blue-100 flex items-center font-semibold"
            >
              <LanguageOutlined className="mr-2" /> Language
            </button>
            <button
              onClick={() => setActiveTab("theme")}
              className="w-full text-left mb-4 p-2 hover:bg-blue-100 flex items-center font-semibold"
            >
              <PaletteOutlined className="mr-2" /> Theme
            </button>
          </div>


          {/* Content */}
          <div className="w-3/4 p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-gray-500 hover:text-gray-800 text-xl "
            >
              ✕
            </button>
            <h1 className="text-2xl font-semibold text-center mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
            </h1>


            {activeTab === "profile" && <ProfileSetting />}
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "notifications" && <NotificationsSettings />}
            {activeTab === "language" && <LanguageSettings />}
            {activeTab === "theme" && <ThemeSettings />}


            <div className=" flex justify-end mt-10">
              <button
                className="btn btn-outline border border-blue-400 hover:bg-blue-400  text-blue-400 hover:text-black w-60 h-10 rounded-xl mt-10"
                onClick={handleSaveSettings}
              >
                Save All Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SettingsPage;