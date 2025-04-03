import { AnimatePresence, motion } from "motion/react";
import {
  Button,
  Input,
  Modal,
  RegionSelect,
  Spinner,
  Textarea,
  VideoShower,
} from "../../components";
import { useEffect, useRef, useState } from "react";
import PricingCard from "../Pricing/PricingCard";
import {
  useAppKitAccount,
  useAppKitProvider,
  useAppKitNetworkCore,
  type Provider,
  useAppKit,
} from "@reown/appkit/react";
import {
  BrowserProvider,
  JsonRpcApiProvider,
  JsonRpcSigner,
  Signer,
  ethers,
  parseUnits,
} from "ethers";
import { Address } from "@reown/appkit-adapter-ethers";
import { CHARLIE_TOKEN_ABI, CHARLIE_TOKEN_ADDRESS } from "../../contract";
import toast from "react-hot-toast";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { startKyc, updateFirstMe, updateMe } from "../../lib/scripts";
import { setAuthUser } from "../../redux/slices/authSlice";
import { User } from "../../types";
import countryList from "react-select-country-list";
import KycVerifier from "./KycVerifier";

const Onboarding = () => {
  const [name, setName] = useState<string>("");
  const [activeScreen, setActiveScreen] = useState<
    "name" | "country" | "kyc" | "subscription" | "welcome" | ""
  >("name");
  const [shortname, setShortname] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [kycOpen, setKycOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<1 | 3 | 6 | 12 | null>(
    null
  );
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [shortnameHint, setShortnameHint] = useState<string | null>(null);
  const [country, setCountry] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [about, setAbout] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetworkCore();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const { width, height } = useWindowSize();
  const countryCode = countryList();

  const { users } = useSelector((state: RootState) => state.users);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      setAvatarFile(file);
    }
  };

  const handleUserInfo = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      formData.append("name", name);
      formData.append("shortname", shortname);
      if (user?._id) {
        const response = await updateFirstMe({ id: user._id, formData });
        if (response.ok) {
          const { user } = response.data;
          dispatch(setAuthUser({ user }));
          setActiveScreen("country");
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log("handle user info error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = async (
    month: 1 | 3 | 6 | 12,
    price: number,
    isFree: boolean
  ) => {
    try {
      setLoading(true);
      if (user) {
        if (isFree) {
          const updatingUser: User = {
            ...user,
            membership: "free",
          };
          const response = await updateMe({ user: updatingUser });
          if (response.ok) {
            const { user } = response.data;
            dispatch(setAuthUser({ user }));
            setActiveScreen("welcome");
          }
        } else {
          setSelectedMonth(month);
          setSelectedPrice(price);
          setModalOpen(true);
        }
      }
    } catch (error) {
      console.log("handle select plan error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getCharlieContract = (signer: Signer) => {
    return new ethers.Contract(
      CHARLIE_TOKEN_ADDRESS,
      CHARLIE_TOKEN_ABI,
      signer
    );
  };

  const getSigner = (provider: JsonRpcApiProvider): Signer => {
    return new JsonRpcSigner(provider, address as Address);
  };

  const getBalance = async () => {
    const provider = new BrowserProvider(walletProvider, chainId);
    const signer = getSigner(provider);
    const charlieContract = getCharlieContract(signer);
    const balance = await charlieContract.balanceOf(address);
    const formattedBalance = ethers.formatUnits(balance, 18);
    return Number(formattedBalance);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const provider = new BrowserProvider(walletProvider, chainId);
      const signer = getSigner(provider);
      const charlieContract = getCharlieContract(signer);
      if (charlieContract) {
        const balance = await getBalance();
        if (balance < Number(selectedPrice)) {
          toast.error("Insufficient balance");
          setLoading(false);
          return;
        }
        await charlieContract.transfer(
          "0x8673A3038eE704435EfF81b330f0E78034e54BF2",
          parseUnits(selectedPrice.toString(), 18)
        );
      }
    } catch (error) {
      console.log("handle subscription error: ", error);
      toast.error("Error is caused while transaction is being handled");
    } finally {
      setLoading(false);
    }
  };

  const isValidShortname = (name: string): boolean => {
    return !!users.find((user) => user?.shortname === name);
  };

  const handleCountryContinue = async () => {
    try {
      setLoading(true);
      const updatingUser = {
        ...user,
        title,
        region,
        about,
        country: countryCode.getValue(country),
      };
      const response = await updateMe({ user: updatingUser as any });
      if (response.ok) {
        const { user } = response.data;
        dispatch(setAuthUser({ user }));
        setActiveScreen("subscription");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("handle country continue error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartVerification = async () => {
    try {
      setLoading(true);
      const response = await startKyc();
      if (response.ok) {
        const { user } = response.data;
        dispatch(setAuthUser({ user }));
      }
    } catch (error) {
      console.log("handle start verification error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name === "") return;

    const generateUsername = async () => {
      setLoading(true);
      const baseUsername = name.toLowerCase().replace(/\s+/g, ".");

      try {
        let suggestedUsername = baseUsername;
        let isTaken = users.find(
          (user) => user?.shortname === suggestedUsername
        );
        let counter = 1;

        while (isTaken) {
          suggestedUsername = `${baseUsername}${counter}`;
          isTaken = users.find((user) => user?.shortname === suggestedUsername);
          counter++;
        }

        setShortnameHint(suggestedUsername);
      } catch (error) {
        console.error("Error checking username:", error);
      } finally {
        setLoading(false);
      }
    };

    generateUsername();
  }, [name]);

  useEffect(() => {
    if (user) {
      if (!user.name) {
        setActiveScreen("name");
        return;
      } else if (!user.country) {
        setActiveScreen("country");
        return;
      } else if (!user.kycVerified) {
        setActiveScreen("kyc");
        return;
      } else if (!user.membership) {
        setActiveScreen("subscription");
        return;
      } else {
        setActiveScreen("welcome");
      }
    }
  }, [user]);

  return (
    <div className="w-[80%] mx-auto min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {loading && <Spinner />}
      <AnimatePresence mode="wait">
        {activeScreen === "name" ? (
          <motion.div
            key="first-onboarding-section"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-row gap-4"
          >
            {/* First onboarding section for name and avatar */}
            <motion.div
              initial={{ x: -600 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="basis-2/3 bg-white rounded-xl shadow-lg"
            >
              <img
                src="../assets/pngs/model2.png"
                alt="MODEL"
                className="w-full h-full rounded-xl object-cover object-center"
              />
            </motion.div>
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="basis-1/3 bg-black/5 border border-white backdrop-blur-sm rounded-xl shadow-lg py-4"
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                {/* Avatar upload and name input */}
                <div className="w-full px-12 flex flex-col items-center justify-center">
                  <img
                    src="./logo.png"
                    alt="LOGO"
                    className="w-[120px] h-auto"
                  />
                  <h1 className="gradient-text font-semibold text-2xl text-center">
                    WELCOME TO YOUR ONBOARDING !!!
                  </h1>
                </div>
                <div className="flex flex-col gap-4 w-full px-12">
                  <button
                    className="w-full flex flex-row items-center gap-4 group border hover:border-[#c4f70f] hover:shadow-lg transition-all duration-300 ease-in-out rounded-xl p-2"
                    onClick={handleUploadClick}
                  >
                    {avatar === "" ? (
                      <div className="w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center">
                        <Icon
                          icon="solar:shield-user-bold-duotone"
                          className="text-[#353737] w-14 h-14"
                        />
                      </div>
                    ) : (
                      <img
                        src={avatar}
                        alt={name}
                        className="w-[100px] h-[100px] rounded-full object-cover object-center"
                      />
                    )}
                    <Icon
                      icon="solar:cloud-upload-bold-duotone"
                      className="w-10 h-10"
                    />
                    <div className="flex-1 flex flex-col items-start gap-1">
                      <span className="text-sm text-black">
                        File limits 5MB
                      </span>
                      <span className="text-sm text-black">
                        Upload your avatar
                      </span>
                    </div>
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col gap-4 w-full px-12">
                    <Input
                      type="text"
                      placeholder="Full name"
                      icon="solar:user-bold-duotone"
                      invalid={name === ""}
                      invalidTxt="Input your full name"
                      value={name}
                      onChange={setName}
                    />
                    <div className="w-full flex flex-col gap-1">
                      <Input
                        type="text"
                        placeholder="Your user id"
                        icon="solar:shield-user-bold-duotone"
                        value={shortname}
                        invalid={
                          shortname === "" || isValidShortname(shortname)
                        }
                        invalidTxt="Wrong id"
                        onChange={setShortname}
                      />
                      {shortnameHint && shortnameHint !== "" && (
                        <p className="text-xs p-1 text-black">
                          Suggesting your id:{" "}
                          <button
                            className="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => {
                              setShortname(shortnameHint);
                            }}
                          >
                            <strong>{shortnameHint}</strong>
                          </button>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      label="Continue"
                      type="transparent"
                      icon="solar:square-double-alt-arrow-right-broken"
                      disabled={name === "" || shortname === ""}
                      onClick={handleUserInfo}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : activeScreen === "country" ? (
          <motion.div
            key="country-onboarding-section"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-row gap-4"
          >
            {/* Second onboarding section for country selection */}
            <motion.div
              initial={{ x: -600 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="basis-2/3 bg-white rounded-xl shadow-lg"
            >
              <img
                src="../assets/pngs/model3.png"
                alt="MODEL"
                className="w-full h-full rounded-xl object-cover object-center"
              />
            </motion.div>
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="basis-1/3 bg-black/5 border border-white backdrop-blur-sm rounded-xl shadow-lg py-4"
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-12">
                <RegionSelect
                  country={country}
                  region={region}
                  onCountryChange={setCountry}
                  onRegionChange={setRegion}
                />
                <Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  invalid={title === ""}
                  invalidTxt="Input your professional title"
                  onChange={setTitle}
                />
                <Textarea
                  invalid={about === ""}
                  invalidTxt="Input your description"
                  placeholder="About yourself"
                  value={about}
                  onChange={setAbout}
                />
                <Button
                  type="transparent"
                  label="Continue"
                  icon="solar:square-double-alt-arrow-right-broken"
                  disabled={
                    country === "" ||
                    region === "" ||
                    title === "" ||
                    about === ""
                  }
                  onClick={handleCountryContinue}
                />
              </div>
            </motion.div>
          </motion.div>
        ) : activeScreen === "kyc" ? (
          <motion.div
            key="kyc-onboarding-section"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center justify-center gap-8"
          >
            {/* KYC verification section */}
            <h1 className="gradient-text text-3xl font-semibold">
              WELCOME TO YOUR KYC VERIFICATION
            </h1>
            <VideoShower
              title="How to verify KYC"
              videoSource="http://localhost:3000/assets/videos/kyc.mp4"
            />
            <div className="w-full flex flex-row items-center justify-center gap-14">
              <Button
                type="transparent"
                label="Skip"
                icon="solar:skip-next-bold"
                onClick={() => {
                  if (user?.membership) {
                    setActiveScreen("welcome");
                  } else {
                    setActiveScreen("subscription");
                  }
                }}
              />
              <Button
                type="primary"
                label="Start"
                icon="solar:square-double-alt-arrow-right-broken"
                onClick={() => {
                  setKycOpen(true);
                }}
              />
            </div>
          </motion.div>
        ) : activeScreen === "subscription" ? (
          <motion.div
            key="subscribe-onboarding-section"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col gap-14"
          >
            {/* Subscription plan section */}
            <div className="flex flex-row items-center justify-center">
              <h2 className="text-2xl gradient-text font-semibold">
                Let's subscribe to become a <strong>PREMIUM</strong> member for
                owning our own happy parties !!!
              </h2>
            </div>
            <div className="flex flex-row items-center justify-between">
              <PricingCard free={true} onSelect={handleSelectPlan} />
              <PricingCard price={5} month={1} onSelect={handleSelectPlan} />
              <PricingCard price={13} month={3} onSelect={handleSelectPlan} />
              <PricingCard price={27} month={6} onSelect={handleSelectPlan} />
              <PricingCard price={55} month={12} onSelect={handleSelectPlan} />
            </div>
          </motion.div>
        ) : activeScreen === "welcome" ? (
          <motion.div
            key="welcome-onboarding-section"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col gap-4"
          >
            {/* Final welcome screen after onboarding */}
            <Confetti width={width} height={height} />
            <div className="">
              <h1 className="text-center gradient-text text-3xl font-semibold">
                Congratulations for becoming a member of our{" "}
                <strong>CHARLIE UNICORN AI</strong>'s House Party Family !!!
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Button
                type="primary"
                label="Continue"
                icon="solar:square-double-alt-arrow-right-broken"
                onClick={() => {
                  navigate("/dashboard");
                }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Modal
        title={`Subscribe ${selectedPrice} CHRLE for ${selectedMonth} ${
          selectedMonth === 1 ? "month" : "months"
        }`}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <div className="w-full flex flex-col gap-4">
          <p className="text-sm text-black">
            Do you confirm to pay <strong>{selectedPrice}</strong> CHRLE for{" "}
            <strong>
              {selectedMonth} {selectedMonth === 1 ? "month" : "months"}
            </strong>{" "}
            to become a premium member?
          </p>
          <Button
            type="primary"
            label={
              isConnected ? `Pay ${selectedPrice} CHRLE` : "Connect wallet"
            }
            icon="solar:hand-money-bold-duotone"
            loading={loading}
            onClick={isConnected ? handlePayment : () => open()}
          />
        </div>
      </Modal>
      <Modal
        title="KYC VERIFICATION"
        isOpen={kycOpen}
        onClose={() => {
          setKycOpen(false);
        }}
      >
        <div className="w-full flex flex-col gap-8">
          <KycVerifier link={user?.kyc?.url ?? ""} />
          <div className="w-full flex flex-row items-center justify-end gap-2">
            <Button
              type="primary"
              label="Start"
              icon="solar:square-double-alt-arrow-right-broken"
              onClick={handleStartVerification}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Onboarding;
