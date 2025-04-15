import { Icon } from "@iconify/react";
import {
  Button,
  DatePicker,
  Dropdown,
  IconButton,
  Input,
  Modal,
  PlaceAutoComplete,
  RegionSelect,
  Spinner,
  Textarea,
  Tooltip,
} from "../../components";
import { BASE_URL, PARTY_TYPES } from "../../constant";
import { useState } from "react";
import { Geo, Party, PartyType } from "../../types";
import { getCityName, validateAddress } from "../../utils";
import countryList from "react-select-country-list";
import { AnimatePresence, motion } from "motion/react";
import OpenAiForm from "./OpenAiForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import socket from "../../lib/socketInstance";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { store } from "../../redux/store";

const CreateParty = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [address, setAddress] = useState<any>(null);
  const [addressGeo, setAddressGeo] = useState<Geo | null>(null);
  const [country, setCountry] = useState<string>("");
  const [openingAt, setOpeningAt] = useState<Date | null>(null);
  const [invalidAddress, setInvalidAddress] = useState<boolean>(false);
  const [activeScreen, setActiveScreen] = useState<
    "basic" | "complete" | "welcome"
  >("basic");
  const [partyType, setPartyType] = useState<PartyType | string>("");
  const [description, setDescription] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [region, setRegion] = useState<string | null>(null);
  const [newCreatedParty, setNewCreatedParty] = useState<Party | null>(null);
  const countryCode = countryList();

  const { user } = useSelector((state: RootState) => state.auth);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  const handleBasic = async () => {
    try {
      setLoading(true);
      const code = countryCode.getValue(country);
      const addressInfo = await validateAddress(address, code);
      if (addressInfo) {
        if (typeof addressInfo === "boolean") {
          toast.error("Unsupported country");
          setLoading(false);
          return;
        }
        if (addressInfo.geo) {
          setAddress(addressInfo.address);
          setAddressGeo(addressInfo.geo);
          const selectedRegion = await getCityName(
            addressInfo.geo.lat,
            addressInfo.geo.lng
          );
          if (selectedRegion) {
            setRegion(selectedRegion);
            setActiveScreen("complete");
          } else {
            setInvalidAddress(true);
          }
        }
      } else {
        setInvalidAddress(true);
      }
    } catch (error) {
      console.log("handle first continue error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      if (!user && partyType !== "" && !region) return;
      setLoading(true);
      const newParty: Party = {
        type: partyType ?? "",
        title,
        address,
        geo: {
          lat: Number(addressGeo?.lat),
          lng: Number(addressGeo?.lng),
        },
        country,
        region,
        description,
        applicants: [],
        openingAt: openingAt ?? new Date(),
        createdAt: new Date(),
        creator: user,
      };

      // Create a promise that resolves when the new party arrives in the store
      const waitForNewParty = new Promise<Party>((resolve) => {
        const unsubscribe = store.subscribe(() => {
          const state = store.getState();
          const latestParty = state.party.parties[0];
          if (latestParty && latestParty._id) {
            unsubscribe(); // Clean up the subscription
            resolve(latestParty);
          }
        });
      });

      // Emit the party creation event
      socket.emit("party:creating", newParty, user?._id);

      // Wait for the new party to arrive in the store
      const createdParty = await waitForNewParty;
      setNewCreatedParty(createdParty);
      setActiveScreen("welcome");
    } catch (error) {
      console.log("handle complete error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-14">
      {loading && <Spinner />}
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-black text-2xl">
            Create your <strong>happy party</strong> post
          </h1>
          <Icon
            icon="solar:document-add-bold"
            className="text-green-500 w-8 h-8"
          />
        </div>
        <p className="text-black text-lg">Let's make the best post together</p>
      </div>
      <div className="w-full flex flex-row gap-4">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
          className="w-1/2 rounded-xl shadow-xl"
        >
          <img
            src={BASE_URL + "/assets/pngs/create.png"}
            alt="CREATE"
            className="w-full h-auto rounded-xl"
          />
        </motion.div>
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
          className="w-1/2 xl:basis-3/5 bg-white/10 backdrop-blur-sm border border-white rounded-xl shadow-xl flex flex-col items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {activeScreen === "basic" ? (
              <motion.div
                key="basic-section"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 100 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="w-full flex flex-col items-center justify-center gap-8 py-4 px-12 xl:px-8 xl:py-8"
              >
                <Input
                  type="text"
                  label="Party Title"
                  placeholder="Title"
                  icon="solar:document-bold"
                  value={title}
                  onChange={setTitle}
                />
                <RegionSelect
                  label="Party Country"
                  country={country}
                  onCountryChange={setCountry}
                  hideRegion={true}
                />
                <PlaceAutoComplete
                  label="Party address"
                  placeholder="Address"
                  icon="solar:point-on-map-bold-duotone"
                  invalid={invalidAddress}
                  invalidTxt="Input correct party address"
                  value={address}
                  country={countryCode.getValue(country)}
                  onChange={setAddress}
                  setGeo={setAddressGeo}
                />
                <DatePicker
                  label="Opening date"
                  icon="solar:calendar-add-bold-duotone"
                  placeholder="We are opening at..."
                  onChange={setOpeningAt}
                />
                <div className="flex items-center justify-center mt-4">
                  <Button
                    type="gradient"
                    label="Continue"
                    icon="solar:arrow-right-linear"
                    isRight={true}
                    disabled={
                      title === "" || !address || country === "" || !openingAt
                    }
                    onClick={handleBasic}
                  />
                </div>
              </motion.div>
            ) : activeScreen === "complete" ? (
              <motion.div
                key="complete-section"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 100 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="absolute inset-[1px] rounded-xl w-full flex flex-col items-center justify-center gap-8 py-4 px-12"
              >
                <Dropdown
                  label="Party type"
                  dropdowns={PARTY_TYPES}
                  selectedDropdown={partyType}
                  width="full"
                  onSelect={setPartyType}
                />
                <Textarea
                  placeholder="Write your party's description here..."
                  invalid={description === "" || description.length < 150}
                  invalidTxt="Description must be over than 150 letters"
                  value={description}
                  onChange={setDescription}
                />
                <div className="flex flex-row items-center justify-center mt-4 gap-4">
                  <Tooltip message="Write with AI">
                    <IconButton icon="solar:magic-stick-3-broken" />
                  </Tooltip>
                  <Button
                    type="gradient"
                    label="Continue"
                    icon="solar:arrow-right-linear"
                    isRight={true}
                    disabled={
                      partyType === "" ||
                      description === "" ||
                      description.length < 150
                    }
                    onClick={handleComplete}
                  />
                </div>
              </motion.div>
            ) : activeScreen === "welcome" ? (
              <motion.div
                key="welcome-section"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 100 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="w-full flex flex-col gap-4 items-center justify-center h-full"
              >
                <h1 className="text-black text-2xl">Congratulations!</h1>
                <p className="text-black text-lg">
                  Your party has been created successfully
                </p>
                <div className="flex flex-row items-center justify-center gap-4">
                  <Button
                    type="gradient"
                    label="Go to your party"
                    icon="solar:arrow-right-linear"
                    isRight={true}
                    onClick={() => {
                      if (newCreatedParty) {
                        navigate(`/parties/${newCreatedParty._id}`);
                      }
                    }}
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
      {activeScreen === "welcome" && <Confetti width={width} height={height} />}
      <Modal
        title="Write with AI"
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <OpenAiForm />
        <div className="w-full flex flex-row items-center justify-end gap-2 mt-2">
          <Button
            type="gradient"
            label="Save"
            icon="solar:check-circle-bold-duotone"
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreateParty;
