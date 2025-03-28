import { Icon } from "@iconify/react";
import { FC } from "react";
import { Link } from "react-router";

interface ButtonProps {
  type: "primary" | "outline" | "transparent" | "link";
  label: string;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  width?: "full";
  path?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  type,
  label,
  icon,
  width,
  path,
  onClick,
}) => {
  if (type === "link" && path) {
    return (
      <Link
        to={path}
        className="text-sm text-white hover:text-[#d5fd42] transition-all duration-300 ease-in-out cursor-pointer"
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      className={`flex flex-row items-center justify-center gap-2 group transition-all duration-300 ease-in-out group rounded-xl text-sm ${
        width === "full" ? "w-full py-3" : "px-7 py-3"
      } shadow-lg
        ${
          type === "primary"
            ? "bg-[#c1eb2a] hover:bg-[#d5fd42] text-black"
            : type === "outline"
            ? "border border-[#c4f70f] text-[#c4f70f] bg-transparent hover:bg-[#afc467] hover:text-black"
            : type === "transparent"
            ? "bg-transparent hover:bg-black/5 backdrop-blur-sm text-white"
            : ""
        }
    `}
      onClick={onClick}
    >
      {icon && (
        <Icon
          icon={icon}
          className={`w-6 h-6 transition-all duration-300 ease-in-out ${
            type === "primary"
              ? "text-white"
              : type === "outline"
              ? "text-[#c4f70f] group-hover:text-black"
              : type === "transparent"
              ? "text-white"
              : ""
          }`}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
