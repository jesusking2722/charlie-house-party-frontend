import { FC } from "react";
import { Icon } from "@iconify/react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "./style.css";
import countryList from "react-select-country-list";

interface RegionSelectProps {
  country: string;
  region: string;
  onCountryChange: (val: any) => void;
  onRegionChange: (val: any) => void;
}

const RegionSelect: FC<RegionSelectProps> = ({
  country,
  region,
  onCountryChange,
  onRegionChange,
}) => {
  const countryCode = countryList();

  return (
    <div className="w-full flex flex-row items-center gap-4">
      <div className="flex flex-col gap-1">
        <div
          className="group w-full flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer
          bg-transparent border border-gray-400 transition-all duration-300
          hover:border-[#c4f70f] hover:shadow-lg focus-within:border-[#c4f70f] focus-within:shadow-lg"
        >
          {country && (
            <Icon
              icon={`flagpack:${countryCode.getValue(country).toLowerCase()}`}
              className="text-[#353537] group-hover:text-[#c4f70f] group-focus-within:text-[#c4f70f] transition-all duration-300 w-6 h-6"
            />
          )}
          <CountryDropdown
            className="bg-transparent border-none outline-none text-sm cursor-pointer country-select"
            value={country}
            onChange={(val) => onCountryChange(val)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div
          className="group w-full flex items-center gap-2 rounded-lg px-3 py-2
          bg-transparent border border-gray-400 transition-all duration-300
          hover:border-[#c4f70f] hover:shadow-lg focus-within:border-[#c4f70f] focus-within:shadow-lg"
        >
          <RegionDropdown
            className="bg-transparent border-none outline-none text-sm cursor-pointer country-select"
            country={country}
            value={region}
            onChange={(val) => onRegionChange(val)}
          />
        </div>
      </div>
    </div>
  );
};

export default RegionSelect;
