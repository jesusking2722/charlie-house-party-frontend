import { useState } from "react";
import { Dropdown, IconButton, RegionSelect, Tooltip } from "../../components";
import { Party } from "../../types";
import PartyCardGroup from "./PartyCardGroup";
import countryList from "react-select-country-list";

const initialPartyTypes = ["birthday", "common", "wedding", "corporate"];

const initialParties: Party[] = [
  {
    id: "1",
    title: "Birth Day Party",
    type: "birthday",
    country: "US",
    region: "Califonia",
    address: "",
    createdAt: new Date(),
    openingAt: new Date(),
    creator: {
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      avatar: "./assets/pngs/user.png",
      emailVerified: true,
      phone: "",
      phoneVerified: false,
      kycVerified: false,
      shortname: "@jhondoe",
      reviews: [],
      createdAt: new Date(),
    },
    applicants: [],
    description:
      "Hey everyone! 🎂🥳 It's that time of the year again, and I’m throwing an epic birthday party to celebrate! I’d love for you to join me for a night full of fun, laughter, music, and great vibes! 🎶✨. It won’t be the same without you, so come celebrate with me! Let’s make this a legendary night! 🔥 RSVP by [Insert RSVP Deadline] so I can plan accordingly. Can’t wait to see you all there! 🥳🎈",
  },
  {
    id: "1",
    title: "Birth Day Party",
    type: "birthday",
    country: "US",
    region: "Califonia",
    address: "",
    createdAt: new Date(),
    openingAt: new Date(),
    creator: {
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      avatar: "./assets/pngs/user.png",
      emailVerified: true,
      phone: "",
      phoneVerified: false,
      kycVerified: false,
      shortname: "@jhondoe",
      reviews: [],
      createdAt: new Date(),
    },
    applicants: [],
    description:
      "Hey everyone! 🎂🥳 It's that time of the year again, and I’m throwing an epic birthday party to celebrate! I’d love for you to join me for a night full of fun, laughter, music, and great vibes! 🎶✨. It won’t be the same without you, so come celebrate with me! Let’s make this a legendary night! 🔥 RSVP by [Insert RSVP Deadline] so I can plan accordingly. Can’t wait to see you all there! 🥳🎈",
  },
  {
    id: "1",
    title: "Birth Day Party",
    type: "birthday",
    country: "US",
    region: "Califonia",
    address: "",
    createdAt: new Date(),
    openingAt: new Date(),
    creator: {
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      avatar: "./assets/pngs/user.png",
      emailVerified: true,
      phone: "",
      phoneVerified: false,
      kycVerified: false,
      shortname: "@jhondoe",
      reviews: [],
      createdAt: new Date(),
    },
    applicants: [],
    description:
      "Hey everyone! 🎂🥳 It's that time of the year again, and I’m throwing an epic birthday party to celebrate! I’d love for you to join me for a night full of fun, laughter, music, and great vibes! 🎶✨. It won’t be the same without you, so come celebrate with me! Let’s make this a legendary night! 🔥 RSVP by [Insert RSVP Deadline] so I can plan accordingly. Can’t wait to see you all there! 🥳🎈",
  },
  {
    id: "1",
    title: "Birth Day Party",
    type: "birthday",
    country: "US",
    region: "Califonia",
    address: "",
    createdAt: new Date(),
    openingAt: new Date(),
    creator: {
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      avatar: "./assets/pngs/user.png",
      emailVerified: true,
      phone: "",
      phoneVerified: false,
      kycVerified: false,
      shortname: "@jhondoe",
      reviews: [],
      createdAt: new Date(),
    },
    applicants: [],
    description:
      "Hey everyone! 🎂🥳 It's that time of the year again, and I’m throwing an epic birthday party to celebrate! I’d love for you to join me for a night full of fun, laughter, music, and great vibes! 🎶✨. It won’t be the same without you, so come celebrate with me! Let’s make this a legendary night! 🔥 RSVP by [Insert RSVP Deadline] so I can plan accordingly. Can’t wait to see you all there! 🥳🎈",
  },
  {
    id: "1",
    title: "Birth Day Party",
    type: "birthday",
    country: "US",
    region: "Califonia",
    address: "",
    createdAt: new Date(),
    openingAt: new Date(),
    creator: {
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      avatar: "./assets/pngs/user.png",
      emailVerified: true,
      phone: "",
      phoneVerified: false,
      kycVerified: false,
      shortname: "@jhondoe",
      reviews: [],
      createdAt: new Date(),
    },
    applicants: [],
    description:
      "Hey everyone! 🎂🥳 It's that time of the year again, and I’m throwing an epic birthday party to celebrate! I’d love for you to join me for a night full of fun, laughter, music, and great vibes! 🎶✨. It won’t be the same without you, so come celebrate with me! Let’s make this a legendary night! 🔥 RSVP by [Insert RSVP Deadline] so I can plan accordingly. Can’t wait to see you all there! 🥳🎈",
  },
  {
    id: "1",
    title: "Birth Day Party",
    type: "birthday",
    country: "US",
    region: "Califonia",
    address: "",
    createdAt: new Date(),
    openingAt: new Date(),
    creator: {
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      avatar: "./assets/pngs/user.png",
      emailVerified: true,
      phone: "",
      phoneVerified: false,
      kycVerified: false,
      shortname: "@jhondoe",
      reviews: [],
      createdAt: new Date(),
    },
    applicants: [],
    description:
      "Hey everyone! 🎂🥳 It's that time of the year again, and I’m throwing an epic birthday party to celebrate! I’d love for you to join me for a night full of fun, laughter, music, and great vibes! 🎶✨. It won’t be the same without you, so come celebrate with me! Let’s make this a legendary night! 🔥 RSVP by [Insert RSVP Deadline] so I can plan accordingly. Can’t wait to see you all there! 🥳🎈",
  },
  {
    id: "1",
    title: "Birth Day Party",
    type: "birthday",
    country: "US",
    region: "Califonia",
    address: "",
    createdAt: new Date(),
    openingAt: new Date(),
    creator: {
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      avatar: "./assets/pngs/user.png",
      emailVerified: true,
      phone: "",
      phoneVerified: false,
      kycVerified: false,
      shortname: "@jhondoe",
      reviews: [],
      createdAt: new Date(),
    },
    applicants: [],
    description:
      "Hey everyone! 🎂🥳 It's that time of the year again, and I’m throwing an epic birthday party to celebrate! I’d love for you to join me for a night full of fun, laughter, music, and great vibes! 🎶✨. It won’t be the same without you, so come celebrate with me! Let’s make this a legendary night! 🔥 RSVP by [Insert RSVP Deadline] so I can plan accordingly. Can’t wait to see you all there! 🥳🎈",
  },
  {
    id: "1",
    title: "Birth Day Party",
    type: "birthday",
    country: "US",
    region: "Califonia",
    address: "",
    createdAt: new Date(),
    openingAt: new Date(),
    creator: {
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      avatar: "./assets/pngs/user.png",
      emailVerified: true,
      phone: "",
      phoneVerified: false,
      kycVerified: false,
      shortname: "@jhondoe",
      reviews: [],
      createdAt: new Date(),
    },
    applicants: [],
    description:
      "Hey everyone! 🎂🥳 It's that time of the year again, and I’m throwing an epic birthday party to celebrate! I’d love for you to join me for a night full of fun, laughter, music, and great vibes! 🎶✨. It won’t be the same without you, so come celebrate with me! Let’s make this a legendary night! 🔥 RSVP by [Insert RSVP Deadline] so I can plan accordingly. Can’t wait to see you all there! 🥳🎈",
  },
  {
    id: "1",
    title: "Birth Day Party",
    type: "birthday",
    country: "US",
    region: "Califonia",
    address: "",
    createdAt: new Date(),
    openingAt: new Date(),
    creator: {
      name: "Jhon Doe",
      email: "jhondoe@gmail.com",
      avatar: "./assets/pngs/user.png",
      emailVerified: true,
      phone: "",
      phoneVerified: false,
      kycVerified: false,
      shortname: "@jhondoe",
      reviews: [],
      createdAt: new Date(),
    },
    applicants: [],
    description:
      "Hey everyone! 🎂🥳 It's that time of the year again, and I’m throwing an epic birthday party to celebrate! I’d love for you to join me for a night full of fun, laughter, music, and great vibes! 🎶✨. It won’t be the same without you, so come celebrate with me! Let’s make this a legendary night! 🔥 RSVP by [Insert RSVP Deadline] so I can plan accordingly. Can’t wait to see you all there! 🥳🎈",
  },
];

