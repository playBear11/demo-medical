"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // ไอคอนสำหรับซ่อน/แสดงรหัสผ่าน
import { FormControlLabel, Checkbox, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

//กำหนด component

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    //useformik จัดฟอร์ม
    initialValues: {
      // กำหนดค่าเริ่มต้น
      username: "",
      password: "",
      rememberMe: false, //เพิ่มให้จดจำรหัสและยูสเส้อออออออออออออ
    },

    validationSchema: Yup.object({
      // เอาไว้ตรวจโสบบ ว่าต้องมีค่าอะไรบ้าง เช่น ต้องมียูส ต้องใส่รหัสผ่านอย่างน้อยกี่ตัวว
      username: Yup.string().required("is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("is required"),
    }),

    // ฟังก์ชันที่ทำงานเมื่อผู้ใช้กดปุ่ม Submit
    onSubmit: async (values) => {
      try {
        // ส่งข้อมูล username และ password ไปยัง API
        const res = await axios.post(
          "http://iottechgroup.dyndns.biz:18180/api/token/",
          {
            username: values.username, // ใช้ค่าจากฟอร์มสำหรับ username
            password: values.password, // ใช้ค่าจากฟอร์มสำหรับ password
          }
        );
        if (res.status == 200) {
          // ถ้า API ตอบกลับสถานะ 200 (สำเร็จ)
          console.log("Login success", res.data); // แสดงข้อความใน Console

          // เก็บ Access และ Refresh Token ลงใน localStorage
          localStorage.setItem("access_token", res.data.access); // เก็บ Access Token
          localStorage.setItem("refresh_token", res.data.refresh); // เก็บ Refresh Token
          // window.location.href = "/app/home/dashboard/page.tsx"; // นำทางไปยังหน้า Homepage   ใน dashboard/page.tsx

          router.push("/home");
        }
      } catch (error) {
        // ถ้าเกิดข้อผิดพลาด
        console.error("Error:", error); // แสดงข้อความข้อผิดพลาดใน Console
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false); // สร้างสถานะสำหรับแสดง/ซ่อนรหัสผ่าน

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // เปลี่ยนค่าของสถานะ (สลับระหว่าง true/false)
  };

  const handleClick = () => {
   
  };

  return (
    //หลังซับสมิท จะเชื่อมฟอมิก แฮนับเพื่อส่งฟอร์ม
    <form onSubmit={formik.handleSubmit}>
      <div className="relative flex h-screen w-full items-center justify-center">
        {/* พื้นหลังเบลอ */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/66/48/e9/6648e93163b136c216129aebc9c032b2.jpg')",
            backgroundSize: "cover", // ให้รูปภาพแสดงเต็มพื้นที่
            backgroundPosition: "center", // จัดให้อยู่ตรงกลาง
            backgroundAttachment: "fixed", // ให้พื้นหลังไม่เลื่อน
            filter: "blur(8px)", // เบลอพื้นหลัง
            WebkitFilter: "blur(8px)",
            zIndex: "-1", // ทำให้พื้นหลังอยู่ด้านล่าง
          }}
        ></div>

        {/* กล่องข้อมูล */}
        <div
          className="flex border border-gray-400 text-black font-semibold text-lg w-6/12 h-4/6 rounded-2xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)", // สีพื้นหลังโปร่งแสง
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)", // เงารอบกรอบ
            backdropFilter: "blur(4px)", // เอฟเฟกต์เบลอ
            borderRadius: "30px", // มุมโค้งมน
            // maxWidth: "1800px", // ความกว้างของกล่องใหญ่
            overflow: "hidden", // ซ่อนส่วนที่ล้น
          }}
        >
          {/* ภาพด้านซ้าย */}
          <div
            className="flex-shrink-0"
            style={{
              width: "50%", // ใช้ครึ่งหนึ่งของพื้นที่กล่องใหญ่
              backgroundImage:
                "url('https://i.pinimg.com/736x/39/47/e5/3947e557afe65d9027229665e8fc2960.jpg')", // ภาพที่ต้องการ
              backgroundSize: "cover", // ให้ภาพเต็มพื้นที่
              backgroundPosition: "center", // จัดภาพให้อยู่ตรงกลาง
            }}
          ></div>

          {/* ช่องกรอกข้อมูลด้านขวา */}
          <div
            className="flex flex-col justify-center px-6 py-10"
            style={{
              width: "50%", // ใช้ครึ่งหนึ่งของพื้นที่กล่องใหญ่
            }}
          >
            {/* โลโก้ */}
            <div className="flex justify-center mb-4">
              <div
                className="w-20 h-20 rounded-full"
                style={{
                  backgroundImage:
                    "url('https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg')",
                  backgroundSize: "cover",
                }}
              />
            </div>
            {/*} <h1>Login</h1>*/}

            <div className="mb-4 mt-4">
              <TextField //กำหนดชื่อฟิลด์ของมัน
                fullWidth
                id="username"
                name="username"
                label="username"
                value={formik.values.username} //เชื่อมค่าและสถานะ
                onChange={formik.handleChange} //ถ้าค่าเปลี่ยน เธอจะถูกเรียกใช้
                onBlur={formik.handleBlur} //ถ้าข้อมูลในฟิลด์ไม่ถูกต้อง เธอจะถูกเรียก
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                } //กำหนดให้แสดงสีแดงหากเกิดข้อผิดพลาด
                helperText={formik.touched.username && formik.errors.username} //ถ้าเธอไม่ครบ เราจะร้อง ถ้าครบถ้วน จะไม่ปริปาก
                sx={{ marginBottom: 2 }} // ใช้ marginBottom ของแมทยูไอ ให้ช่องห่างกัน
              />

              <TextField
                fullWidth
                type={showPassword ? "text" : "password"} // ถ้า showPassword เป็น true ให้แสดงรหัสผ่าน
                id="password"
                name="password"
                label="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                } //กำหนดให้แสดงสีแดงหากเกิดข้อผิดพลาด
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility} // เรียกฟังก์ชันเมื่อคลิกไอคอน
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                        {/* ไอคอนที่แสดง */}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div className="mb-4 flex items-center space-x-20">
                <FormControlLabel //ใช้ในการควบคุมและแสดง Label
                  control={
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      color="primary"
                    />
                  }
                  label="Remember Me"
                  sx={{ "& .MuiTypography-root": { fontSize: "0.75rem" } }}
                />
                <Link
                  href="/reset-password"
                  className="text-xs font-medium text-cyan-800 hover:text-blue-700 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forget Your password?
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                style={{
                  border: "1px solid #0b6176", // สีและขนาดขอบของปุ่ม
                  borderRadius: "9999px", // เพิ่มขอบโค้งมน
                }}
                className="btn btn-accent btn-outline h-8 w-52 hover:bg-blue-200 text-base"
                onClick={handleClick}
              >
                LogIn
              </button>
            </div>

            <div className="mb-4 mt-4 flex justify-center">
              <p className=" text-xs  font-medium">
                Not Registered?{" "}
                <a
                  href="/register"
                  className="text-xs  text-cyan-900 hover:text-blue-700 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Create an Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;