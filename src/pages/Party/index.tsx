import { Icon } from "@iconify/react";
import { Badge, Rater } from "../../components";
import ApplicantGroup from "./ApplicantGroup";
import { Applicant } from "../../types";

const initialApplicants: Applicant[] = [
  {
    applier: {
      _id: "1",
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
    applicant: "",
    appliedAt: new Date(),
  },
  {
    applier: {
      _id: "1",
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
    applicant: "",
    appliedAt: new Date(),
  },
  {
    applier: {
      _id: "1",
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
    applicant: "",
    appliedAt: new Date(),
  },
  {
    applier: {
      _id: "1",
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
    applicant: "",
    appliedAt: new Date(),
  },
  {
    applier: {
      _id: "1",
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
    applicant: "",
    appliedAt: new Date(),
  },
  {
    applier: {
      _id: "1",
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
    applicant: "",
    appliedAt: new Date(),
  },
  {
    applier: {
      _id: "1",
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
    applicant: "",
    appliedAt: new Date(),
  },
  {
    applier: {
      _id: "1",
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
    applicant: "",
    appliedAt: new Date(),
  },
  {
    applier: {
      _id: "1",
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
    applicant: "",
    appliedAt: new Date(),
  },
];

const Party = () => {
  return (
    <div className="w-[80%] mx-auto py-8">
      <div className="w-full flex flex-row items-center gap-2 mb-8">
        <h1 className="text-black font-semibold text-3xl">Party Overview</h1>
        <Icon
          icon="solar:document-text-outline"
          className="text-green-500 w-8 h-8"
        />
      </div>
      <div className="w-full flex flex-1 flex-row items-start justify-between gap-14">
        <div className="flex-1 flex flex-col gap-4 bg-white/10 backdrop-blur-sm border border-white hover:border-[#c4f70f] shadow-lg rounded-xl p-6 transition-all duration-300 ease-in-out">
          <h1 className="text-lg text-black">
            <strong>Happy Birthday Party</strong>
          </h1>
          <p className="text-sm text-black max-h-[150px] overflow-auto">
            Hey everyone! 🎂🥳 It's that time of the year again, and I’m
            throwing an epic birthday party to celebrate! I’d love for you to
            join me for a night full of fun, laughter, music, and great vibes!
            🎶✨. It won’t be the same without you, so come celebrate with me!
            Let’s make this a legendary night! 🔥 RSVP by [Insert RSVP Deadline]
            so I can plan accordingly. Can’t wait to see you all there! 🥳🎈
          </p>
        </div>
        <div className="py-4 px-8 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg border border-white flex flex-col">
          <div className="flex flex-row items-center gap-8">
            <img
              src="http://localhost:3000/assets/pngs/user.png"
              alt="USER"
              className="w-[60px] h-[60px] rounded-full border border-white shadow-lg object-cover object-center"
            />
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <h1 className="text-black text-base">
                  <strong>Jhon Doe</strong>
                </h1>
                <Badge type="kyc" />
                <Badge type="premium" />
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="text-sm">Warsaw</span>
                <Icon icon="flagpack:pl" className="w-5 h-5 rounded-xl" />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 mt-2 px-2">
            <Rater rate={4.5} />
            <h3 className="text-sm text-green-500">
              Total Completed: <strong>7</strong>
            </h3>
          </div>
        </div>
      </div>
      <div className="h-28"></div>
      <ApplicantGroup applicants={initialApplicants} />
    </div>
  );
};

export default Party;
