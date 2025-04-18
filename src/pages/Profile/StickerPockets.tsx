import { useState } from "react";
import { Button } from "../../components";
import { BACKEND_BASE_URL } from "../../constant";
import { Sticker } from "../../types";

const StickerPockets = ({ stickers }: { stickers: Sticker[] }) => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div
      className={`py-4 px-8 rounded-xl bg-black/5 backdrop-blur-sm shadow-lg`}
    >
      <div
        className={`grid grid-cols-4 gap-2 relative overflow-x-hidden transition-all duration-300 ease-in-out ${
          !expand ? "overflow-hidden h-[300px]" : "h-[400px]"
        } `}
      >
        {stickers.map((sticker, index) => (
          <img
            key={index}
            src={BACKEND_BASE_URL + sticker.image}
            alt={sticker.name ?? ""}
            className="w-[80px] h-[80px] object-center object-cover"
          />
        ))}
      </div>
      {stickers.length > 0 && (
        <div className="w-full p-2 flex items-center justify-center left-0">
          <Button
            type="transparent"
            width="full"
            label={expand ? "Expand Little" : "Expand All"}
            onClick={() => {
              setExpand(!expand);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StickerPockets;
