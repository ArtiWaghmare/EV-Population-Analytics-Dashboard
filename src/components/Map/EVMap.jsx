// src/components/Map/EVMap.jsx
import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

const EVMap = ({ data }) => (
  <MapContainer center={[47.6062, -122.3321]} zoom={10} style={{ height: "500px" }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {data.map((item, idx) => {
      const coords = item["Vehicle Location"]
        .match(/-?\d+\.\d+/g)
        .map(Number);
      return (
        <CircleMarker key={idx} center={coords} radius={5} color="blue">
          <Popup>
            <p>{item.Make} {item.Model}</p>
            <p>Range: {item["Electric Range"]} miles</p>
          </Popup>
        </CircleMarker>
      );
    })}
  </MapContainer>
);

export default EVMap;
