"use client"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { TextField, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import axios from "axios"


const Register = () => {
  const router = useRouter()


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
     
    },


    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm password is required"),
    }),


    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://iottechgroup.dyndns.biz:18180/api/register/", // ใช้ URL สำหรับการลงทะเบียน
          {
            username: values.username,
            password: values.password,
          },
        )
        if (res.status === 200) {
          console.log("Registration successful", res.data)
          // นำทางไปที่หน้า login หรือหน้าอื่นๆ ที่ต้องการ
          router.push("/Page/auth/login")
        }
      } catch (error) {
        console.error("Error:", error)
      }
    },
  })


  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }


  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  const handleRegisterClick = () => {
    router.push("/Page/auth/login");
  };


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="relative flex h-screen w-full items-center justify-center">
        {/* พื้นหลังเบลอ */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/66/48/e9/6648e93163b136c216129aebc9c032b2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            filter: "blur(8px)",
            WebkitFilter: "blur(8px)",
            zIndex: "-1",
          }}
        ></div>


        {/* กล่องข้อมูล */}
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
          {/* ภาพด้านซ้าย */}
          <div
            className="flex-shrink-0"
            style={{
              width: "50%",
              backgroundImage: "url('https://i.pinimg.com/736x/39/47/e5/3947e557afe65d9027229665e8fc2960.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>


          {/* ช่องกรอกข้อมูลด้านขวา */}
          <div
            className="flex flex-col justify-center px-6 py-10"
            style={{
              width: "50%",
            }}
          >
            {/* โลโก้ */}
            <div className="flex justify-center mb-4">
              <div
                className="w-20 h-20 rounded-full"
                style={{
                  backgroundImage: "url('https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg')",
                  backgroundSize: "cover",
                }}
              />
            </div>


            <div className="mb-4 mt-4 space-y-4">
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                
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
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />


              <TextField
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>


            <div className="flex justify-center">
              <button
                type="submit"
                style={{
                  border: "1px solid #0b6176",
                  borderRadius: "9999px",
                }}
                className="btn btn-accent btn-outline h-8 w-52 hover:bg-blue-200 text-base"
              >
                Register
              </button>
            </div>


            <div className="mb-4 mt-4 flex justify-center">
              <p className="text-xs font-medium">
                Not Registered?
                <span
                  onClick={handleRegisterClick}
                  className="text-xs text-cyan-900 hover:text-blue-700 focus:outline-none focus:underline transition ease-in-out duration-150 cursor-pointer"
                >
                  Login here
                  </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}


export default Register