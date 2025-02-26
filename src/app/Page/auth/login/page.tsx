// src/pages/Page/auth/login.tsx
"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // ไอคอนสำหรับซ่อน/แสดงรหัสผ่าน
import { FormControlLabel, Checkbox, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/app/Hook/useAuth"; // import useAuth hook

const Login = () => {
  const router = useRouter();
  const { login, loading, error } = useAuth(); // ใช้งาน useAuth hook

  const formik = useFormik({
    initialValues: {
      username: "nurseA", // admina,doctora , nursea , volunteera
      password: "123", // admin,123
      rememberMe: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("is required"),     //ต้องใส่
      password: Yup.string()
        .min(3, "Password must be at least 3 characters")
        .required("is required"),
    }),
    onSubmit: async (values) => {
      // เรียกใช้งาน login จาก useAuth hook
      await login(values.username, values.password);
    },
  });

  const [showPassword, setShowPassword] = useState(false);  //เปิด-ปิด รหัสผ่าน

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="relative flex h-screen w-full items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/66/48/e9/6648e93163b136c216129aebc9c032b2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            filter: "blur(8px)",
            WebkitFilter: "blur(8px)",
            zIndex: "-1",
          }}
        ></div>
        <div
          className="flex border border-gray-400 text-black font-semibold text-lg w-6/12 h-4/6 rounded-2xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          <div
            className="flex-shrink-0"
            style={{
              width: "50%",
              backgroundImage:
                "url('https://i.pinimg.com/736x/39/47/e5/3947e557afe65d9027229665e8fc2960.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            className="flex flex-col justify-center px-6 py-10"
            style={{ width: "50%" }}
          >
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

            <div className="mb-4 mt-4">
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                sx={{ marginBottom: 2 }}
              />

              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div className="mb-4 flex items-center space-x-20">
                <FormControlLabel
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
                  href="/Page/auth/reset"
                  className="text-xs font-medium text-cyan-800 hover:text-blue-700 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forget Your password?
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                style={{ border: "1px solid #0b6176", borderRadius: "9999px" }}
                className="btn btn-accent btn-outline h-8 w-52 hover:bg-blue-200 text-base"
              >
                LogIn
              </button>
            </div>

            <div className="mb-4 mt-4 flex justify-center">
              <p className="text-xs font-medium">
                Not Registered?
                <span
                  onClick={() => router.push("/Page/auth/register")}
                  className="text-xs text-cyan-900 hover:text-blue-700 focus:outline-none focus:underline transition ease-in-out duration-150 cursor-pointer"
                >
                  Create an Account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
