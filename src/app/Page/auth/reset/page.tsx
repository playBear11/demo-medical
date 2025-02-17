"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axios from "axios";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({ old_password: false, new_password: false });
  const toggleState: Record<string, boolean> = { old_password: false, new_password: false };

  const togglePasswordVisibility = (field: "old_password" | "new_password") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("Old password is required"),
      new_password: Yup.string()
        .min(5, "New password must be at least 5 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("Unauthorized! Please log in.");
          router.push("/Page/auth/login");
          return;
        }

        await axios.put(
          "http://192.168.1.94:8005/auths/change-password/",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert("Password updated successfully!");
        router.push("/dashboard");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("API error:", error.response?.data);
          alert(error.response?.data?.message || "Failed to update password");
        } else {
          console.error("Unexpected error:", error);
        }
      }
    },

  });

  const handleBlur = (field: keyof typeof formik.values) => {
    return formik.touched[field] && formik.errors[field]
      ? formik.errors[field]
      : "";
  };
  

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex h-screen items-center justify-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed blur-md"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/66/48/e9/6648e93163b136c216129aebc9c032b2.jpg')",
        }}
      ></div>

      {/* Form Container */}
      <div className="relative flex w-6/12 h-4/6 border border-gray-400 text-black font-semibold text-lg rounded-2xl bg-white bg-opacity-50 shadow-lg backdrop-blur-md overflow-hidden">
        {/* Left Image */}
        <div
          className="w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/39/47/e5/3947e557afe65d9027229665e8fc2960.jpg')",
          }}
        ></div>

        {/* Form Fields */}
        <div className="flex flex-col justify-center px-6 py-10 w-1/2">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div
              className="w-20 h-20 bg-cover rounded-full"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg')",
              }}
            ></div>
          </div>

          {/* Password Fields */}
          <div className="space-y-4 mb-4">
            {(["old_password", "new_password"] as const).map((field) => (
              <TextField
                key={field}
                fullWidth
                id={field}
                name={field}
                label={
                  field === "old_password" ? "Old Password" : "New Password"
                }
                type={showPassword[field] ? "text" : "password"}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched(field)}
                error={Boolean(formik.touched[field] && formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility(field)}
                        edge="end"
                      >
                        {showPassword[field] ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-accent btn-outline h-8 w-52 rounded-full border border-blue-800 hover:bg-blue-200 text-base"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordPage;
