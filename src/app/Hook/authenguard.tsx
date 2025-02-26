import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    if (!accessToken) {
      router.push("/Page/auth/login"); // ถ้าไม่มี token ให้ไปหน้า login
      return;
    }

    const checkAuth = async () => {
      try {
        const resMyuser = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auths/users/me/`);
        console.log('resMyuser', resMyuser);

        if (resMyuser.data) {
          console.log("TokenSuccess");
        } else {
          console.log("TokenFail");
          localStorage.clear();
          router.push("/Page/auth/login");
        }
      } catch (error) {
        console.error("Error:", error);
        localStorage.clear();
        router.push("/Page/auth/login");
      }
    };

    checkAuth();

    return () => {
      axios.interceptors.request.eject(requestInterceptor); // ลบ interceptor
    };
  }, [router]);



  return <>{children}</>; // เมื่อโหลดเสร็จแล้วให้แสดง children
};

export default AuthGuard;