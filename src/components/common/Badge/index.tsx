import { FC } from "react";
import Tooltip from "../Tooltip";
import { Icon } from "@iconify/react";

interface BadgeProps {
  type: "premium" | "kyc";
}

const Badge: FC<BadgeProps> = ({ type }) => {
  return (
    <Tooltip
      message={
        type === "premium"
          ? "Premium member"
          : type === "kyc"
          ? "ID verified"
          : ""
      }
    >
      <Icon
        icon={
          type === "kyc"
            ? "solar:verified-check-bold"
            : type === "premium"
            ? "solar:stars-bold"
            : ""
        }
        className={`w-6 h-6 ${
          type === "kyc"
            ? "text-green-500"
            : type === "premium"
            ? "text-cyan-500"
            : ""
        }`}
      />
    </Tooltip>
  );
};

export default Badge;
