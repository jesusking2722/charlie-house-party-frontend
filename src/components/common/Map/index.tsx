import React, { FC, useCallback } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import "./style.css";
import { GOOGLE_MAP_API } from "../../../constant";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import {Party} from "../../../types";

export interface PartyLocation {
  id: string;
  lat: number;
  lng: number;
  address: string;
  partyType: string;
  attendees: number;
  country: string;
  region: string;
}

const PartyMarker = ({
  party,
  onClick,
}: {
  party: Party;
  onClick: (party: Party) => void;
}) => {
  return (
    <AdvancedMarker
      position={{lat: party.geo.lat, lng: party.geo.lng}}
      onClick={() => {
        onClick(party);
      }}
    >
      <motion.div
        initial={{ y: -5 }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 1,
            ease: "easeInOut",
          },
        }}
        className="w-4 h-4"
      >
        <Icon
          icon="solar:map-point-wave-bold-duotone"
          className="text-red-500 w-full h-full"
        />
      </motion.div>
    </AdvancedMarker>
  );
};

export interface Center {
  lat: number;
  lng: number;
}

export interface MapInterface {
  parties: Party[];
  center: Center | null;
  zoom: number | null;
  setZoom: (zoom: number) => void;
  onClick: (party: Party) => void;
}

const Map: FC<MapInterface> = ({ parties, center, zoom, setZoom, onClick }) => {
  const onZoomChanged = useCallback((e: any) => {
    const newZoom = e.detail.zoom;
    setZoom(newZoom);
  }, []);

  return (
    <APIProvider apiKey={GOOGLE_MAP_API}>
      <GoogleMap
        defaultCenter={{ lat: 52.237, lng: 19.017 }}
        defaultZoom={2}
        center={center}
        zoom={zoom}
        gestureHandling={"greedy"}
        mapId={GOOGLE_MAP_API}
        className="w-full h-full map rounded-[20px] shadow-lg border border-[#d5fd42]"
        onZoomChanged={onZoomChanged}
      >
        {parties.map((party) => (
          <PartyMarker key={party._id} party={party} onClick={onClick} />
        ))}
      </GoogleMap>
    </APIProvider>
  );
};

export default Map;
