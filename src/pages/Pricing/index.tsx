import { useState } from "react";
import PricingCard from "./PricingCard";
import { Button, Modal, Spinner } from "../../components";
import { useAppKit } from "@reown/appkit/react";
import {
  useAppKitAccount,
  useAppKitProvider,
  useAppKitNetworkCore,
  type Provider,
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

const Pricing = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<1 | 3 | 6 | 12 | null>(
    null
  );
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetworkCore();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");

  const handleSelectPlan = (month: 1 | 3 | 6 | 12, price: number) => {
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

  const handlePayment = async () => {
    try {
      setLoading(true);
      const provider = new BrowserProvider(walletProvider, chainId);
      const signer = getSigner(provider);
      const charlieContract = getCharlieContract(signer);
      if (charlieContract) {
        const balance = await charlieContract.balanceOf(address);
        const formattedBalance = ethers.formatUnits(balance, 18);
        if (Number(formattedBalance) < Number(selectedPrice)) {
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

  const { open } = useAppKit();

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-14">
      <div className="flex flex-row items-center justify-center">
        <h2 className="text-2xl gradient-text font-semibold">
          Let's subscribe to become a <strong>PREMIUM</strong> member for owning
          our own happy parites !!!
        </h2>
      </div>
      <div className="flex flex-row items-center justify-between">
        <PricingCard free={true} active={true} />
        <PricingCard price={5} month={1} onSelect={handleSelectPlan} />
        <PricingCard price={13} month={3} onSelect={handleSelectPlan} />
        <PricingCard price={27} month={6} onSelect={handleSelectPlan} />
        <PricingCard price={55} month={12} onSelect={handleSelectPlan} />
      </div>
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
            onClick={isConnected ? handlePayment : () => open()}
          />
        </div>
      </Modal>
      {loading && <Spinner />}
    </div>
  );
};

export default Pricing;
