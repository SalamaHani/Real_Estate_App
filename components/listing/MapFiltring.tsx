"use client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import React from "react";
interface locar {
  lat: number;
  lng: number;
}

function MapFiltring({ location, city }: { location: locar; city: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_GOOGLE_API_KEY_MAP!}>
        <div className="mt-2 w-[100%] sm:w-[100%]" style={{ height: "100vh" }}>
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
              <InfoWindow
                position={location}
                onCloseClick={() => setOpen(false)}
              >
                <p>Im in {city}</p>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
}

export default MapFiltring;
