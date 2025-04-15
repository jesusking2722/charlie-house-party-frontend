import { FC } from "react";
import { BASE_URL } from "../../../constant";

export type StickerCheckbox = {
  _id?: string;
  image: string;
  name: string;
  isChecked: boolean;
  price: number;
};

interface StickerCheckboxGroupProps {
  stickers: StickerCheckbox[];
  onCheck: (sticker: StickerCheckbox) => void;
}

const StickerCheckboxGroup: FC<StickerCheckboxGroupProps> = ({
  stickers,
  onCheck,
}) => {
  return (
    <div className="w-full grid grid-cols-8 gap-4 h-full">
      {stickers.map((sticker, index) => (
        <button
          key={index}
          className={`hover:shadow-lg p-2 w-[120px] h-[120px] border flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
            sticker.isChecked
              ? "border-[#c4f70f] shadow-xl bg-[#c4f70f]"
              : "border-gray-300 bg-white/20 backdrop-blur-sm"
          }`}
          onClick={() => {
            onCheck(sticker);
          }}
        >
          <img
            src={BASE_URL + "/logo.png"}
            alt={sticker.name}
            className="w-[80px] h-[80px] transition-transform duration-300 ease-in-out cursor-pointer"
          />
          <span
            className={`text-xs font-semibold ${
              sticker.isChecked ? "text-black" : "text-gray-400"
            }`}
          >
            {sticker.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default StickerCheckboxGroup;
