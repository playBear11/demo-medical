"use client"

// นำเข้าโมดูลที่ต้องการใช้
import type React from "react"
import { useState } from "react"

// กำหนดประเภทของ props ว่ารับอะไรบ้าง
interface EditModalProps {
  isOpen: boolean // ควบคุมการเปิด/ปิด modal
  onClose: () => void // เรียกใช้เมื่อถูกปิด
  user: any // ข้อมูลของ user ที่ต้องการแก้ไข
  onSubmit: (updatedUser: any) => void // เรียกเมื่อฟอร์มถูกส่ง โดยจะส่งข้อมูล user ที่ถูกแก้ไขออกไป
}

// สร้าง component รับ props ตามที่กำหนดไว้
const EditUsersModal = ({ isOpen, onClose, user, onSubmit }: EditModalProps) => {
  const [editedUser, setEditedUser] = useState({ ...user })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedUser((prevState: any) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(editedUser)
  }

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl max-w-3xl shadow-lg w-full h-4/4">
          <div className="bg-blue-400 p-4 rounded-t-2xl">
            <h2 className="text-2xl font-semibold text-white">Edit User</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              {/* First Name and Last Name in the same line */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-xs font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-xs font-medium text-gray-700">Last Namxs</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editedUser.lastName}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Gender and Birthday in the same line */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-xs font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={editedUser.gender}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="w-1/2">
                  <label className="block text-xs font-medium text-gray-700">Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    value={editedUser.birthday}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* ID Card Number (Cannot Change) */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-xs font-medium text-gray-700">ID Card Number (Cannot Change)</label>
                  <input
                    type="text"
                    value={editedUser.idCardNumber}
                    disabled
                    className="mt-1 p-2 w-full bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
                  />
                </div>

                {/* Expire Date */}
                <div className="w-1/2">
                  <label className="block text-xs font-medium text-gray-700">Expire Date</label>
                  <input
                    type="date"
                    name="expireDate"
                    value={editedUser.expireDate}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedUser.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* HN Number */}
              <div>
                <label className="block text-xs font-medium text-gray-700">HN Number</label>
                <input
                  type="text"
                  name="HNNumber"
                  value={editedUser.HNNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Nurse */}
              <div>
                <label className="block text-xs font-medium text-gray-700">Nurse</label>
                <input
                  type="text"
                  name="nurse"
                  value={editedUser.nurse}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex space-x-4 mt-6">
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 bg-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </button>

                {/* Save Button */}
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 rounded-md text-sm text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default EditUsersModal

