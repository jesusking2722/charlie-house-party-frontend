import {
  Badge,
  Banner,
  Button,
  IconButton,
  Modal,
  Rater,
  SharingButtonGroup,
  Spinner,
  Tooltip,
} from "../../components";
import StickerPockets from "./StickerPockets";
import ProfileDescripter from "./ProfileDescripter";
import ProfileHeader from "./ProfileHeader";
import ProfileReviewer from "./ProfileReviewer";
import { Review, User } from "../../types";
import { useEffect, useState } from "react";
import ProfileEdit from "./ProfileEdit";
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateBannerMe } from "../../lib/scripts";
import { setAuthUser } from "../../redux/slices/authSlice";
import { BASE_URL, DOMAIN } from "../../constant";
import PartyInviteCardGroup from "./PartyInviteCardGroup";

const initialReviews: Review[] = [
  {
    partyTitle: "Happy Party",
    partyType: "Birthday",
    rate: 5,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: `${BASE_URL}/assets/pngs/user.png`,
      email: "lukas.boruski@gmail.com",
      phone: "",
      createdAt: new Date(),
      emailVerified: true,
      phoneVerified: false,
      kycVerified: true,
      reviews: [],
    },
  },
  {
    partyTitle: "Happy Party",
    partyType: "Birthday",
    rate: 3.2,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: `${BASE_URL}/assets/pngs/user.png`,
      email: "lukas.boruski@gmail.com",
      phone: "",
      createdAt: new Date(),
      emailVerified: true,
      phoneVerified: false,
      kycVerified: true,
      reviews: [],
    },
  },
  {
    partyTitle: "Happy Party",
    partyType: "Birthday",
    rate: 2.5,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: `${BASE_URL}/assets/pngs/user.png`,
      email: "lukas.boruski@gmail.com",
      phone: "",
      createdAt: new Date(),
      emailVerified: true,
      phoneVerified: false,
      kycVerified: true,
      reviews: [],
    },
  },
  {
    partyTitle: "Happy Party",
    partyType: "Birthday",
    rate: 4.3,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: `${BASE_URL}/assets/pngs/user.png`,
      email: "lukas.boruski@gmail.com",
      phone: "",
      createdAt: new Date(),
      emailVerified: true,
      phoneVerified: false,
      kycVerified: true,
      reviews: [],
    },
  },
  {
    partyTitle: "Happy Party",
    partyType: "Birthday",
    rate: 1.6,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: `${BASE_URL}/assets/pngs/user.png`,
      email: "lukas.boruski@gmail.com",
      phone: "",
      createdAt: new Date(),
      emailVerified: true,
      phoneVerified: false,
      kycVerified: true,
      reviews: [],
    },
  },
  {
    partyTitle: "Happy Party",
    partyType: "Birthday",
    rate: 0.8,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: `${BASE_URL}/assets/pngs/user.png`,
      email: "lukas.boruski@gmail.com",
      phone: "",
      createdAt: new Date(),
      emailVerified: true,
      phoneVerified: false,
      kycVerified: true,
      reviews: [],
    },
  },
  {
    partyTitle: "Happy Party",
    partyType: "Birthday",
    rate: 0.8,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: `${BASE_URL}/assets/pngs/user.png`,
      email: "lukas.boruski@gmail.com",
      phone: "",
      createdAt: new Date(),
      emailVerified: true,
      phoneVerified: false,
      kycVerified: true,
      reviews: [],
    },
  },
];

const Profile = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [partyInviteOpen, setPartyInviteOpen] = useState<boolean>(false);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sharingLink, setSharingLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();

  const { user } = useSelector((state: RootState) => state.auth, shallowEqual);
  const { users } = useSelector((state: RootState) => state.users);
  const { parties } = useSelector((state: RootState) => state.party);
  const dispatch = useDispatch();

  const handleBannerUpload = async (bannerFile: File) => {
    try {
      if (selectedUser?._id) {
        setLoading(true);
        let formData = new FormData();
        formData.append("banner", bannerFile);
        const response = await updateBannerMe({
          id: selectedUser._id,
          formData,
        });
        if (response.ok) {
          const { user } = response.data;
          dispatch(setAuthUser({ user }));
          setSelectedUser(user);
          window.location.reload();
        }
      }
    } catch (error) {
      console.log("handle banner upload error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(params.userId);
    const filterdUser = users.find((user) => user._id === params.userId);
    if (filterdUser && user) {
      setSelectedUser(filterdUser);
      setIsMe(user?._id === filterdUser?._id);
      const profileUrl = `${DOMAIN}/profile/${filterdUser?._id}`;
      const encodedUrl = encodeURIComponent(profileUrl);
      setSharingLink(encodedUrl);
    }
  }, [params, users]);

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-14">
      {loading && <Spinner />}
      <Banner
        avatar={selectedUser?.avatar ?? ""}
        banner={selectedUser?.banner ?? ""}
        isMe={isMe}
        onBannerUpload={handleBannerUpload}
      />
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-lg text-black font-semibold">
              {selectedUser?.name}.
            </h2>
            <h2 className="text-lg text-black font-semibold">
              @{selectedUser?.shortname}
            </h2>
            <Badge type="kyc" />
            <Badge type="premium" />
            {/* {selectedUser?.membership === "premium" && <Badge type="premium" />} */}
          </div>
          <div className="flex flex-row items-center gap-2">
            {isMe && (
              <Button
                type="primary"
                label="Edit profile"
                onClick={() => {
                  setModalOpen(true);
                }}
              />
            )}
            {parties.filter((party) => party.creator?._id === user?._id)
              .length > 0 && (
              <Button
                type="transparent"
                label="Invite to party"
                onClick={() => {
                  setPartyInviteOpen(true);
                }}
              />
            )}
            <Tooltip message="Share profile">
              <IconButton
                icon="solar:share-line-duotone"
                onClick={() => {
                  setShareOpen(true);
                }}
              />
            </Tooltip>

            {/* {user?.membership === "premium" && ( */}
            <Tooltip message="Send direct message">
              <IconButton icon="solar:plain-bold-duotone" />
            </Tooltip>
            {/* )} */}
          </div>
        </div>
        {/* Profile description */}
        <div className="w-full flex flex-row items-start justify-between flex-1 gap-14">
          <div className="flex flex-col gap-4 flex-1">
            <Rater rate={selectedUser?.rate ?? 0} />
            <ProfileHeader
              title={selectedUser?.title ?? ""}
              parites={selectedUser?.totalCompleted ?? 0}
              countryCode={selectedUser?.country ?? ""}
              joinedDate={selectedUser?.createdAt ?? new Date()}
            />
            <ProfileDescripter description={selectedUser?.about ?? ""} />
          </div>
          <StickerPockets />
        </div>
      </div>
      {/* Profile Reviews */}
      <ProfileReviewer reviews={initialReviews} />
      <Modal
        title="Edit profile"
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <ProfileEdit
          user={selectedUser}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      </Modal>
      <Modal
        title="Share your profile to socials"
        isOpen={shareOpen}
        onClose={() => {
          setShareOpen(false);
        }}
      >
        <div className="w-full">
          <SharingButtonGroup
            link={sharingLink}
            text="Try to see my awesome house party profile !!!"
          />
        </div>
      </Modal>
      <Modal
        title="Invite to your parties"
        isOpen={partyInviteOpen}
        onClose={() => {
          setPartyInviteOpen(false);
        }}
      >
        <PartyInviteCardGroup
          parties={parties.filter((party) => party.creator?._id === user?._id)}
        />
      </Modal>
    </div>
  );
};

export default Profile;
