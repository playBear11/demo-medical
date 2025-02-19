import { Dispatch, SetStateAction } from "react";
import { Doctor } from "../doctor/doctor-data";

// types.ts
export interface User {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: Date;
    unread: number;
    isOnline: boolean;
  }
  
  export interface Message {
    id: number;
    text: string;
    sender: "user" | "other";
    timestamp: Date;
    userId: number;
  }
  
  // data.ts
  export const sampleUsers: User[] = [
    {
      id: 1,
      name: "คุณหมอสมศรี",
      avatar: "https://shorturl.asia/n4is2",
      lastMessage: "เดี๋ยวดูประวัติคนไข้ให้นะคะ",
      timestamp: new Date(),
      unread: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: "พยาบาลวิภา",
      avatar: "https://shorturl.asia/n4is2",
      lastMessage: "ผลตรวจออกแล้วค่ะ",
      timestamp: new Date(),
      unread: 0,
      isOnline: true,
    },
    {
      id: 3,
      name: "เภสัชกรประจำแผนก",
      avatar: "https://shorturl.asia/n4is2",
      lastMessage: "ยาพร้อมแล้วครับ",
      timestamp: new Date(),
      unread: 1,
      isOnline: false,
    },
    {
      id: 4,
      name: "พยาบาลวิภา",
      avatar: "https://shorturl.asia/n4is2",
      lastMessage: "ผลตรวจออกแล้วค่ะ",
      timestamp: new Date(),
      unread: 0,
      isOnline: true,
    },
    {
      id: 5,
      name: "เภสัชกรประจำแผนก",
      avatar: "https://shorturl.asia/n4is2",
      lastMessage: "ยาพร้อมแล้วครับ",
      timestamp: new Date(),
      unread: 1,
      isOnline: false,
    },
  ];
  
  export const initialMessages: Message[] = [
    {
      id: 1,
      text: "สวัสดีค่ะ มีอะไรให้ช่วยไหมคะ?",
      sender: "other",
      timestamp: new Date(),
      userId: 1,
    },
  ];

 {/*  export interface FloatingChatProps {
    selectedDoctor: number | null;
    isVisible: boolean;
    onClose: () => void;
  }*/}