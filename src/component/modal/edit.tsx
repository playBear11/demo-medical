"use client";

//นำเข้า โมดูลที่ต้องการใช้
import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Box, Typography, Grid } from "@mui/material";

// กำหนดประเภทของ props ว่ารับอะไรบ้าง
interface EditModalProps {
  isOpen: boolean;                          //ควบคุมการเปิด/ปิด modal
  onClose: () => void;                      //เรียกใช้เมื่อถูกปิด
   user: any;                               //ข้อมูลของ user ที่ต้องการแก้ไข
  onSubmit: (updatedUser: any) => void;     //เรียกเมื่อฟอร์มถูกส่ง โดยจะส่งข้อมูล user ที่ถูกแก้ไขออกไป
 
}

//สร้าง component รับ props ตามที่กำหนดไว้
const EditModal: React.FC<EditModalProps> = ({
  isOpen, // ค่าที่ใช้ควบคุมการเปิด modal
  onClose, // ฟังก์ชันปิด modal
  onSubmit, // ฟังก์ชันที่ใช้ส่งข้อมูลที่แก้ไข
  user, // ข้อมูลของ user ที่จะถูกแก้ไข
}) => {

  // ใช้เก็บข้อมูลของผู้ใช้ที่ถูกแก้ไข เริ่มต้นด้วยค่า null หรือ ค่าว่าง
  const [editedUser, setEditedUser] = useState<any>(
    user || {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
    }
  );

  //ใช้ useEffect เพื่อตรวจสอบการเปลี่ยนแปลงของ user และอัปเดตค่าของ editedUser
  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);      //อัปเดตค่าทุกครั้งในรูปแบบอาเรย์

  //จัดการการเปลี่ยนแปลงใน input field อัปเดต state ของ editedUser
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;       // รับค่าจาก input field
    setEditedUser((prevUser: any) => ({
      ...prevUser,          // คัดลอกค่าปัจจุบันของ editedUser
      [name]: value,      // อัปเดตค่าที่เปลี่ยนแปลงตามชื่อของฟิลด์
    }));
  };

  //สร้างอ็อบเจ็กต์ updatedUser  ที่มีข้อมูลของผู้ใช้ที่แก้ไข พร้อมกับวันที่เปฌนเวลา timezone ท้องถิ่น
  const handleSubmit = () => {
    const localTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
    const updatedUser = {
      ...editedUser,          //ข้อมูลของผู้ใช้ที่ถูกแก้ไข
      date_joined: localTime, // ใช้เวลาใน Timezone ท้องถิ่น
    };
  
    onSubmit(updatedUser); // ส่งข้อมูล user ที่อัปเดตกลับไป
    onClose(); // ปิด Modal
  };
  

  return (
    ////แสดงหน้าต่างแบบ Pop-Up
    <Modal open={isOpen} onClose={onClose}>
      <Box
        className="modal-content "
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          padding: 3,
        }}
      >
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ 
            fontWeight: "bold",
            color: "black" }}
        >
          Edit User
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              value={editedUser.username}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={editedUser.email}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="first_name"
              label="First Name"
              value={editedUser.first_name}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="last_name"
              label="Last Name"
              value={editedUser.last_name}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              width: "48%",
              borderRadius: "16px",
              backgroundColor: "rgba(0, 139, 139, 1)",
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              width: "48%",
              borderRadius: "16px",
              color: "rgb(0, 139, 139)", // กำหนดสีของข้อความในปุ่ม
              "&:hover": {
                borderColor: "rgb(0, 139, 139)", // สีกรอบเมื่อ hover
                backgroundColor: "rgba(0, 139, 139, 0.1)", // สีพื้นหลังเมื่อ hover (สามารถปรับได้)
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;