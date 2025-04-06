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
import { Geo } from "../../types";
import { validateAddress } from "../../utils";
import countryList from "react-select-country-list";
import { AnimatePresence, motion } from "motion/react";
import OpenAiForm from "./OpenAiForm";

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
  >("complete");
  const [partyType, setPartyType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const countryCode = countryList();

  const handleBasic = async () => {
    try {
      setLoading(true);
      const code = countryCode.getValue(country);
      const addressInfo = await validateAddress(address, code);
      if (addressInfo) {
        if (addressInfo.geo) {
          setAddress(addressInfo.address);
          setAddressGeo(addressInfo.geo);
        }
        setActiveScreen("complete");
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
      setLoading(true);
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
          <Icon icon="solar:document-add-bold" className="text-black w-8 h-8" />
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
          className="w-1/2 relative bg-gradient rounded-xl shadow-xl"
        >
          <div className="absolute inset-[1px] bg-white rounded-xl">
            <AnimatePresence mode="wait">
              {activeScreen === "basic" ? (
                <motion.div
                  key="basic-section"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 100 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="absolute inset-[1px] rounded-xl w-full flex flex-col items-center justify-center gap-4 py-4 px-12"
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
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 100 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="absolute inset-[1px] rounded-xl w-full flex flex-col items-center justify-center gap-4 py-4 px-12"
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
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 100 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className=""
                ></motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
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
