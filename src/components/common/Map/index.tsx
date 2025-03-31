import React from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export interface PartyLocation {
  id: string;
  lat: number;
  lng: number;
}

const PartyMarker = ({ party }: { party: PartyLocation }) => {
  return (
    <AdvancedMarker position={{ lat: party.lat, lng: party.lng }}>
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
      </span>
    </AdvancedMarker>
  );
};

const PartyMap = ({ parties }: { parties: PartyLocation[] }) => {
  return (
    <APIProvider apiKey="AIzaSyDRgkhZgl0RG7UoQiqU6LkFv1BsT6Upg1Y">
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
        gestureHandling={"greedy"}
        mapId={"AIzaSyDRgkhZgl0RG7UoQiqU6LkFv1BsT6Upg1Y"}
      >
        {parties.map((party) => (
          <PartyMarker key={party.id} party={party} />
        ))}
      </Map>
    </APIProvider>
  );
};

export default PartyMap;
