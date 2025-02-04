"use client"; 

// AddModal.tsx
import React, { useState } from 'react';  // นำเข้า React และ useState จาก React

// กำหนด Interface สำหรับ props ที่ใช้ใน AddModal
interface AddModalProps {
  isOpen: boolean;  // กำหนด props isOpen เป็น boolean ใช้ตรวจสอบว่า Modal เปิดอยู่หรือไม่
  onClose: () => void;  // ฟังก์ชันที่ใช้ปิด Modal
  onSubmit: (userData: {  // onSubmit เป็นฟังก์ชันที่รับข้อมูลจากฟอร์มและส่งไปยัง AddModal
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }) => void;
}

// สร้าง component AddModal
const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onSubmit }) => {
  // ใช้ useState สำหรับจัดการข้อมูลในฟอร์ม
  const [formData, setFormData] = useState({
    username: '',  // กำหนดค่าเริ่มต้นสำหรับแต่ละฟิลด์ในฟอร์ม
    email: '',
    first_name: '',
    last_name: ''
  });

  // ฟังก์ชันสำหรับจัดการการส่งข้อมูลจากฟอร์ม
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // เป็นเมธอด ป้องกันการรีเฟรชหน้าเพจเมื่อส่งฟอร์ม
    onSubmit(formData);  // เรียกใช้ฟังก์ชัน onSubmit เพื่อส่งข้อมูลฟอร์ม
    // รีเซ็ตค่าฟอร์มหลังจากส่งข้อมูล
    setFormData({
      username: '',
      email: '',
      first_name: '',
      last_name: ''
    });
  };

  // หาก Modal ไม่เปิดให้ return null เพื่อไม่ให้แสดงอะไร
  if (!isOpen) return null;

  // ส่วนของ JSX ที่ใช้แสดง Modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">  {/*// แสดง Modal บนหน้าจอโดยใช้การจัดตำแหน่งแบบ Flex*/}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">  {/*// กล่อง Modal ที่มีพื้นหลังสีขาว*/}
        <h2 className="text-xl text-black font-bold mb-4">Add New Member</h2>  {/*// หัวข้อของ Modal*/}
        
        <form onSubmit={handleSubmit}>  {/*// ฟอร์มที่เรียกใช้งานฟังก์ชัน handleSubmit เมื่อส่ง*/}
          {/* ฟิลด์สำหรับกรอกข้อมูล */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">  {/*// ป้ายกำกับของฟิลด์*/}
              Username
            </label>
            <input
              type="text"
              value={formData.username}  // กำหนดค่าให้กับ input จาก state formData
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}  // อัพเดท state เมื่อมีการเปลี่ยนแปลงใน input
              className="w-full p-2 border text-black rounded-lg"
              required  // กำหนดให้ฟิลด์นี้เป็นฟิลด์ที่จำเป็นต้องกรอก
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}  // กำหนดค่าให้กับ input จาก state formData
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}  // อัพเดท state เมื่อมีการเปลี่ยนแปลงใน input
              className="w-full p-2 border text-black rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.first_name}  // กำหนดค่าให้กับ input จาก state formData
              onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}  // อัพเดท state เมื่อมีการเปลี่ยนแปลงใน input
              className="w-full p-2 border text-black rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.last_name}  // กำหนดค่าให้กับ input จาก state formData
              onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}  // อัพเดท state เมื่อมีการเปลี่ยนแปลงใน input
              className="w-full p-2 border text-black rounded-lg"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">  {/*// จัดตำแหน่งปุ่มที่ด้านขวา*/}
            <button
              type="button"
              onClick={onClose}  // ฟังก์ชันที่ใช้ปิด Modal
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;  // ส่งออก component AddModal เพื่อให้ใช้ในไฟล์อื่น
