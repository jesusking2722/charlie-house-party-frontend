import { useState } from "react";
import {
  Button,
  CardEffectSlider,
  CardEffectSliderItemType,
  Map,
  Modal,
  PartyLocation,
} from "../../components";

const partyLocations: PartyLocation[] = [
  {
    id: "1",
    lat: 37.7749,
    lng: -122.4194,
    address: "123 Main St, San Francisco, CA",
    partyType: "Birthday Party",
    attendees: 50,
  },
  {
    id: "2",
    lat: 37.7849,
    lng: -122.4094,
    address: "456 Broadway, San Francisco, CA",
    partyType: "Wedding Reception",
    attendees: 100,
  },
  {
    id: "3",
    lat: 37.7649,
    lng: -122.4294,
    address: "789 Market St, San Francisco, CA",
    partyType: "Graduation Party",
    attendees: 75,
  },
];

const initialSlides: CardEffectSliderItemType[] = [
  {
    title: "Special House Party",
    subtitle: "Enjoy our special house party",
    imgSource: "./assets/pngs/model2.png",
  },
  {
    title: "Special House Party",
    subtitle: "Enjoy our special house party",
    imgSource: "./assets/pngs/model1.png",
  },
];

const Home = () => {
  const [selectedParty, setSelectedParty] = useState<PartyLocation | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleLocationClick = (party: PartyLocation) => {
    setSelectedParty(party);
    setModalOpen(true);
  };

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-8">
      <CardEffectSlider slides={initialSlides} />
      <div className="w-full h-[500px] rounded-xl shadow-lg">
        <Map parties={partyLocations} onClick={handleLocationClick} />
      </div>
      <Modal
        title={selectedParty?.partyType ?? ""}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-sm text-black">
            <strong>Address:</strong> {selectedParty?.address}
          </h2>
          <h2 className="text-sm text-black">
            <strong>Attendees: </strong>
            {selectedParty?.attendees}
          </h2>
        </div>
        <div className="mt-6 flex flex-row items-center justify-end gap-4">
          <Button
            type="primary"
            label="Apply to join"
            icon="solar:document-medicine-bold-duotone"
          />
          <Button
            type="outline"
            label="Cancel"
            icon="solar:arrow-right-outline"
            onClick={() => {
              setModalOpen(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
