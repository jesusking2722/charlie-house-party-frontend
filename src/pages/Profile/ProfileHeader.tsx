import { Icon } from "@iconify/react";
import { FC } from "react";
import { formatDate } from "../../utils";

interface ProfileHeaderProps {
  title: string;
  parites: number;
  countryCode: string;
  joinedDate: Date;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  title,
  parites,
  countryCode,
  joinedDate,
}) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-black">{title}</h2>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <Icon
            icon="solar:check-circle-bold"
            className={`w-6 h-6 ${
              parites > 0 ? "text-green-500" : "text-gray-400"
            }`}
          />
          <span className="font-semibold text-green-500">{parites}</span>
          <span className="text-sm font-semibold text-black">parties</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Icon
            icon={`flagpack:${countryCode.toLowerCase()}`}
            className="w-6 h-6 rounded-lg"
          />
          <span className="text-sm text-black">
            Joined on <strong>{formatDate(joinedDate)}</strong>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
