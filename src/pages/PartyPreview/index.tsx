import { Icon } from "@iconify/react";
import {
  Alert,
  Badge,
  Button,
  IconButton,
  Modal,
  Rater,
  SharingButtonGroup,
  Stepper,
  StepperItem,
  StickerCheckbox,
  StickerCheckboxGroup,
  Textarea,
  Tooltip,
} from "../../components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Party } from "../../types";
import { BACKEND_BASE_URL, DOMAIN } from "../../constant";
import ApplicantGroup from "./ApplicantGroup";
import { motion } from "motion/react";

const initialSteps: StepperItem[] = [
  { icon: "solar:documents-bold", label: "Publish", completed: true },
  {
    icon: "solar:hand-shake-bold-duotone",
    label: "Open for proposals",
    completed: false,
  },
  {
    icon: "solar:shield-bold-duotone",
    label: "Terms confirmation",
    completed: false,
  },
  { icon: "solar:wineglass-bold-duotone", label: "In Party", completed: false },
  {
    icon: "solar:hand-stars-bold-duotone",
    label: "Review exchange",
    completed: false,
  },
];

const initialStickers: StickerCheckbox[] = [
  { _id: "1", image: "", name: "Charlie1", isChecked: false },
  { _id: "2", image: "", name: "Charlie2", isChecked: false },
  { _id: "3", image: "", name: "Charlie3", isChecked: false },
  { _id: "4", image: "", name: "Charlie", isChecked: false },
  { _id: "5", image: "", name: "Charlie", isChecked: false },
  { _id: "6", image: "", name: "Charlie", isChecked: false },
  { _id: "7", image: "", name: "Charlie", isChecked: false },
  { _id: "8", image: "", name: "Charlie", isChecked: false },
  { _id: "9", image: "", name: "Charlie", isChecked: false },
  { _id: "10", image: "", name: "Charlie1", isChecked: false },
  { _id: "11", image: "", name: "Charlie2", isChecked: false },
  { _id: "12", image: "", name: "Charlie3", isChecked: false },
  { _id: "13", image: "", name: "Charlie", isChecked: false },
  { _id: "14", image: "", name: "Charlie", isChecked: false },
  { _id: "15", image: "", name: "Charlie", isChecked: false },
  { _id: "16", image: "", name: "Charlie", isChecked: false },
  { _id: "17", image: "", name: "Charlie", isChecked: false },
  { _id: "18", image: "", name: "Charlie", isChecked: false },
  { _id: "19", image: "", name: "Charlie1", isChecked: false },
  { _id: "20", image: "", name: "Charlie2", isChecked: false },
  { _id: "21", image: "", name: "Charlie3", isChecked: false },
  { _id: "22", image: "", name: "Charlie", isChecked: false },
  { _id: "23", image: "", name: "Charlie", isChecked: false },
  { _id: "24", image: "", name: "Charlie", isChecked: false },
  { _id: "25", image: "", name: "Charlie", isChecked: false },
  { _id: "26", image: "", name: "Charlie", isChecked: false },
  { _id: "27", image: "", name: "Charlie", isChecked: false },
];

