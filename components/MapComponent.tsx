'use client';

import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CityContext } from './context/CityContext';
import { LatLngTuple } from 'leaflet';

// Component to change the map view
const RecenterMap: React.FC = () => {
  const { coordinates } = useContext(CityContext);
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lon], map.getZoom(), {
        animate: true,
      });
    }
  }, [coordinates, map]);

  return null;
};

const MapComponent: React.FC = () => {
  const { coordinates } = useContext(CityContext);

  // Default center coordinates if `coordinates` is not provided
  const defaultCenter: LatLngTuple = [51.505, -0.09];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={coordinates ? [coordinates.lat, coordinates.lon] : defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <RecenterMap />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
