import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../constant";

const ProfileDropdown = ({
  avatar,
  name,
  userId,
}: {
  avatar: string;
  name: string;
  userId: string;
}) => {
  const [active, setActive] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onLogout = () => {
    const token = localStorage.getItem("Authorization");
    console.log(token);
    if (token) {
      localStorage.removeItem("Authorization");
      window.location.reload();
    }
  };

  return (
    <div className="max-w-lg mx-auto relative w-[200px]" ref={dropdownRef}>
      <button
        className="flex flex-row items-center justify-center rounded-full bg-transparent hover:bg-black/5 backdrop-blur-sm group gap-4 pr-4
          transition-all duration-300 ease-in-out"
        onClick={() => setActive(!active)}
      >
        <img
          src={BACKEND_BASE_URL + avatar}
          alt={name}
          className="w-[60px] h-[60px] object-cover rounded-full shadow-lg"
        />
        <div className="flex flex-row items-center gap-2">
          <span className="text-[#353537] group-hover:text-[#c1eb2a] font-semibold text-xs transition-all duration-300 ease-in-out">
            {name}
          </span>
          <Icon
            icon="solar:alt-arrow-down-linear"
            className={`text-[#353537] group-hover:text-[#c1eb2a] w-6 h-6 transition-all duration-300 ease-in-out ${
              active ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>
      {active && (
        <div className="absolute bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow-lg w-full mt-1">
          <ul className="py-1" aria-labelledby="dropdown">
            <li className="group hover:bg-[#c1eb2a] transition-all duration-300 ease-in-out cursor-pointer px-4 py-2">
              <Link
                to={`profile/${userId}`}
                className=" flex flex-row items-center justify-between"
                onClick={() => {
                  setActive(false);
                }}
              >
                <span className="text-[#353537] text-sm">Edit profile</span>
                <Icon
                  icon="solar:user-bold-duotone"
                  className="text-[#353537] w-6 h-6"
                />
              </Link>
            </li>
            <li
              className="group hover:bg-[#c1eb2a] transition-all duration-300 ease-in-out flex flex-row items-center justify-between cursor-pointer px-4 py-2"
              onClick={onLogout}
            >
              <span className="text-[#353537] text-sm">Log out</span>
              <Icon
                icon="solar:logout-bold-duotone"
                className="text-[#353537] w-6 h-6"
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
