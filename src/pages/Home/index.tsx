import { useState, useEffect } from "react";
import {
  Button,
  CardEffectSlider,
  CardEffectSliderItemType,
  Dropdown,
  Map,
  Modal,
  PartyLocation,
  RegionSelect,
} from "../../components";
import countryList from "react-select-country-list";

const initialPartyLocations: PartyLocation[] = [
  {
    id: "1",
    lat: 37.7749,
    lng: -122.4194,
    address: "123 Main St, San Francisco, CA",
    partyType: "Birthday Party",
    attendees: 50,
    country: "US",
    region: "California",
  },
  {
    id: "2",
    lat: 37.7849,
    lng: -122.4094,
    address: "456 Broadway, San Francisco, CA",
    partyType: "Wedding Reception",
    attendees: 100,
    country: "US",
    region: "California",
  },
  {
    id: "3",
    lat: 37.7649,
    lng: -122.4294,
    address: "789 Market St, San Francisco, CA",
    partyType: "Graduation Party",
    attendees: 75,
    country: "US",
    region: "California",
  },
];

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
    imgSource: "./assets/pngs/model1.png",
  },
];

const Home = () => {
  const [parties, setParties] = useState<PartyLocation[]>(
    initialPartyLocations
  );
  const [selectedParty, setSelectedParty] = useState<PartyLocation | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedPartyType, setSelectedPartyType] = useState<string>("");
  const countryCode = countryList();

  const handleLocationClick = (party: PartyLocation) => {
    setSelectedParty(party);
    setModalOpen(true);
  };

  // Dynamic map center based on selected country
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [mapZoom, setMapZoom] = useState(null);

  // Update map center and zoom when the country changes
  // useEffect(() => {
  //   if (selectedCountry && countryCoordinates[selectedCountry]) {
  //     const coordinates = countryCoordinates[selectedCountry];
  //     setMapCenter(coordinates); // Update center
  //     setMapZoom(6); // Default zoom for country level
  //   }
  // }, [selectedCountry]);

  const handleCountryChange = (val: any) => {
    setSelectedCountry(val);
    const filteredParties = initialPartyLocations.filter(
      (party) => party.country === countryCode.getValue(selectedCountry)
    );
    setParties(filteredParties);
  };

  const handleRegionChange = (val: any) => {
    setSelectedRegion(val);
    const filteredParties = initialPartyLocations.filter(
      (party) =>
        party.country === selectedCountry || party.region === selectedRegion
    );
    setParties(filteredParties);
  };

  const handleResetAll = () => {
    setSelectedCountry("");
    setSelectedRegion("");
    setSelectedPartyType("");
  };

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-14">
      <CardEffectSlider slides={initialSlides} />
      <div className="w-full flex flex-col gap-8">
        <div className="w-full grid grid-cols-2">
          <RegionSelect
            country={selectedCountry}
            region={selectedRegion}
            onCountryChange={handleCountryChange}
            onRegionChange={handleRegionChange}
          />
          <div className="flex flex-row items-center justify-between">
            <Dropdown
              label="Select party type"
              dropdowns={initialPartyTypes}
              selectedDropdown={selectedPartyType}
              onSelect={setSelectedPartyType}
            />
            <div className="flex flex-row items-center gap-4">
              <Button
                type="transparent"
                label="Reset All"
                onClick={handleResetAll}
              />
              <Button
                type="primary"
                label="See All"
                icon="solar:square-alt-arrow-right-line-duotone"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[500px] rounded-xl shadow-lg">
          <Map
            parties={parties}
            center={mapCenter}
            zoom={mapZoom}
            onClick={handleLocationClick}
          />
        </div>
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
