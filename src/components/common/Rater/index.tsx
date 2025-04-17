import { Rating, StickerStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const myStyles = {
  itemShapes: StickerStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#9ca3af",
};

const Rater = ({ rate }: { rate: number }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Rating
        value={rate}
        style={{ margin: 0, padding: 0 }}
        itemStyles={myStyles}
        className="max-w-[120px] p-0 m-0"
        readOnly={true}
      />
      <span
        className={`text-xs font-semibold ${
          rate === 0 ? "text-gray-400" : "text-green-500"
        }`}
      >
        {rate}
      </span>
    </div>
  );
};

export default Rater;
