import { useEffect, useState } from "react";
import {
  Button,
  CardEffectSlider,
  CardEffectSliderItemType,
  Dropdown,
  Map,
  Modal,
  RegionSelect,
} from "../../components";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";
import { Center, Spinner } from "../../components/common";
import { getCountryGeo } from "../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Party } from "../../types";

const initialPartyTypes = ["Birthday Party", "Wedding", "Corporate Event"];

const initialSlides: CardEffectSliderItemType[] = [
  {
    title: "Special House Party",
    subtitle: "Enjoy our special house party",
    imgSource: "./assets/pngs/model2.png",
  },
  {
    title: "Special House Party",
    subtitle: "Enjoy our special house party",
    imgSource: "./assets/pngs/model3.png",
  },
  {
    title: "Special House Party",
    subtitle: "Enjoy our special house party",
    imgSource: "./assets/pngs/model1.png",
  },
  {
    title: "Special House Party",
    subtitle: "Enjoy our special house party",
    imgSource: "./assets/pngs/model4.png",
  },
  {
    title: "Special House Party",
    subtitle: "Enjoy our special house party",
    imgSource: "./assets/pngs/model5.png",
  },
];

const Home = () => {
  const [availableParties, setAvailableParties] = useState<Party[]>([]);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedPartyType, setSelectedPartyType] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<Center | null>(null);
  const [mapZoom, setMapZoom] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const countryCode = countryList();
  const navigate = useNavigate();

  const { parties } = useSelector((state: RootState) => state.party);

  const handleLocationClick = (party: Party) => {
    setSelectedParty(party);
    setModalOpen(true);
  };

  const handleCountryChange = (val: any) => {
    const code = countryCode.getValue(val);
    const filteredParties = availableParties.filter(
      (party) => party.country === val
    );
    const center = getCountryGeo(code);
    setSelectedCountry(val);
    setAvailableParties(filteredParties);
    setMapCenter(center);
    setMapZoom(5);
  };

  const handleResetAll = () => {
    setSelectedCountry("");
    setSelectedPartyType("");
    setAvailableParties(parties);
    setMapCenter(null);
    setMapZoom(null);
  };

  useEffect(() => {
    if (parties.length > 0) {
      setAvailableParties(parties);
    }
  }, [parties]);

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-14">
      {loading && <Spinner />}
      <CardEffectSlider slides={initialSlides} />
      <div className="w-full flex flex-col gap-8">
        <h1 className="text-green-500 text-xl font-semibold">
          Let's find out the best parties all over the world
        </h1>
        <div className="w-full grid grid-cols-2">
          <RegionSelect
            country={selectedCountry}
            hideRegion={true}
            onCountryChange={handleCountryChange}
          />
          <div className="flex flex-row items-center gap-4">
            <Dropdown
              label="Select party type"
              dropdowns={initialPartyTypes}
              selectedDropdown={selectedPartyType}
              onSelect={setSelectedPartyType}
            />
            <Button
              type="transparent"
              label="Reset All"
              onClick={handleResetAll}
            />
            <Button
              type="primary"
              label="See All"
              icon="solar:square-alt-arrow-right-line-duotone"
              onClick={() => {
                navigate("/parties");
              }}
            />
          </div>
        </div>
        <div className="w-full h-[500px] rounded-xl shadow-lg">
          <Map
            parties={parties}
            center={mapCenter}
            zoom={mapZoom}
            setZoom={setMapZoom}
            onClick={handleLocationClick}
          />
        </div>
      </div>
      <Modal
        title={selectedParty?.type ?? ""}
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
            {selectedParty?.applicants.length}
          </h2>
        </div>
        <div className="mt-6 flex flex-row items-center justify-end gap-4">
          <Button
            type="primary"
            label="Apply to join"
            icon="solar:document-medicine-bold-duotone"
            onClick={() => {
              navigate(`/parties/${selectedParty?._id}`);
              setModalOpen(false);
            }}
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
