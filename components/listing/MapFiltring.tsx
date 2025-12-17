"use client";
import { listing } from "@prisma/client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import React, { useState } from "react";


function MapFiltring({ listing }: { listing: listing[] }) {
  const location = {
    lat: Number(listing[0]?.location?.lat) || -47.0369,
    lng: Number(listing[0]?.location?.lng) || 28.9072,
  };
  const [open, setOpen] = useState(false);

  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_GOOGLE_API_KEY_MAP!}>
        <div className="mt-2 w-[100%] sm:w-[100%]" style={{ height: "80vh" }}>
          <Map
            scrollwheel={true}
            defaultZoom={8}
            defaultCenter={location}
            mapId={process.env.NEXT_PUBLIC_MAP_ID}
          >
            {listing.map((item) => {
              const location = {
                lat: Number(item.location.lat),
                lng: Number(item.location.lng),
              };
              return (
                <AdvancedMarker
                  key={item.id}
                  onClick={() => setOpen(true)}
                  position={location}
                >
                  <Pin
                    background={"black"}
                    borderColor={"red"}
                    glyphColor={"white"}
                  />
                </AdvancedMarker>
              );
            })}
            {open && (
              <InfoWindow
                position={location}
                onCloseClick={() => setOpen(false)}
              >
      
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
}

export default MapFiltring;
