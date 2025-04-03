import { Icon } from "@iconify/react";
import { FC } from "react";

interface SharingButtonGroupProps {
  link: string;
  text: string;
}

const SharingButtonGroup: FC<SharingButtonGroupProps> = ({ link, text }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {/* twitter */}
      <div className="w-full flex flex-row items-center justify-between transition-all duration-300 ease-in-out group hover:bg-black/5 hover:backdrop-blur-sm hover:shadow-lg p-2 rounded-xl">
        <div className="flex flex-row items-center gap-2">
          <Icon icon="logos:twitter" className="w-8 h-8" />
          <span className="text-sm text-black">Share to X</span>
        </div>
        <a
          href={`https://twitter.com/intent/tweet?url=${link}&text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 ease-in-out p-2 rounded-xl shadow-lg scale-0 group-hover:scale-100 bg-[#c4f70f]"
        >
          <Icon
            icon="solar:arrow-right-line-duotone"
            className="w-6 h-6 text-black"
          />
        </a>
      </div>

      {/* telegram */}
      <div className="w-full flex flex-row items-center justify-between transition-all duration-300 ease-in-out group hover:bg-black/5 hover:backdrop-blur-sm hover:shadow-lg p-2 rounded-xl">
        <div className="flex flex-row items-center gap-2">
          <Icon icon="logos:telegram" className="w-8 h-8" />
          <span className="text-sm text-black">Share to Telegram</span>
        </div>
        <a
          href={`https://t.me/share/url?url=${link}&text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 ease-in-out p-2 rounded-xl shadow-lg scale-0 group-hover:scale-100 bg-[#c4f70f]"
        >
          <Icon
            icon="solar:arrow-right-line-duotone"
            className="w-6 h-6 text-black"
          />
        </a>
      </div>

      {/* facebook */}
      <div className="w-full flex flex-row items-center justify-between transition-all duration-300 ease-in-out group hover:bg-black/5 hover:backdrop-blur-sm hover:shadow-lg p-2 rounded-xl">
        <div className="flex flex-row items-center gap-2">
          <Icon icon="logos:facebook" className="w-8 h-8" />
          <span className="text-sm text-black">Share to Facebook</span>
        </div>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 ease-in-out p-2 rounded-xl shadow-lg scale-0 group-hover:scale-100 bg-[#c4f70f]"
        >
          <Icon
            icon="solar:arrow-right-line-duotone"
            className="w-6 h-6 text-black"
          />
        </a>
      </div>
    </div>
  );
};

export default SharingButtonGroup;
