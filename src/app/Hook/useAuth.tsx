"use client";

// src/hooks/useAuth.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(
    localStorage.getItem("user_role")
  ); // ตั้งค่าเริ่มต้นจาก localStorage

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://192.168.1.94:8005/auths/login/", {
        username,
        password,
      });

      if (res.status === 200) {
        console.log("Login Response:", res);

        // เก็บ Token ใน sessionStorage เพื่อความปลอดภัยที่ดีกว่า localStorage
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);

        // เรียก API GET /auths/users/me/ เพื่อตรวจสอบ role
        const userRes = await axios.get(
          "http://192.168.1.94:8005/auths/users/me/",
          {
            headers: { Authorization: `Bearer ${res.data.accessToken}` },
          }
        );

        const userRole = userRes.data.profession.name; // ดึงชื่อ Role จาก API
        console.log("Login - User Role from API:", userRole); // แสดงชื่อ Role ใน console
        localStorage.setItem("user_role", userRole); // เก็บ Role ใน localStorage
        setRole(userRole); // อัปเดต state role ให้ตรงกับค่าใหม่ที่ได้รับจาก API
        console.log(
          "Login - Stored User Role:",
          localStorage.getItem("user_role")
        ); // แสดง Role ใน localStorage

        //console.log("User Role:", userRole);

        {
          /* ตรวจสอบว่าผู้ใช้ยังไม่ได้ล็อกอินก่อนจะ redirect
        if (typeof window !== "undefined" && window.location.pathname !== "/") {
          router.push("/");
        */
        }

        // Redirect ตาม Role
        if (userRole === "Admin") {
          router.push("/"); // ไปหน้า Admin
        } else if (userRole === "Doctor") {
          router.push("/Page/management/nurses"); // ไปหน้า Doctor
        } else if (userRole === "Nurse") {
          router.push("/Page/management/patients"); // ไปหน้า Nurse
        } else {
          router.push("/"); // Default  ไปหน้า Home
        }

        console.log("Login success", userRes.data);
      }
    } catch (err: any) {
      // ใช้ any เนื่องจาก TypeScript ไม่รู้จัก err.response
      if (err.response) {
        // ตรวจสอบว่ามี response หรือไม่
        setError(err.response.data.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์"); // ถ้ามีให้แสดงข้อความจากเซิร์ฟเวอร์
      } else {
        setError("Network error หรือเซิร์ฟเวอร์ไม่ตอบสนอง"); // ถ้าไม่มีให้แสดงข้อความ Network error
      }
      console.error("Login Error:", err); // แสดง error ใน console
    } finally {
      // ทำงานทุกกรณี
      setLoading(false); // ปิด Loading
    }
  };

  return { login, loading, error, role };
};

export default useAuth;