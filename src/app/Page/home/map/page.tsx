"use client";
import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Nav from "@/app/Components/pagecom/nav";
import Menu from "@/app/Components/pagecom/menu";

//ข้อมูลตัวอย่างสำหรับพื้นที่ที่คนไข้อยู่
const locations = [
  {
    id: 1,
    name: "Teerapat11",
    risk: "สูง",
    location: "เจเจมอล",
    lat: 13.80221,
    lng: 100.54862,
  },
  {
    id: 2,
    name: "Chod22",
    risk: "-",
    location: "ตึกแดง",
    lat: 13.79916,
    lng: 100.54783,
  },
  {
    id: 3,
    name: "Rapat12",
    risk: "-",
    location: "จตุจักร",
    lat: 13.79991,
    lng: 100.5504,
  },
  {
    id: 4,
    name: "Disa9",
    risk: "-",
    location: "ยูเนี่ยนมอล",
    lat: 13.81351,
    lng: 100.56178,
  },
  {
    id: 5,
    name: "Banner",
    risk: "-",
    location: "รัชโยธิน",
    lat: 13.82831,
    lng: 100.56867,
  },
  {
    id: 6,
    name: "koi",
    risk: "-",
    location: "เซ็นทรัลลาดพร้าว",
    lat: 13.81719,
    lng: 100.56158,
  },
  {
    id: 7,
    name: "fromimg",
    risk: "-",
    location: "สยาม",
    lat: 13.74398,
    lng: 100.53269,
  },
];

const position = { lat: 13.7563, lng: 100.5018 }; // Bangkok, Thailand

//ประเภทข้อมูลที่ต้องการเก็บของโลเคชั่น
type Location = {
  id: number;
  name: string;
  risk: string;
  location: string;
  lat: number; //ละติจูด
  lng: number; //ลองติจูด
};

const Map = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  {
    /* const customIcon = new Icon({
    iconUrl: "https://shorturl.asia/bOJhA",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
*/
  }

  const handleMarkerClick = (loc: (typeof locations)[0]) => {
    setSelectedLocation(loc);
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Nav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Menu isSidebarOpen={isSidebarOpen} />
        <div
          className={`flex-1 p-6 overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "w-[calc(100%-14rem)]" : "w-full"
          }`}
        >
          <div className="flex-1 flex">
            <div className="w-1/4 p-4 bg-white rounded-lg shadow-md overflow-auto m-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Locations
              </h1>
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="border p-4 my-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleMarkerClick(loc)}
                >
                  <p className="font-bold text-lg">{loc.name}</p>
                  <p
                    className={`text-sm ${
                      loc.risk === "สูง" ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    ค่าความเสี่ยง: {loc.risk}
                  </p>
                  <p className="text-sm text-gray-600">
                    ที่อยู่: {loc.location}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-3/4 p-4">
              <LoadScript googleMapsApiKey="AIzaSyDwPcqNADSC3Rsm8SwRkJ2dzOBA5qC2FwI">
                <GoogleMap
                  center={position}
                  zoom={13}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                >
                  {locations.map((loc) => (
                    <Marker
                      key={loc.id}
                      position={{ lat: loc.lat, lng: loc.lng }}
                      onClick={() => handleMarkerClick(loc)}
                    >
                      {selectedLocation?.id === loc.id && (
                        <InfoWindow
                          onCloseClick={() => setSelectedLocation(null)}
                        >
                          <div>
                            <h2>{loc.name}</h2>
                            <p>Risk: {loc.risk}</p>
                            <p>Location: {loc.location}</p>
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;

{
  /** Giolocation  ละติจูด ลองติจูด*/
}
