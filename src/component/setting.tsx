"use client";
import React, { useState, useEffect } from "react";
import {
  AccountCircleOutlined,
  EmailOutlined,
  Label,
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
import { Monitor, Moon, Sun } from "lucide-react";
import { Button, RadioGroup } from "@mui/material";
import { number } from "yup";

const ProfileSetting = () => {
  const [name, setName] = useState("user123");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [tel, setTel] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null);
  };

  return (
    <div className="overflow-y-scroll">
      <h2 className="text-sm font-semibold text-start mb-6">Edit Profile</h2>
      <hr className="my-2 border-gray-200"/>
      
      <div className="flex flex-col items-center mb-6">
        
          <div className="relative">
            <img 
            src={profileImage || "https://via.placeholder.com/96?text=No+Image"}
            alt="Profile" 
            className="w-24 h-24 rounded-full shadow-md mt-5" />
            {profileImage && (
            <button
              onClick={handleImageRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full "
            >
              ✕
            </button>
            )}
          </div>
       
          <label className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 mt-5">
            Upload Picture
            <input type="file" onChange={handleImageChange} className="hidden" />
          </label>
      </div>
      <hr className="my-2 border-gray-200 mb-5" />
      
      <div className="space-y-4 ">
        <div className=" flex justify-between items-center ">
        
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-60 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 -ml-20"
          />
        
          <label className="block font-medium">Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="border w-60 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 -ml-20"
          />
       
        </div>


        <div className=" flex justify-between items-center ">
          <label className="block font-medium">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border w-60 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 -ml-20"
          />
        
          <label className="block font-medium">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border w-60 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 -ml-20"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div  className=" flex items-center ">
          <label className=" block font-medium">Tel</label>
          <input 
          type="Telephone"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          className="border  w-60 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 ml-14"
          />
        </div>
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



const listTheme = [
  {
    id: "light",
    label: "System (White Theme)",
    image: "https://shorturl.asia/LaOQ1", // ใช้ไอคอนรูปภาพแทน
    borderColor: "border-blue-500",
  },
  {
    id: "dark",
    label: "System (Dark Theme)",
    image: "https://shorturl.asia/Q9U41",
    borderColor: "border-gray-500",
  },
  {
    id: "cosmic",
    label: "Cosmic Soft Blue",
    image: "https://shorturl.asia/Iqvcw",
    borderColor: "border-blue-300",
  },
];

const ThemeSettings = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    const oldTheme = theme;
    setTheme(newTheme);
    document.documentElement.classList.replace(oldTheme, newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Select Theme</h2>
        <a href="#" className="text-blue-500 hover:underline text-sm">
          Create custom theme
        </a>
      </div>
      <p className="text-gray-600 text-sm mb-4">
        Customizing your workspace, make it more enjoyable and comfortable to work!
      </p>

      {/* Theme Options */}
      <div className="flex gap-4">
        {listTheme.map(({ id, label,image, borderColor }) => (
          <label
            key={id}
            className={`flex-1 p-4 rounded-xl border-2 ${
              theme === id ? borderColor : "border-gray-300"
            } cursor-pointer transition hover:border-blue-400`}
          >
            <input
              type="radio"
              name="theme"
              value={id}
              checked={theme === id}
              onChange={() => setTheme(id)}
              className="hidden"
            />
            <div className="rounded-md p-4 aspect-video flex items-center justify-center">
              <img src={image} alt={label} className="h-28 w-full object-contain " />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input type="radio" checked={theme === id} readOnly />
              <p className="text-sm font-medium">{label}</p>
            </div>
          </label>
        ))}
      </div>
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
      <div className="flex w-9/12 h-5/6 p-6 bg-white rounded-3xl shadow-lg relative">
        {/* Sidebar */}
        <div className="w-1/4 p-4 border-r ">
          <hr className="my-2 border-gray-300" /> {/**เส้นคั่น */}
          <div className="text-[8px] font-bold text-gray-600 mb-1">General</div>
          <button
            onClick={() => setActiveTab("profile")}
            className="w-full text-left mb-4 p-2 hover:bg-blue-100 flex items-center font-semibold"
          >
            <PersonOutline className="mr-2" /> Edit Profile
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className="w-full text-left mb-4 p-2 hover:bg-blue-100 flex items-center font-semibold"
          >
            <SettingsOutlined className="mr-2" /> Edit Account
          </button>
          <hr className="my-2 border-gray-300" />
          <div className="text-[8px] font-bold text-gray-600 mb-1">
            Referance
          </div>
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
          <hr className="my-2 border-gray-300" />
          <div className="text-[8px] font-bold text-gray-600 mb-1">
            Notifications
          </div>
          <button
            onClick={() => setActiveTab("notifications")}
            className="w-full text-left mb-4 p-2 hover:bg-blue-100 flex items-center font-semibold"
          >
            <NotificationsNoneOutlined className="mr-2" /> Notifications
          </button>
          <hr className="my-2 border-gray-300" />
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

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