const Parites = () => {
  const [parties, setParties] = useState<Party[]>(initialParties);
  const [country, setCountry] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [partyType, setPartyType] = useState<string>("");

  const countryCode = countryList();

  const handleCountryChange = (selectedCountry: string) => {
    const selectedParites = parties.filter(
      (party) => party.country === countryCode.getValue(selectedCountry)
    );
    setParties(selectedParites);
    setCountry(selectedCountry);
    setRegion("");
  };

  const handleRegionChange = (selectedRegion: string) => {
    const selectedParties = parties.filter(
      (party) => party.region === selectedRegion
    );
    setParties(selectedParties);
    setRegion(selectedRegion);
  };

  const handlePartyTypeChange = (selectedPartyType: string) => {
    const selectedParties = parties.filter(
      (party) => party.type === selectedPartyType
    );
    setParties(selectedParties);
    setPartyType(selectedPartyType);
  };

  const handleResetAll = () => {
    setCountry("");
    setRegion("");
    setPartyType("");
    setParties(initialParties);
  };

  return (
    <div className="w-[80%] mx-auto flex flex-col gap-8">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="">
          <RegionSelect
            country={country}
            region={region}
            onCountryChange={handleCountryChange}
            onRegionChange={handleRegionChange}
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <Dropdown
            label="Select party type"
            dropdowns={initialPartyTypes}
            selectedDropdown={partyType}
            onSelect={handlePartyTypeChange}
          />
          <Tooltip message="Reset all">
            <IconButton
              icon="solar:restart-bold-duotone"
              onClick={handleResetAll}
            />
          </Tooltip>
        </div>
      </div>
      <PartyCardGroup parties={parties} />
    </div>
  );
};

export default Parites;
