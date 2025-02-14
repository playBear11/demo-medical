// ข้อมูลแพทย์
export interface Nurse {
    name: string;
    username: string;
    hospital: string;
    gender: string;
    avatar: string;
    firstname?: string;
    lastname?: string;
  }
  
  export const nurse: Nurse[] = [
    {
      name: "poc",
      username: "Nurse1",
      hospital: "Hospital A",
      gender: "Male",
      avatar: "https://shorturl.asia/HOrI2",
    },
    {
      name: "dako",
      username: "Nurse2",
      hospital: "Hospital B",
      gender: "Female",
      avatar: "https://shorturl.asia/HOrI2",
    },
    {
      name: "fep",
      username: "Nurse3",
      hospital: "Hospital C",
      gender: "Male",
      avatar: "https://shorturl.asia/HOrI2",
    },
    {
      name: "gre",
      username: "Nurse4",
      hospital: "Hospital D",
      gender: "Female",
      avatar: "https://shorturl.asia/HOrI2",
    },
  ];