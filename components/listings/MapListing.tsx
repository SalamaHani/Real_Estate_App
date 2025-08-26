"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
interface locar {
  lng: number;
  lat: number;
}

function MapListing({ location }: { location: locar }) {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY_MAP!}>
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={14}>
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapListing;
