import { FC } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

interface LinkIconButtonProps {
  label: string;
  icon: string;
  path: string;
  active?: boolean;
}

const LinkIconButton: FC<LinkIconButtonProps> = ({
  label,
  icon,
  path,
  active,
}) => {
  return (
    <Link
      to={path ?? ""}
      className="flex flex-col items-center justify-center gap-2 bg-transparent group"
    >
      <Icon
        icon={icon}
        className={`text-[#353537] w-12 h-12 group-hover:text-[#dcff5e] group-hover:bg-[#a3bd45] ${
          active && "bg-[#a3bd45] text-[#dcff5e]"
        } backdrop-blur-sm rounded-full shadow-lg p-2 transition-all duration-300 ease-in-out`}
      />
      <span
        className={`text-[#353537] group-hover:text-[#d5fd42] ${
          active && "text-[#d5fd42]"
        } text-xs transition-all duration-300 ease-in-out`}
      >
        {label}
      </span>
    </Link>
  );
};

export default LinkIconButton;
