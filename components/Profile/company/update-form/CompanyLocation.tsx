"use client";
import markerIcon from "@/public/icons/gps.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

const customIcon = new L.Icon({
  iconUrl: markerIcon.src,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, 0],
  shadowSize: [50, 50],
});

const LocationSelector = ({
  setPosition,
}: {
  setPosition: (position: [number, number]) => void;
}) => {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

export const CompanyLocation = () => {
  const [position, setPosition] = useState<[number, number]>([
    30.406984625615515, -9.53809421587912,
  ]);

  return (
    <div className="w-full mt-5 flex flex-col gap-4">
      <MapContainer
        className="rounded-lg shadow-sm cursor-pointer"
        center={position}
        zoom={20}
        style={{ height: "700px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={position}
          icon={customIcon}
          eventHandlers={{
            add: (e) => {
              e.target.openPopup();
            },
          }}
        >
          <Popup autoClose={false}>
            <span className="text-sm">Choose Your Company Location</span>
          </Popup>
        </Marker>
        <LocationSelector setPosition={setPosition} />
      </MapContainer>
    </div>
  );
};
