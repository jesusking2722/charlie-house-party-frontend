import { AnimatePresence, motion } from "motion/react";
import { Button, Input, Modal, Spinner } from "../../components";
import { useRef, useState } from "react";
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

const Onboarding = () => {
  const [name, setName] = useState<string>("");
  const [shortname, setShortname] = useState<string>("");
  const [first, setFirst] = useState<boolean>(false);
  const [second, setSecond] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<1 | 3 | 6 | 12 | null>(
    null
  );
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFreePlan, setIsFreePlan] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetworkCore();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const { width, height } = useWindowSize();

  const navigate = useNavigate();

  const handleUserInfo = async () => {
    setFirst(true);
  };

  const handleSelectPlan = (
    month: 1 | 3 | 6 | 12,
    price: number,
    isFree: boolean
  ) => {
    if (isFree) {
      setIsFreePlan(true);
      setSecond(true);
      return;
    }
    setSelectedMonth(month);
    setSelectedPrice(price);
    setModalOpen(true);
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

  return (
    <div className="w-[80%] mx-auto min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {loading && <Spinner />}
      <AnimatePresence mode="wait">
        {!first ? (
          <motion.div
            key="first-onboarding-section"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-row gap-4"
          >
            <motion.div
              initial={{ x: -600 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="basis-2/3 bg-white rounded-xl shadow-lg"
            >
              <img
                src="../assets/pngs/model2.png"
                alt="MODEL"
                className="w-full h-full rounded-xl"
              />
            </motion.div>
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="basis-1/3 bg-black/5 border border-white backdrop-blur-sm rounded-xl shadow-lg py-4"
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-8">
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
                    className="w-full flex flex-row items-center gap-4 group border hover:border-[#c4f70f] hover:shadow-lg transition-all duration-300 ease-in-out rounded-xl"
                    onClick={handleUploadClick}
                  >
                    <img
                      src={avatar}
                      alt={name}
                      className="w-[100px] h-[100px] rounded-full object-cover object-center"
                    />
                    <div className="flex flex-1 flex-row items-center gap-2">
                      <Icon
                        icon="solar:cloud-upload-bold-duotone"
                        className="w-14 h-14"
                      />
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
                      onChange={setName}
                    />
                    <Input
                      type="text"
                      placeholder="Your user id"
                      icon="solar:shield-user-bold-duotone"
                      invalid={shortname === ""}
                      invalidTxt="Wrong id"
                      onChange={setShortname}
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      label="Continue"
                      type="transparent"
                      icon="solar:skip-next-broken"
                      disabled={name === "" || shortname === ""}
                      onClick={handleUserInfo}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : !second ? (
          <motion.div
            key="second-onboarding-section"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col gap-14"
          >
            <div className="flex flex-row items-center justify-center">
              <h2 className="text-2xl gradient-text font-semibold">
                Let's subscribe to become a <strong>PREMIUM</strong> member for
                owning our own happy parites !!!
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
        ) : (
          <motion.div
            key="third-onboarding-section"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col gap-4"
          >
            <Confetti width={width} height={height} />
            <div className="">
              <h1 className="text-center gradient-text text-3xl font-semibold">
                Congratulations for your becoming memeber for our{" "}
                <strong>CHARLIE UNICORN AI</strong>'s House Party Family !!!
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Button
                type="primary"
                label="Continue"
                icon="solar:skip-next-broken"
                onClick={() => {
                  navigate("/dashboard");
                }}
              />
            </div>
          </motion.div>
        )}
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
    </div>
  );
};

export default Onboarding;
