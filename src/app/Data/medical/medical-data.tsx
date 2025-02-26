export const medicalData = [
    { label: "Symptom", value: "", details: "Persistent cough" ,},
    { label: "Temperature", value: "", details: "Mild fever" },
    { label: "Blood Glucose", value: "", details: "Normal level" },
    { label: "Heart Rate", value: "", details: "Normal rate" },
    { label: "Oxygen", value: "", details: "Normal saturation" },
    { label: "Blood Pressure", value: " ", details: "Normal pressure" },
  ];


  // กำหนด interface สำหรับข้อมูลอุณหภูมิ
export interface TemperatureData {
  temp: number;   // อุณหภูมิ
  date: string;   // วันที่
  time: string;   // เวลา
  location: string; // สถานที่
  status: string;  // สถานะของอุณหภูมิ (เช่น ปกติ, สุ่มเสี่ยง, ฉุกเฉิน)
}


// กำหนด interface สำหรับข้อมูล ความดันของเลือด
export interface BloodPressureData {
  systolic: number;   //  ความดันของเลือดสูงสุด
  diastolic : number;   // ความดันเลือดที่ต่ำสุด
  date: string;   // วันที่
  time: string;   // เวลา
  location: string; // สถานที่
  status: string;  // สถานะของอุณหภูมิ (เช่น ปกติ, สุ่มเสี่ยง, ฉุกเฉิน)
}

// กำหนด interface สำหรับข้อมูลน้ำตาลในเลือด
export interface BloodGlucoseData {
  glucose: number;   // ค่าน้ำตาลในเลือด
  date: string;      // วันที่
  time: string;      // เวลา
  location: string;  // สถานที่
  status: string;    // สถานะของน้ำตาลในเลือด (เช่น ปกติ, สุ่มเสี่ยง, ฉุกเฉิน)
}

// กำหนด interface สำหรับข้อมูลน้ำตาลในเลือด
export interface HeartRateData {
  heartrate: number;
  pulse: number;   // ค่าน้ำตาลในเลือด
  date: string;      // วันที่
  time: string;      // เวลา
  location: string;  // สถานที่
  status: string;    // สถานะของน้ำตาลในเลือด (เช่น ปกติ, สุ่มเสี่ยง, ฉุกเฉิน)
}

export interface OxygenData {
  oxygen: number;
  pulse: number;   // ค่าน้ำตาลในเลือด
  date: string;      // วันที่
  time: string;      // เวลา
  location: string;  // สถานที่
  status: string;    // สถานะของน้ำตาลในเลือด (เช่น ปกติ, สุ่มเสี่ยง, ฉุกเฉิน)
}

