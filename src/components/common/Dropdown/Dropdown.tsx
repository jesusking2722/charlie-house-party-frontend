import { Icon } from "@iconify/react";
import { FC, useState, useEffect, useRef } from "react";

interface DropdownProps {
  label: string;
  dropdowns: string[];
  selectedDropdown?: string;
  width?: "full";
  onSelect: (val: string) => void;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  dropdowns,
  selectedDropdown,
  width,
  onSelect,
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

  return (
    <div
      className={`mx-auto relative ${
        width === "full" ? "w-full" : "w-[200px]"
      }`}
      ref={dropdownRef}
    >
      <div
        className="group w-full flex items-center gap-2 rounded-lg px-3 py-2
        bg-transparent border border-gray-400 transition-all duration-300
        hover:border-[#c4f70f] hover:shadow-lg focus-within:border-[#c4f70f] focus-within:shadow-lg"
      >
        <button
          className="flex flex-row items-center justify-between w-full text-xs"
          type="button"
          onClick={() => setActive(!active)}
        >
          <span>{selectedDropdown ? selectedDropdown : label}</span>
          <Icon
            icon="solar:alt-arrow-down-linear"
            className={`text-[#353537] transition-all duration-300 w-4 h-4 ${
              active ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      {active && (
        <div
          className="absolute bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow-lg w-full mt-1"
          id="dropdown"
        >
          <ul className="py-1" aria-labelledby="dropdown">
            {dropdowns.map((dropdown, index) => (
              <li
                key={index}
                className="group hover:bg-[#c1eb2a] transition-all duration-300 ease-in-out"
                onClick={() => {
                  onSelect(dropdown);
                  setActive(false);
                }}
              >
                <span className="block px-4 py-2 text-xs">{dropdown}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
