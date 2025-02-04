"use client";

import React from "react";
import { Modal, Button, Box, Typography } from "@mui/material";

//กำหนดประเภทของ props ของ deletemodal
interface DeleteModalProps {
  isOpen: boolean; //ควบคุมการเปิด/ปิด modal
  onClose: () => void; //เปิด-ปิด โมดัล
  onDelete: () => void; //ฟังก์ชันที่ดำเนินการลบ
  user: any; //ข้อมูลของuserที่เราเลือก
  handleDeleteUser: (user: any) => void; //ฟังก์ชันการลบผู้ใช้
}

// สร้าง component DeleteModal
const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen, // ค่า boolean สำหรับบอกว่า modal เปิดอยู่หรือไม่
  onClose, // ฟังก์ชันปิด Modal
  user, // ข้อมูลของ user ที่จะถูกลบ
  handleDeleteUser, // ฟังก์ชันลบผู้ใช้
  onDelete, // ฟังก์ชันที่ใช้ดำเนินการลบ
}) => {
  return (
    ////แสดงหน้าต่างแบบ Pop-Up
    <Modal open={isOpen} onClose={onClose}>
      <Box
        className="modal-content"
        sx={{
          //ใช้ตกแต่งพร้อพพพ
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", //ปรับให้อยู่กลางจอใจ
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          padding: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: "black" }}>
          Are you sure you want to delete <strong>{user?.username}</strong>?
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => { //เรียก เพื่อ ลบ
              onDelete(); // เรียกฟังก์ชันลบข้อมูล
              onClose();  // ปิด Modal
            }}
            sx={{
              width: "48%",
              borderRadius: "16px",
              backgroundColor: "rgba(128, 0, 0, 1)",
            }}
          >
            Yes, Delete
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              width: "48%",
              borderRadius: "16px",
              color: "rgb(128, 0, 0)", // กำหนดสีของข้อความในปุ่ม
              "&:hover": {
                borderColor: "rgb(128, 0, 0)", // สีกรอบเมื่อ hover
                backgroundColor: "rgba(128, 0, 0, 0.1)",
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

export default DeleteModal;
