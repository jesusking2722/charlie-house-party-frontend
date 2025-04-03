import { useEffect, useRef, useState } from "react";
import { User } from "../../types";
import { Icon } from "@iconify/react";
import { Button, Input, Spinner, Textarea } from "../../components";
import { BACKEND_BASE_URL } from "../../constant";
import { updateAvatarMe, updateMe } from "../../lib/scripts";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const ProfileEdit = ({
  user,
  onClose,
}: {
  user: User | null;
  onClose: () => void;
}) => {
  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && user?._id) {
      try {
        setLoading(true);
        let formData = new FormData();
        formData.append("avatar", file);
        const response = await updateAvatarMe({ id: user._id, formData });
        if (response.ok) {
          const { user } = response.data;
          dispatch(setAuthUser({ user }));
          setAvatar(user.avatar);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log("upload avatar error: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (user) {
        const updatingUser: User = {
          ...user,
          name,
          title,
          about,
        };
        const response = await updateMe({ user: updatingUser });
        if (response.ok) {
          const { user } = response.data;
          dispatch(setAuthUser({ user }));
          toast.success("Profile is updated successfully");
          onClose();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log("handle profile save error: ", error);
    } finally {
      setLoading(false);
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
      {loading && <Spinner />}
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
          disabled={name === "" || title === "" || about === ""}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default ProfileEdit;
