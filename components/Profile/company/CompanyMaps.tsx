"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "@/public/icons/gps.png";
import { useUser } from "@/context/userContext";
import { cx } from "class-variance-authority";

// This component will update the map view when position changes
function MapUpdater({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position[0] !== 0 || position[1] !== 0) {
      map.setView(position, 15);
    }
  }, [map, position]);

  return null;
}

const customIcon = new L.Icon({
  iconUrl: markerIcon.src,
  iconSize: [80, 80],
  iconAnchor: [40, 40],
  popupAnchor: [-40, -40],
  shadowSize: [50, 50],
});

interface CompanyMapsProps {
  className?: string;
}

export const CompanyMaps = ({ className }: CompanyMapsProps) => {
  const { company } = useUser();
  const [position, setPosition] = React.useState<[number, number]>([0, 0]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (company?.location?.latitude && company?.location?.longitude) {
      const newPosition: [number, number] = [
        company.location.latitude,
        company.location.longitude,
      ];
      setPosition(newPosition);
      setIsLoaded(true);
    }
  }, [company?.location]);

  // Default position for initial render
  const defaultPosition: [number, number] = [0, 0];

  return (
    <div className={cx("relative flex flex-col gap-4", className)}>
      <MapContainer
        className="rounded-lg shadow-sm cursor-pointer z-10"
        center={defaultPosition}
        zoom={2}
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {isLoaded && (
          <>
            <Marker position={position} icon={customIcon} />
            <MapUpdater position={position} />
          </>
        )}
      </MapContainer>
      {isLoaded && (
        <a
          href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 top-4 z-[1000] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-fit"
        >
          View in Google Maps
        </a>
      )}
    </div>
  );
};
