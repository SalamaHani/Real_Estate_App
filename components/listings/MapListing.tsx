"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
interface locar {
  lat: number;
  lng: number;
}
import React from "react";
function MapListing({ location }: { location: locar }) {
  const [open, setOpen] = useState(false);
  return (
    <APIProvider apiKey={process.env.NEXT_GOOGLE_API_KEY_MAP!}>
      <div className="mt-32 w-[100%] sm:w-[50%]" style={{ height: "50vh" }}>
        <Map center={location} zoom={14} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          <AdvancedMarker position={location} onClick={() => setOpen(true)}>
            <Pin
              background={"red"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={location} onCloseClick={() => setOpen(false)}>
              <p>Im in Hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

export default MapListing;
