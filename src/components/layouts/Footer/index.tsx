import { Link } from "react-router";
import { Button, Input, Textarea } from "../../common";
import { useState } from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
  const [text, setText] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const currentYear = new Date().getFullYear();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <footer className="w-[80%] mx-auto py-8 flex flex-col gap-8">
      <div className="w-full flex flex-row">
        <div className="flex flex-col gap-4 basis-2/3">
          <Link to="/" className="flex items-center gap-4">
            <img
              src="http://localhost:3000/logo.png"
              alt="LOGO"
              className="w-[100px] h-auto"
            />
            <h1 className="text-xl font-semibold text-[#353537]">
              CHARLIE UNICORN AI
            </h1>
          </Link>
          <div>
            <p className="text-sm text-[#353737]">
              Charlie Unicorn AI House Party app is allowing users to apply or
              create happy house parties in the world.
              <br />
              Premium members can send direct messages to the party owners.
              <br />
              Please take a look at beautiful stickers of our Charlie Unicorn
              AI's shop here.
            </p>
          </div>
        </div>
        <form className="bg-white/10 border border-white backdrop-blur-sm rounded-xl shadow-lg flex flex-col gap-4 basis-1/3 p-8">
          <div className="w-full flex flex-row items-center justify-center gap-4">
            <h2 className="text-[#353737] text-xl">Contact us</h2>
            <Icon
              icon="solar:chat-round-like-bold-duotone"
              className="text-[#353737] w-8 h-8"
            />
          </div>
          <Input
            type="email"
            icon="solar:inbox-line-bold-duotone"
            placeholder="example.com"
            invalid={!validateEmail(email)}
            invalidTxt="Input your correct email"
            value={email}
            onChange={setEmail}
          />
          <Input
            type="text"
            icon="solar:chat-dots-bold-duotone"
            placeholder="Subject"
            invalid={subject === ""}
            invalidTxt="Describe your subject"
            value={subject}
            onChange={setSubject}
          />
          <Textarea value={text} onChange={setText} />
          <Button
            type="outline"
            label="Submit"
            icon="solar:plain-bold-duotone"
            width="full"
            disabled={!validateEmail(email) || subject === "" || text === ""}
          />
        </form>
      </div>
      <div className="w-full flex flex-row items-center justify-between gap-14 p-4">
        <img
          src="http://localhost:3000/assets/logos/kyc_gempad_compliant.png"
          alt="KYC GEMPAD"
          className="w-[200px] h-auto"
        />
        <img
          src="http://localhost:3000/assets/logos/kyc_gold.png"
          alt="KYC GOLD"
          className="w-[200px] h-auto"
        />
        <img
          src="http://localhost:3000/assets/logos/kyc_pinksale_compliant.png"
          alt="KYC PINK SALE"
          className="w-[200px] h-auto"
        />
        <img
          src="http://localhost:3000/assets/logos/solid.png"
          alt="SOLID"
          className="w-[130px] h-auto rounded-lg"
        />
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-4 p-2">
        <span className="text-sm">
          © Copyright {currentYear} CHARLIE UNICORN AI.
        </span>
        <span className="text-sm">All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
