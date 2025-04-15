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
import { RootState, store } from "../../redux/store";
import { Applicant, Party } from "../../types";
import { BACKEND_BASE_URL, DOMAIN } from "../../constant";
import ApplicantGroup from "./ApplicantGroup";
import { motion } from "motion/react";
import socket from "../../lib/socketInstance";
import toast from "react-hot-toast";

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

const PartyPreview = () => {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [sharingLink, setSharingLink] = useState<string>("");
  const [apply, setApply] = useState<string>("");
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [steps, setSteps] = useState<StepperItem[]>(initialSteps);
  const [stickers, setStickers] = useState<StickerCheckbox[]>([]);
  const [loadingApply, setLoadingApply] = useState<boolean>(false);

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

  const handleApply = async () => {
    if (!user) return;
    const hasAlreadyApplied = selectedParty?.applicants.some(
      (applicant) => applicant.applier._id === user._id
    );

    if (hasAlreadyApplied) {
      toast.error("You have already applied to this party");
      return;
    }
    try {
      setLoadingApply(true);
      const selectedStickers = stickers.filter((sticker) => sticker.isChecked);
      const newApplicant: Applicant = {
        applicant: apply,
        applier: user,
        stickers: selectedStickers,
      };

      const waitForPartyUpdated = new Promise<Party>((resolve) => {
        const unsubscribe = store.subscribe(() => {
          const state = store.getState();
          const updatedParty = state.party.parties.find(
            (party) => party._id === selectedParty?._id
          );
          if (!updatedParty) return;
          const latestApplicant = updatedParty.applicants.find(
            (applicant) => applicant.applier._id === user._id
          );
          if (latestApplicant && latestApplicant._id) {
            unsubscribe();
            resolve(updatedParty);
          }
        });
      });
      debugger;
      socket.emit(
        "creating:applicant",
        newApplicant,
        selectedParty?._id,
        selectedParty?.creator?._id
      );

      const updatedParty = await waitForPartyUpdated;
      setSelectedParty(updatedParty);
      setApply("");
      setIsApplying(false);
      if (user && user.stickers) {
        const initialStickers: StickerCheckbox[] = user.stickers.map(
          (sticker) => ({
            ...sticker,
            isChecked: false,
          })
        );
        setStickers(initialStickers);
      }
      toast.success("Applied successfully");
    } catch (error) {
      console.log("handle apply error: ", error);
    } finally {
      setLoadingApply(false);
    }
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

  useEffect(() => {
    if (user && user.stickers) {
      const initialStickers: StickerCheckbox[] = user.stickers.map(
        (sticker) => ({
          ...sticker,
          isChecked: false,
        })
      );
      setStickers(initialStickers);
    }
  }, [user]);

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
          {selectedParty &&
            selectedParty.creator?._id !== user?._id &&
            !selectedParty.applicants.some(
              (applicant) => applicant.applier._id === user?._id
            ) && (
              <Button
                type="primary"
                label="Apply"
                icon="solar:document-add-bold-duotone"
                onClick={() => setIsApplying(true)}
              />
            )}
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
            {user?.membership === "premium" &&
              user._id !== selectedParty?.creator?._id && (
                <Tooltip message="Send direct message to creator">
                  <IconButton icon="solar:plain-bold-duotone" />
                </Tooltip>
              )}
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
              Your stickers:
              <strong className="text-green-500"> {stickers.length}</strong>
            </p>
            <div className="w-full h-[250px] overflow-auto bg-white/10 backdrop-blur-sm border border-[#c4f70f] rounded-xl p-6 hover:shadow-lg transition-all duration-300 ease-in-out">
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
              placeholder="Write your awesome application to be chosen..."
              invalidTxt="Must be between 150 and 1000 letters"
              invalid={apply.length < 150}
              value={apply}
              onChange={setApply}
            />
            <div className="w-full flex flex-1 flex-row items-center gap-4">
              <div className="flex-1">
                <Button
                  type="primary"
                  label="Apply"
                  icon="solar:document-add-bold-duotone"
                  width="full"
                  loading={loadingApply}
                  disabled={apply.length < 150}
                  onClick={handleApply}
                />
              </div>
              {user?.membership === "premium" && (
                <Tooltip message="Write with AI">
                  <IconButton icon="solar:magic-stick-3-broken" />
                </Tooltip>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/*Space*/}
      <div className="h-28"></div>

      {/*Applicants section*/}
      {user?.membership === "premium" ||
      user?._id === selectedParty?.creator?._id ? (
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
