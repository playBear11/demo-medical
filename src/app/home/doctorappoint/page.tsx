"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/component/nav";
import Menu from "@/component/menu";
const Doctorappoint = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ควบคุม Sidebar
  

  return (
    <div className=" h-screen flex flex-col overflow-hidden"> {/*ซ่อนเส้น scroll ของจอแยกไว้ */}
    {" "}
    {/* ส่วนของ Navigation */}
    <Nav  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>


    {/* ส่วนของ Menu */}
    <div className="flex">
      <div className="w-56">
        <Menu isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
    </div>
  )
}

export default Doctorappoint
