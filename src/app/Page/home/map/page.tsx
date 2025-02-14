"use client"
import { SetStateAction, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { LatLngExpression } from "leaflet"
import Nav from "@/app/Components/nav"
import Menu from "@/app/Components/menu"
import { Icon } from "leaflet"


//ข้อมูลตัวอย่างสำหรับพื้นที่ที่คนไข้อยู่
const locations = [
  { id: 1, name: "Teerapat11", risk: "สูง", location: "เจเจมอล", lat: 13.8035, lng: 100.5586 },
  { id: 2, name: "Chod22", risk: "-", location: "ตึกแดง", lat: 13.7742, lng: 100.5478 },
  { id: 3, name: "Rapat12", risk: "-", location: "จตุจักร", lat: 13.8006, lng: 100.5581 },
  { id: 4, name: "Disa9", risk: "-", location: "ยูเนี่ยนมอล", lat: 13.8034, lng: 100.5547 },
  { id: 5, name: "Banner", risk: "-", location: "รัชโยธิน", lat: 13.7985, lng: 100.5669 },
  { id: 6, name: "koi", risk: "-", location: "เซ็นทรัลลาดพร้าว", lat: 13.8166, lng: 100.5643 },
  { id: 7, name: "fromimg", risk: "-", location: "สยาม", lat: 13.746389, lng: 100.535004 },
]

//ประเภทข้อมูลที่ต้องการเก็บของโลเคชั่น
type Location = {
  id: number
  name: string
  risk: string
  location: string
  lat: number //ละติจูด
  lng: number //ลองติจูด
}

const Map = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const position: LatLngExpression = [13.7563, 100.5018] // Bangkok, Thailand

  const customIcon = new Icon({
    iconUrl: "https://shorturl.asia/bOJhA",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  const handleMarkerClick = (loc: typeof locations[0]) => {
    setSelectedLocation(loc)
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-56">
          <Menu isSidebarOpen={isSidebarOpen} />
        </div>

        <div className="flex-1 flex">
          <div className="w-1/4 p-4 bg-white rounded-lg shadow-md overflow-auto m-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Locations</h1>
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="border p-4 my-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => handleMarkerClick(loc)}
              >
                <p className="font-bold text-lg">{loc.name}</p>
                <p className={`text-sm ${loc.risk === "สูง" ? "text-red-600" : "text-gray-600"}`}>
                  ค่าความเสี่ยง: {loc.risk}
                </p>
                <p className="text-sm text-gray-600">ที่อยู่: {loc.location}</p>
              </div>
            ))}
          </div>

          <div className="w-3/4 p-4">
            <MapContainer center={position} zoom={13} className="h-full w-full rounded-lg shadow-md">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {locations.map((loc) => (
                <Marker
                  key={loc.id}
                  position={[loc.lat, loc.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => handleMarkerClick(loc),
                  }}
                >
                  <Popup>
                    <strong>{loc.name}</strong>
                    <br /> ค่าความเสี่ยง:{" "}
                    <span className={loc.risk === "สูง" ? "text-red-600 font-bold" : ""}>{loc.risk}</span>
                    <br /> ที่อยู่: {loc.location}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
