import { useEffect, useRef, useState } from "react";
import { User } from "../../types";
import { Icon } from "@iconify/react";
import { Button, Input, RegionSelect, Textarea } from "../../components";
import { BACKEND_BASE_URL } from "../../constant";

const ProfileEdit = ({ user }: { user: User | null }) => {
  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [about, setAbout] = useState<string>("");
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

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar ?? "");
      setName(user.name ?? "");
      setTitle(user.title ?? "");
      setAbout(user.about ?? "");
    }
  }, [user]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <button
          className="w-full flex flex-row items-center gap-4 group hover:bg-black/10 hover:shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out rounded-xl"
          onClick={handleUploadClick}
        >
          <img
            src={BACKEND_BASE_URL + avatar}
            alt={user?.name ?? ""}
            className="w-[100px] h-[100px] rounded-full object-cover object-center"
          />
          <Icon icon="solar:cloud-upload-bold-duotone" className="w-10 h-10" />
          <div className="flex-1 flex flex-col items-start gap-1">
            <span className="text-sm text-black">File limits 5MB</span>
            <span className="text-sm text-black">Upload your avatar</span>
          </div>
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <Input
          type="text"
          icon="solar:user-bold-duotone"
          placeholder="Your name"
          invalid={name === ""}
          invalidTxt="Input your name"
          value={name}
          onChange={setName}
        />
        <Input
          type="text"
          icon="solar:shield-user-bold-duotone"
          placeholder="Your title"
          invalid={title === ""}
          invalidTxt="Input your profession"
          value={title}
          onChange={setTitle}
        />
        <Textarea
          placeholder="About yourself"
          invalid={about === ""}
          invalidTxt="Input your professional description"
          value={about}
          onChange={setAbout}
        />
      </div>
      <div className="w-full flex flex-row items-center justify-end gap-4">
        <Button
          type="primary"
          label="Save"
          icon="solar:check-circle-bold-duotone"
        />
      </div>
    </div>
  );
};

export default ProfileEdit;
