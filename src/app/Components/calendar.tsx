"use client";
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());      // กำหนดค่าเริ่มต้นเป็นวันปัจจุบัน
  
 // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();        // ดึงปี
    const month = date.getMonth();          // ดึงเดือน
    const daysInMonth = new Date(year, month + 1, 0).getDate();     // ดึงจำนวนวันในเดือนนั้นๆ
    const firstDayOfMonth = new Date(year, month, 1).getDay();      // ดึงวันแรกของเดือนนั้นๆ
    
    const days = [];        // สร้าง Array เพื่อเก็บวันทั้งหมด
            // วนลูปเพื่อเพิ่มวันที่เป็น null ใน Array ตามจำนวนวันแรกของเดือนนั้นๆ
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {        // วนลูปเพื่อเพิ่มวันที่ใน Array ตามจำนวนวันในเดือนนั้นๆ
      days.push(i);
    }
    return days;
  };

  // Get month and year
  const getMonthYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };


  const previousMonth = () => {     // ฟังก์ชันเมื่อกดปุ่มเดือนก่อนหน้า
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {     // ฟังก์ชันเมื่อกดปุ่มเดือนถัดไป
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const days = getDaysInMonth(currentDate);     // ดึงวันทั้งหมดในเดือนนั้นๆ
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="w-full max-w-sm bg-ghostwhite rounded-lg shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <ChevronLeft // ปุ่มกดเดือนก่อนหน้า
          className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={previousMonth}
        />
        <h2 className="text-base font-medium text-gray-800">
          {getMonthYear(currentDate)}       {/*แสดงเดือนและปี ปัจจุบัน*/}
        </h2>
        <ChevronRight // ปุ่มกดเดือนถัดไป
          className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={nextMonth}
        />
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-[11px] text-gray-500 text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 justify-items-center">
        {days.map((day, index) => (
          <div 
            key={index}
            className={`
              text-[10px] p-2 text-center rounded-full
              ${day === null ? 'invisible' : 'cursor-pointer'}
              ${day === new Date().getDate() && 
                currentDate.getMonth() === new Date().getMonth() && 
                currentDate.getFullYear() === new Date().getFullYear() 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200'}
            `}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;