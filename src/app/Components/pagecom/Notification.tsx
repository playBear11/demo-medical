"use client";
import React from "react";
import { Bell, User, Heart, Clipboard, FileText } from "lucide-react"; // นำเข้าไอคอนจาก Lucide

const Notification = () => {
  const notifications = [
    { id: 1, message: "มีผู้ป่วยใหม่ที่ต้องการการตรวจเช็กสุขภาพ", icon: <User className="w-8 h-8 text-blue-500" /> },
    { id: 2, message: "การนัดหมายของผู้ป่วย Dr. Smith ถูกยกเลิก", icon: <Bell className="w-8 h-8 text-yellow-500" /> },
    { id: 3, message: "ผลการทดสอบสุขภาพของผู้ป่วยพร้อมแล้ว", icon: <Clipboard className="w-8 h-8 text-green-500" /> },
    { id: 4, message: "แผนกห้องฉุกเฉินแจ้งเตือน: ผู้ป่วยมีอาการรุนแรง", icon: <Heart className="w-8 h-8 text-red-500" /> },
    { id: 5, message: "การนัดหมายของผู้ป่วย Dr. Johnson ถูกยืนยันแล้ว", icon: <Bell className="w-8 h-8 text-blue-500" /> },
    { id: 6, message: "โปรดตรวจสอบสถานะการจองเตียงผู้ป่วยใหม่ในระบบ", icon: <FileText className="w-8 h-8 text-gray-500" /> },
  ];

  return (
    <div className="p-4">
      <h3 className="font-bold text-base mb-3">Notifications</h3>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="bg-ghostwhite p-3 rounded-lg shadow-sm text-xs hover:bg-blue-100 cursor-pointer flex items-center space-x-2"
          >
            {notification.icon} {/* แสดงไอคอน */}
            <span>{notification.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
