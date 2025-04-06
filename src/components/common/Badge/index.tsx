import { FC } from "react";
import Tooltip from "../Tooltip";
import { Icon } from "@iconify/react";
import { BASE_URL } from "../../../constant";

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
      {type === "premium" && (
        <img
          src={BASE_URL + "/assets/svgs/premium.svg"}
          alt="premium"
          className="w-6 h-6"
        />
      )}
      {type === "kyc" && (
        <Icon
          icon="solar:verified-check-bold"
          className="w-6 h-6 text-green-500"
        />
      )}
    </Tooltip>
  );
};

export default Badge;
