import { FC } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

interface LinkIconButtonProps {
  label: string;
  icon: string;
  path: string;
  active?: boolean;
  count?: number | null;
  onClick?: () => void;
}

const LinkIconButton: FC<LinkIconButtonProps> = ({
  label,
  icon,
  path,
  active,
  count,
  onClick,
}) => {
  const notifySize =
    count &&
    `size-${
      count > 0
        ? "4"
        : count > 9
        ? "5"
        : count > 99
        ? "6"
        : count > 999
        ? "7"
        : "8"
    }`;

  return (
    <Link
      to={path ?? ""}
      className="flex flex-col items-center justify-center gap-2 bg-transparent group relative"
      onClick={onClick}
    >
      <Icon
        icon={icon}
        className={`text-[#d5fd42] transition-all duration-300 ease-in-out w-12 h-12 backdrop-blur-sm group-hover:bg-gradient-to-r group-hover:from-[#00c3ff] group-hover:to-[#ffff1c] ${
          active && "bg-gradient-to-r from-[#00c3ff] to-[#ffff1c] text-white"
        } backdrop-blur-sm rounded-full shadow-lg p-2 transition-all duration-300 ease-in-out`}
      />
      <span
        className={`text-[#353537] group-hover:text-[#d5fd42] ${
          active && "text-[#d5fd42]"
        } text-xs transition-all duration-300 ease-in-out`}
      >
        {label}
      </span>
      {count && count > 0 && (
        <span className="absolute top-0 right-0 flex size-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span
            className={`relative inline-flex ${notifySize} rounded-full bg-green-500 text-white text-xs font-semibold items-center justify-center`}
          >
            {count}
          </span>
        </span>
      )}
    </Link>
  );
};

export default LinkIconButton;
