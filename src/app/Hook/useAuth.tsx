"use client";

// src/hooks/useAuth.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://192.168.1.94:8005/auths/login/", { username, password });

      if (res.status === 200) {
        console.log("Login Response:", res);

        // เก็บ Token ใน sessionStorage เพื่อความปลอดภัยที่ดีกว่า localStorage
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);

        // ตรวจสอบว่าผู้ใช้ยังไม่ได้ล็อกอินก่อนจะ redirect
        if (typeof window !== "undefined" && window.location.pathname !== "/") {
          router.push("/");
        }

        console.log("Login success", res.data);
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
      } else {
        setError("Network error หรือเซิร์ฟเวอร์ไม่ตอบสนอง");
      }
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useAuth;