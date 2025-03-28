import { Icon } from "@iconify/react";
import { FC } from "react";

interface IconButtonProps {
  icon?: string;
  imgSource?: string;
}

const IconButton: FC<IconButtonProps> = ({ icon, imgSource }) => {
  return (
    <button
      className="p-3 flex flex-col items-center justify-center rounded-xl shadow-lg bg-transparent hover:bg-black/5 backdrop-blur-sm group
    transition-all duration-300 ease-in-out"
    >
      {imgSource && (
        <img
          src={`../assets/svgs/${imgSource}.svg`}
          alt={imgSource}
          className="w-6 h-6"
        />
      )}
      {icon && (
        <Icon
          icon={icon}
          className="text-[#353537] w-6 h-6 group-hover:text-black transition-all duration-300 ease-in-out"
        />
      )}
    </button>
  );
};

export default IconButton;
