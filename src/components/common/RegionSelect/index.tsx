import { FC } from "react";
import { Icon } from "@iconify/react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "./style.css";
import countryList from "react-select-country-list";

interface RegionSelectProps {
  label?: string;
  country: string;
  region?: string;
  hideRegion?: boolean;
  positioning?: "horizontal" | "vertical";
  onCountryChange: (val: any) => void;
  onRegionChange?: (val: any) => void;
}

const RegionSelect: FC<RegionSelectProps> = ({
  label,
  country,
  region,
  hideRegion,
    positioning,
  onCountryChange,
  onRegionChange,
}) => {
  const countryCode = countryList();

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="text-[#696969] text-sm font-semibold mb-1">
          {label}
        </label>
      )}
      {hideRegion ? (
        <div
          className="group w-full flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer
          bg-transparent border border-gray-400 transition-all duration-300
          hover:border-[#c4f70f] hover:shadow-lg focus-within:border-[#c4f70f] focus-within:shadow-lg"
        >
          {country && (
            <Icon
              icon={`flag:${countryCode.getValue(country).toLowerCase()}-4x3`}
              className="text-[#353537] group-hover:text-[#c4f70f] group-focus-within:text-[#c4f70f] transition-all duration-300 w-4 h-4"
            />
          )}
          <CountryDropdown
            className="bg-transparent border-none outline-none text-xs cursor-pointer country-select w-full"
            value={country}
            onChange={(val) => onCountryChange(val)}
          />
        </div>
      ) : (
        <div className={`w-full flex gap-4 ${positioning === 'vertical' ? 'flex-col items-start' : 'flex-row items-center'}`}>
          <div className="flex flex-col gap-1">
            <div
              className="group w-full flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer
          bg-transparent border border-gray-400 transition-all duration-300
          hover:border-[#c4f70f] hover:shadow-lg focus-within:border-[#c4f70f] focus-within:shadow-lg"
            >
              {country && (
                <Icon
                  icon={`flagpack:${countryCode
                    .getValue(country)
                    .toLowerCase()}`}
                  className="text-[#353537] group-hover:text-[#c4f70f] group-focus-within:text-[#c4f70f] transition-all duration-300 w-4 h-4"
                />
              )}
              <CountryDropdown
                className="bg-transparent border-none outline-none text-xs cursor-pointer country-select"
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
                className="bg-transparent border-none outline-none text-xs cursor-pointer country-select"
                country={country}
                value={region ?? ""}
                onChange={
                  onRegionChange ? (val) => onRegionChange(val) : undefined
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelect;
