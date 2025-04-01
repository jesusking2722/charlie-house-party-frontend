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
      <span className="text-sm font-semibold text-green-500">{rate}</span>
      <Rating
        value={rate}
        style={{ margin: 0, padding: 0 }}
        itemStyles={myStyles}
        className="max-w-[150px] p-0 m-0"
        readOnly={true}
      />
    </div>
  );
};

export default Rater;
