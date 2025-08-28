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
function MapListing({ location, city }: { location: locar; city: string }) {
  const [open, setOpen] = useState(false);
  return (
    <APIProvider apiKey={process.env.NEXT_GOOGLE_API_KEY_MAP!}>
      <div className="mt-32 w-[100%] sm:w-[50%]" style={{ height: "50vh" }}>
        <Map
          scrollwheel={true}
          defaultZoom={12}
          center={location}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          <AdvancedMarker position={location} onClick={() => setOpen(true)}>
            <Pin
              background={"red"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={location} onCloseClick={() => setOpen(false)}>
              <p>Im in {city}</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

export default MapListing;
