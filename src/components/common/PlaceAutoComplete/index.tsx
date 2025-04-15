import { Icon } from "@iconify/react";
import { FC, useState, useEffect } from "react";
import AutoComplete from "react-google-autocomplete";
import { GOOGLE_MAP_API } from "../../../constant";
import { Geo } from "../../../types";

interface PlaceAutoCompleteProps {
  label?: string;
  icon?: string;
  placeholder?: string;
  invalid?: boolean;
  invalidTxt?: string;
  value?: string;
  readonly?: boolean;
  country: string;
  onChange: (place: any) => void;
  setGeo: (geo: Geo) => void;
}

const PlaceAutoComplete: FC<PlaceAutoCompleteProps> = ({
  label,
  icon,
  placeholder,
  invalid,
  invalidTxt,
  value,
  readonly,
  country,
  onChange,
  setGeo,
}) => {
  const [touched, setTouched] = useState<boolean>(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&libraries=places`;
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
  }, [GOOGLE_MAP_API]);

  const isInvalid = touched && invalid;

  const handlePlaceSelected = (place: any) => {
    if (place.geometry && place.geometry.location) {
      setLoading(true);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      onChange(place.formatted_address);
      setGeo({ lat, lng });
    } else {
      console.error("No geometry data found for selected place.");
    }
    setLoading(false);
  };

  if (!isScriptLoaded) {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label className="text-[#696969] text-sm font-semibold mb-1">
            {label}
          </label>
        )}
        <div className="w-full flex items-center gap-2 rounded-lg px-3 py-2 bg-transparent border border-gray-400">
          {icon && <Icon icon={icon} className="text-[#696969] w-4 h-4" />}
          <input
            type="text"
            className="bg-transparent border-none outline-none text-black text-xs w-full placeholder-[#696969]"
            placeholder="Loading..."
            readOnly
          />
          <Icon
            icon="svg-spinners:ring-resize"
            className="text-gray-500 w-4 h-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="text-[#696969] text-sm font-semibold mb-1">
          {label}
        </label>
      )}

      <div
        className={`group w-full flex items-center gap-2 rounded-lg px-3 py-2
      bg-transparent border border-gray-400 transition-all duration-300
      hover:border-[#c4f70f] hover:bg-white focus-within:bg-white hover:shadow-lg focus-within:border-[#c4f70f] focus-within:shadow-lg ${
        isInvalid ? "border-red-500" : ""
      }`}
      >
        {icon && (
          <Icon
            icon={icon}
            className={`text-[#696969] group-hover:text-[#c4f70f] group-focus-within:text-[#c4f70f] transition-all duration-300 w-4 h-4 ${
              isInvalid && "text-red-500"
            }`}
          />
        )}
        <AutoComplete
          type="text"
          apiKey={GOOGLE_MAP_API}
          className="bg-transparent border-none outline-none focus:border-none text-black 
        text-xs w-full placeholder-[#696969]"
          value={value}
          placeholder={placeholder}
          options={{
            componentRestrictions: { country },
            types: ["address"],
          }}
          onPlaceSelected={(place: any) => {
            handlePlaceSelected(place);
          }}
          onChange={() => {
            if (value) {
              onChange(null);
            }
          }}
          onBlur={() => setTouched(true)}
          readOnly={readonly}
        />
        {loading && (
          <Icon
            icon="svg-spinners:ring-resize"
            className="text-gray-500 w-4 h-4"
          />
        )}
      </div>
      {isInvalid && invalidTxt && (
        <p className="w-full text-red-500 text-xs font-semibold p-1">
          {invalidTxt}
        </p>
      )}
    </div>
  );
};

export default PlaceAutoComplete;
