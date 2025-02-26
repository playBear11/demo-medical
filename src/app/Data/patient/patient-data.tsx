// กำหนด Interface สำหรับ props ที่ใช้ใน  user
export interface Patient {
  username: string
  email: string
  first_name: string
  last_name: string
  avatar: string
  card_id_number: string
  gender: string
  hn_number: string
  hospital: string
  last_record: string
}

export const patientData = [
  {
    name: "Mr. John",
    date: "05/02/2025",
    hn: "123456789",
    status: "high", // red
  },
  {
    name: "Mr. Smith",
    date: "05/02/2025",
    hn: "987654321",
    status: "low", // yellow
  },
  {
    name: "Mrs. Jane",
    date: "05/02/2025",
    hn: "456789123",
    status: "normal", // green
  },
  {
    name: "Ms. Sarah",
    date: "05/02/2025",
    hn: "789123456",
    status: "high", // red
  },
];