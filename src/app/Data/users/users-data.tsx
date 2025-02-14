// data/users.ts
export interface Users {
    id: any;
    profile: string;
    HN_Number: string;
    name: string;
    ID_Card: string;
    gender: string;
  }
  
  // ข้อมูลตัวอย่างของผู้ใช้
  export const defaultUsers: Users[] = [
    {
      profile: "https://github.com/shadcn.png",
      HN_Number: "1255555",
      name: "macros",
      ID_Card: "********",
      gender: "Male",
      id: undefined,
    },
    {
      profile: "https://github.com/shadcn.png",
      HN_Number: "1255556",
      name: "maxy",
      ID_Card: "********",
      gender: "Female",
      id: undefined,
    },
    {
      profile: "https://github.com/shadcn.png",
      HN_Number: "1255557",
      name: "macro",
      ID_Card: "********",
      gender: "Male",
      id: undefined,
    },
    {
      profile: "https://github.com/shadcn.png",
      HN_Number: "1255558",
      name: "macy",
      ID_Card: "********",
      gender: "Female",
      id: undefined,
    },
  ];
  
 