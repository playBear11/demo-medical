// data.ts

export interface Doctor {
  name: string;
  username: string;
  hospital: string;
  gender: string;
  avatar: string;
}

export const localDoctors: Doctor[] = [
    {
      name: "Dr. John Doe",
      username: "john doe",
      hospital: "Hospital A",
      gender: "Male",
      avatar: "https://shorturl.asia/z7ZR2",
    },
    {
      name: "Dr. Jane Smith",
      username: "jane smith",
      hospital: "Hospital B",
      gender: "Female",
      avatar: "https://shorturl.asia/z7ZR2",
    },
    {
      name: "Dr. Mike Johnson",
      username: "mike johnson",
      hospital: "Hospital C",
      gender: "Male",
      avatar: "https://shorturl.asia/z7ZR2",
    },
    {
      name: "Dr. Sarah Lee",
      username: "sarah lee",
      hospital: "Hospital D",
      gender: "Female",
      avatar: "https://shorturl.asia/z7ZR2",
    },
  ];