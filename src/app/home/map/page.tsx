"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import Nav from "@/component/nav";
import Menu from "@/component/menu";

const Map = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const position: LatLngExpression = [13.7563, 100.5018]; // Bangkok, Thailand

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Navigation */}
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Menu */}
        <div className={`w-56 ${isSidebarOpen ? "" : "hidden"}`}>
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Map Content */}
        <div className="flex-1 p-4 overflow-auto">
          <h1 className="text-2xl text-black font-bold mb-4">Map</h1>

          {/* Interactive Map */}
          <MapContainer
            center={position}
            zoom={13}
            className="map-container"
            style={{ height: "100vh", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