const PartyPreview = () => {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [sharingLink, setSharingLink] = useState<string>("");
  const [apply, setApply] = useState<string>("");
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [steps, setSteps] = useState<StepperItem[]>(initialSteps);
  const [stickers, setStickers] = useState<StickerCheckbox[]>(initialStickers);

  const { partyId } = useParams();

  const { user } = useSelector((state: RootState) => state.auth);
  const { parties } = useSelector((state: RootState) => state.party);

  const handleStickersCheck = (sticker: StickerCheckbox) => {
    setStickers(
      stickers.map((s) =>
        s._id === sticker._id ? { ...s, isChecked: !s.isChecked } : s
      )
    );
  };

  useEffect(() => {
    if (partyId && parties.length > 0) {
      const selectedParty = parties.find((party) => party._id === partyId);
      setSelectedParty(selectedParty ?? null);
      const partyUrl = `${DOMAIN}/profile/${selectedParty?._id}`;
      const encodedUrl = encodeURIComponent(partyUrl);
      setSharingLink(encodedUrl);
    }
  }, [partyId, parties]);

  return (
    <div className="w-[80%] mx-auto py-8">
      <div className="w-full flex flex-row items-center justify-between mb-8">
        <div className="w-full flex flex-row items-center gap-2">
          <h1 className="text-black font-semibold text-3xl">Party Overview</h1>
          <Icon
            icon="solar:document-text-outline"
            className="text-green-500 w-8 h-8"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <Tooltip message="Share party">
            <IconButton
              icon="solar:share-line-duotone"
              onClick={() => setShareOpen(true)}
            />
          </Tooltip>
          <Button
            type="primary"
            label="Apply"
            icon="solar:document-add-bold-duotone"
            onClick={() => setIsApplying(true)}
          />
        </div>
      </div>
      <div className="w-full flex flex-1 flex-row items-start justify-between gap-14">
        <div className="flex-1 flex flex-col gap-4 bg-white/10 backdrop-blur-sm border border-white hover:border-[#c4f70f] shadow-lg rounded-xl p-6 transition-all duration-300 ease-in-out">
          <h1 className="text-lg text-black">
            <strong>{selectedParty?.title}</strong>
          </h1>
          <p className="text-sm text-black max-h-[150px] overflow-auto">
            {selectedParty?.description}
          </p>
        </div>
        <div className="py-4 px-8 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg border border-white flex flex-col">
          <div className="flex flex-row items-center gap-8">
            <img
              src={`${BACKEND_BASE_URL}${selectedParty?.creator?.avatar ?? ""}`}
              alt={(selectedParty?.creator?.name as any) ?? ""}
              className="w-[60px] h-[60px] rounded-full border border-white shadow-lg object-cover object-center"
            />
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <Link
                  to={`/profile/${selectedParty?.creator?._id}`}
                  className="text-black text-base cursor-pointer hover:underline"
                >
                  <strong>{selectedParty?.creator?.name}</strong>
                </Link>
                <Badge type="kyc" />
                <Badge type="premium" />
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="text-sm">
                  {selectedParty?.creator?.region?.split(" ")[0]}
                </span>
                <Icon
                  icon={`flag:${selectedParty?.creator?.country?.toLowerCase()}-4x3`}
                  className="w-5 h-5 rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <div className="w-full flex flex-col gap-2 mt-2 px-2">
              <Rater rate={selectedParty?.creator?.rate ?? 0} />
              <h3 className="text-sm text-green-500">
                Total Completed:{" "}
                <strong>{selectedParty?.creator?.totalCompleted}</strong>
              </h3>
            </div>
            <Tooltip message="Send direct message to creator">
              <IconButton icon="solar:plain-bold-duotone" />
            </Tooltip>
          </div>
        </div>
      </div>

      {/*Stepper section*/}
      <div className="w-full mt-8">
        <Stepper steps={steps} activeStep={1} />
      </div>

      {/*Apply section*/}
      {isApplying && (
        <motion.div
          initial={{ y: -100, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 100, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-14 w-full flex flex-col gap-8"
        >
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-black font-semibold text-3xl">Apply to join</h3>
            <Icon
              icon="solar:document-add-bold-duotone"
              className="text-green-500 w-8 h-8"
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <Alert
              type="success"
              title="Successful tip"
              message="Stickers is the key to winning bid"
            />
            <p className="text-sm text-black font-semibold">
              Your <strong className="text-green-500">stickers</strong>:{" "}
            </p>
            <div className="w-full h-[250px] overflow-auto bg-white/10 backdrop-blur-sm border border-[#c4f70f] rounded-xl p-6">
              <StickerCheckboxGroup
                stickers={stickers}
                onCheck={handleStickersCheck}
              />
            </div>
            {stickers.filter((s) => s.isChecked).length > 0 && (
              <div className="w-full flex">
                <p className="text-sm text-black">
                  Total selected:{" "}
                  <strong className="text-green-500 text-sm">
                    {stickers.filter((s) => s.isChecked).length}
                  </strong>
                </p>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-6">
            <Textarea
              placeholder="Type here..."
              invalidTxt="Must be between 150 and 1000 letters"
              value={apply}
              onChange={setApply}
            />
            <Button
              type="primary"
              label="Apply"
              icon="solar:document-add-bold-duotone"
            />
          </div>
        </motion.div>
      )}

      {/*Space*/}
      <div className="h-28"></div>

      {/*Applicants section*/}
      {user?.membership === "premium" ? (
        <ApplicantGroup applicants={selectedParty?.applicants ?? []} />
      ) : (
        <Alert
          type="info"
          title="Tip for winner"
          message="You need to be a premium member to see applicants"
        />
      )}
      <Modal
        title="Share this party"
        isOpen={shareOpen}
        onClose={() => {
          setShareOpen(false);
        }}
      >
        <div className="w-full">
          <SharingButtonGroup
            link={sharingLink}
            text="Let's join this awesome party and have fun together!"
          />
        </div>
      </Modal>
    </div>
  );
};

export default PartyPreview;
