import { Icon } from "@iconify/react";
import { FC } from "react";
import { Link } from "react-router";

interface ButtonProps {
  type:
    | "primary"
    | "outline"
    | "transparent"
    | "link"
    | "blue"
    | "red"
    | "gradient";
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
  disabled,
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
            ? "bg-[#c4f70f] border border-[#c4f70f] hover:bg-white text-black hover:text-[#c4f70f]"
            : type === "outline"
            ? `border bg-transparent ${
                disabled
                  ? "border-gray-200 text-gray-200 cursor-not-allowed"
                  : "hover:bg-[#c4f70f] hover:text-black border-[#c4f70f] text-[#c4f70f]"
              }`
            : type === "transparent"
            ? `bg-black/10 text-white ${
                disabled
                  ? "cursor-not-allowed"
                  : "hover:bg-black/15 backdrop-blur-sm cursor-pointer"
              }`
            : type === "red"
            ? `bg-red-500 hover:bg-red-600`
            : type === "gradient"
            ? "bg-gradient text-white"
            : ""
        }
    `}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && (
        <Icon
          icon={icon}
          className={`w-6 h-6 transition-all duration-300 ease-in-out ${
            type === "primary"
              ? "text-black group-hover:text-[#c4f70f]"
              : type === "outline"
              ? `${
                  disabled
                    ? "text-white"
                    : "text-[#c4f70f] group-hover:text-black"
                }`
              : type === "transparent" || type === "gradient"
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
