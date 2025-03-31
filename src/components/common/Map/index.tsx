import React, { FC } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import "./style.css";

export interface PartyLocation {
  id: string;
  lat: number;
  lng: number;
  address: string;
  partyType: string;
  attendees: number;
}

const PartyMarker = ({
  party,
  onClick,
}: {
  party: PartyLocation;
  onClick: (party: PartyLocation) => void;
}) => {
  return (
    <AdvancedMarker
      position={{ lat: party.lat, lng: party.lng }}
      onClick={() => {
        onClick(party);
      }}
    >
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
      </span>
    </AdvancedMarker>
  );
};

export interface MapInterface {
  parties: PartyLocation[];
  onClick: (party: PartyLocation) => void;
}

const Map: FC<MapInterface> = ({ parties, onClick }) => {
  return (
    <APIProvider apiKey="AIzaSyDRgkhZgl0RG7UoQiqU6LkFv1BsT6Upg1Y">
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
        gestureHandling={"greedy"}
        mapId={"AIzaSyDRgkhZgl0RG7UoQiqU6LkFv1BsT6Upg1Y"}
        className="w-full h-full map rounded-[20px] shadow-lg border border-[#d5fd42]"
      >
        {parties.map((party) => (
          <PartyMarker key={party.id} party={party} onClick={onClick} />
        ))}
      </GoogleMap>
    </APIProvider>
  );
};

export default Map;
