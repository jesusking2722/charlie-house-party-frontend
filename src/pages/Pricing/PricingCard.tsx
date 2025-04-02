import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { FC } from "react";

interface PricingCardProps {
  free?: boolean;
  active?: boolean;
  price?: number;
  month?: 1 | 3 | 6 | 12;
  onSelect?: (month: 1 | 3 | 6 | 12, price: number, isFree: boolean) => void;
}

const PricingCard: FC<PricingCardProps> = ({
  free,
  active,
  price,
  month,
  onSelect,
}) => {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring" }}
      className="bg-white/30 backdrop-blur-sm overflow-hidden rounded-xl shadow-lg"
    >
      <div
        className={`w-full h-1 ${
          free
            ? "bg-red-500"
            : month === 1
            ? "bg-blue-500"
            : month === 3
            ? "bg-green-500"
            : month === 6
            ? "bg-cyan-500"
            : month === 12
            ? "bg-yellow-500"
            : ""
        }`}
      ></div>
      <div className="w-full flex flex-col items-center justify-center gap-4 py-14 px-20">
        <div className="flex flex-col items-center justify-center gap-2">
          <Icon
            icon="solar:tag-price-line-duotone"
            className={`w-14 h-14 ${
              free
                ? "text-red-500"
                : month === 1
                ? "text-blue-500"
                : month === 3
                ? "text-green-500"
                : month === 6
                ? "text-cyan-500"
                : month === 12
                ? "text-yellow-500"
                : ""
            }`}
          />
          <span
            className={`text-lg font-semibold ${
              free
                ? "text-red-500"
                : month === 1
                ? "text-blue-500"
                : month === 3
                ? "text-green-500"
                : month === 6
                ? "text-cyan-500"
                : month === 12
                ? "text-yellow-500"
                : ""
            }`}
          >
            {free
              ? "Free Plan"
              : `${month} ${month === 1 ? "month" : "months"}`}
          </span>
          <span
            className={`text-lg font-semibold ${
              free
                ? "text-red-500"
                : month === 1
                ? "text-blue-500"
                : month === 3
                ? "text-green-500"
                : month === 6
                ? "text-cyan-500"
                : month === 12
                ? "text-yellow-500"
                : ""
            }`}
          >
            {free ? 0 : price}{" "}
            <span className="text-sm font-semibold">CHRLE</span>
          </span>
        </div>
        <button
          className={`w-full p-2 text-white text-sm rounded-xl transition-all duration-300 ease-in-out hover:opacity-80 shadow-lg ${
            active
              ? "bg-gray-400 hover:opacity-100 cursor-not-allowed"
              : free
              ? "bg-red-500"
              : month === 1
              ? "bg-blue-500"
              : month === 3
              ? "bg-green-500"
              : month === 6
              ? "bg-cyan-500"
              : month === 12
              ? "bg-yellow-500"
              : ""
          }`}
          disabled={active}
          onClick={
            onSelect
              ? () => {
                  onSelect(month ?? 1, price ?? 5, free ?? false);
                }
              : () => {}
          }
        >
          {active ? "Current Plan" : "Select Plan"}
        </button>
      </div>
      <div
        className={`w-full h-1 ${
          free
            ? "bg-red-500"
            : month === 1
            ? "bg-blue-500"
            : month === 3
            ? "bg-green-500"
            : month === 6
            ? "bg-cyan-500"
            : month === 12
            ? "bg-yellow-500"
            : ""
        }`}
      ></div>
    </motion.div>
  );
};

export default PricingCard;
