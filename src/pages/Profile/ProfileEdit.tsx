import { useRef, useState } from "react";
import { User } from "../../types";
import { Icon } from "@iconify/react";
import { Button, Input } from "../../components";

const ProfileEdit = ({ user }: { user: User }) => {
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

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <button
          className="w-full flex flex-row items-center gap-4 group hover:bg-black/10 hover:shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out rounded-xl"
          onClick={handleUploadClick}
        >
          <img
            src={avatar === "" ? (user.avatar as string) : avatar}
            alt={user.name ?? ""}
            className="w-[100px] h-[100px] rounded-full object-cover object-center"
          />
          <div className="flex flex-1 flex-row items-center gap-2">
            <Icon
              icon="solar:cloud-upload-bold-duotone"
              className="w-14 h-14"
            />
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
          value={user.name ?? ""}
        />
        <Input
          type="text"
          icon="solar:shield-user-bold-duotone"
          placeholder="Your id"
          value={user.shortname ?? ""}
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
