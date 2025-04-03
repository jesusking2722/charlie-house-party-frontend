import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { BACKEND_BASE_URL } from "../../../constant";

const Banner = ({ avatar, banner }: { avatar: string; banner: string }) => {
  const [bannerImage, setBannerImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  };

  useEffect(() => {
    setBannerImage(banner);
  }, [banner]);

  return (
    <div className="w-full relative h-[300px] rounded-xl border border-white shadow-lg">
      {/* Background Image */}
      {bannerImage !== "" && (
        <img
          src={bannerImage}
          alt="Banner Background"
          className="w-full h-full object-cover object-center rounded-xl"
        />
      )}

      <button
        onClick={handleUploadClick}
        className="bg-white rounded-xl p-2 group absolute bottom-5 right-5 transition-all duration-300 ease-in-out flex flex-row items-center justify-center gap-2 hover:shadow-lg"
      >
        <span className="text-sm text-black group-hover:text-[#c4f70f] transition-all duration-300 ease-in-out">
          Upload
        </span>
        <Icon
          icon="solar:cloud-upload-bold-duotone"
          className="text-black group-hover:text-[#c4f70f] transition-all duration-300 ease-in-out"
        />
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* User Image */}
      <div className="absolute left-24 -bottom-14 transform -translate-x-1/2 w-[150px] h-[150px] rounded-full border border-white shadow-lg bg-white">
        <img
          src={BACKEND_BASE_URL + avatar}
          alt="USER"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default Banner;
