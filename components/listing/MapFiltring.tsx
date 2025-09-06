"use client";
import { Listing } from "@prisma/client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import Image from "next/image";
// interface locar {
//   lat: number;
//   lng: number;
// }

function MapFiltring({ listing }: { listing: Listing[] }) {
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
                {/* <h1>joolgtr</h1>
                <div className="block border w- border-gray-200 rounded-lg hover:shadow-2xs focus:outline-hidden dark:border-neutral-700">
                  <div className="relative flex items-center overflow-hidden">
                    <Image
                      src={item.photos[0]}
                      alt={"cfv"}
                      fill
                      className=" w-8 h-full absolute inset-0 bg-black object-cover rounded-s-lg"
                      sizes=""
                    />
                    <div className="grow p-4 ms-32 sm:ms-48">
                      <div className="min-h-24 flex flex-col justify-center">
                        <h3 className="font-semibold text-sm text-gray-800 dark:text-neutral-300">
                          Studio by Mailchimp
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 bg-white dark:text-neutral-500">
                          Produce professional, reliable streams easily
                          leveraging Mailchimps innovative broadcast studio.
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
}

export default MapFiltring;
