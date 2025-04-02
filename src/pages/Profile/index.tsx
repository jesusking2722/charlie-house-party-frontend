import {
  Badge,
  Banner,
  Button,
  IconButton,
  Modal,
  Rater,
} from "../../components";
import StickerPockets from "./StickerPockets";
import ProfileDescripter from "./ProfileDescripter";
import ProfileHeader from "./ProfileHeader";
import ProfileReviewer from "./ProfileReviewer";
import { Review, User } from "../../types";
import { useState } from "react";
import ProfileEdit from "./ProfileEdit";

const initialReviews: Review[] = [
  {
    partyTitlte: "Happy Party",
    partyType: "Birthday",
    rate: 5,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: "./assets/pngs/user.png",
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
    partyTitlte: "Happy Party",
    partyType: "Birthday",
    rate: 3.2,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: "./assets/pngs/user.png",
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
    partyTitlte: "Happy Party",
    partyType: "Birthday",
    rate: 2.5,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: "./assets/pngs/user.png",
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
    partyTitlte: "Happy Party",
    partyType: "Birthday",
    rate: 4.3,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: "./assets/pngs/user.png",
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
    partyTitlte: "Happy Party",
    partyType: "Birthday",
    rate: 1.6,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: "./assets/pngs/user.png",
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
    partyTitlte: "Happy Party",
    partyType: "Birthday",
    rate: 0.8,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: "./assets/pngs/user.png",
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
    partyTitlte: "Happy Party",
    partyType: "Birthday",
    rate: 0.8,
    description: "I really enjoyed with him in this happy party",
    createdAt: new Date(),
    reviewer: {
      name: "Lukas Boruski",
      shortname: "lukasboruski",
      avatar: "./assets/pngs/user.png",
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

const initialUser: User = {
  name: "Lukas Boruski",
  shortname: "lukasboruski",
  avatar: "./assets/pngs/user.png",
  email: "lukas.boruski@gmail.com",
  phone: "",
  createdAt: new Date(),
  emailVerified: true,
  phoneVerified: false,
  kycVerified: true,
  reviews: [],
};

const Profile = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-14">
      <Banner />
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-lg text-black font-semibold">Jhon Doe.</h2>
            <h2 className="text-lg text-black font-semibold">@jhondoe</h2>
            <Badge type="kyc" />
            <Badge type="premium" />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Button
              type="primary"
              label="Edit profile"
              onClick={() => {
                setModalOpen(true);
              }}
            />
            <Button type="transparent" label="Invite to party" />
            <IconButton icon="solar:share-line-duotone" />
            <IconButton icon="solar:plain-bold-duotone" />
          </div>
        </div>
        {/* Profile description */}
        <div className="w-full flex flex-row items-start justify-between flex-1 gap-14">
          <div className="flex flex-col gap-4 flex-1">
            <Rater rate={3.5} />
            <ProfileHeader
              title="Senior Party Owner"
              parites={7}
              countryCode="US"
              joinedDate={new Date()}
            />
            <ProfileDescripter
              description="Hi, I am a senior party owner with 5 years of experience in opening and managing several kinds of parties. 
              I owned some kinds of happy parties and all members enjoyed together."
            />
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
        <ProfileEdit user={initialUser} />
      </Modal>
    </div>
  );
};

export default Profile;
