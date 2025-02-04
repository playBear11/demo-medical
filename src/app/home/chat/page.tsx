"use client"
import react,{ useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const messages = [
    { id: 1, sender: "bot", text: "สวัสดี! ฉันช่วยอะไรคุณได้บ้าง?" },
    { id: 2, sender: "user", text: "อยากสอบถามเรื่องสินค้า" },
    { id: 3, sender: "bot", text: "แน่นอน! กรุณาระบุสินค้าที่คุณสนใจ" },
  ];

  return (
    <div className="fixed bottom-5  right-5">
      {/* ปุ่มเปิด-ปิดแชท */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-steelblue text-white p-3 rounded-full shadow-lg  transition"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* กล่องแชท */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="w-80 bg-GhostWhite shadow-lg rounded-3xl fixed bottom-16 right-5 border"
        >
          {/* หัวข้อแชท */}
          <div className="bg-steelblue rounded-3xl  text-white p-3 flex justify-between">
            <span>Messenger</span>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* รายการข้อความ */}
          <div className="p-3 h-60 overflow-y-auto  ">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 text-sm flex  ${msg.sender === "user" ? "justify-end" : "justify-start" }`}
              >
                <div
                  className={`p-2  rounded-3xl text-xs max-w-xs ${
                    msg.sender === "user" ? "bg-steelblue text-white" : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* ช่องพิมพ์ข้อความ */} 
          <div className="p-3 border-t flex items-center rounded-3xl ">
            <input
              type="text"
              placeholder="พิมพ์ข้อความ..."
              className="flex-1 p-2 border text-xs rounded-3xl"
            />
            <button className="bg-steelblue text-white text-xs w-14 p-2 ml-2 rounded-3xl">
              ส่ง
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}