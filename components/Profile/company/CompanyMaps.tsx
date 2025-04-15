"use client";
import { getCoordinatesFromAddress } from '@/lib/geocode';
import { Location } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '@/public/icons/gps.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon.src,
  iconSize: [80,80],
  iconAnchor: [0 , 0],
  popupAnchor: [0,0],
  shadowSize: [50,50]
});

export const CompanyMaps = () => {
  const lat = 30.406984625615515; 
  const lon = -9.53809421587912;

  return (
    <div className='relative w-full flex flex-col gap-4'>
      <MapContainer className='rounded-lg shadow-sm cursor-pointer' center={[lat , lon]} zoom={20} style={{ height: '700px' , width: '100%'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat,lon]} icon={customIcon} />
      </MapContainer>
      <a 
      href={`https://www.google.com/maps?q=${lat},${lon}`}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute right-4 top-4 z-[1000] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-fit"
      >
      View in Google Maps
      </a>
    </div>
  );
};
