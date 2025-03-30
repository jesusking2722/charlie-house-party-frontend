import { FC, useState } from "react";
import { Icon } from "@iconify/react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./style.css";

interface CustomPhoneInputProps {
  label?: string;
  value: string;
  defaultCountry?: string;
  invalidTxt?: string;
  onChange: (phone: string) => void;
}

const CustomPhoneInput: FC<CustomPhoneInputProps> = ({
  label,
  value,
  defaultCountry,
  invalidTxt,
  onChange,
}) => {
  const [touched, setTouched] = useState<boolean>(false);
  const isInvalid = touched && (!value || !isValidPhoneNumber(value));

  return (
    <div className="w-full flex flex-col gap-1 custom-phone-container">
      {label && (
        <label className="text-sm font-semibold text-[#353537]">{label}</label>
      )}

      <div
        className={`group w-full flex items-center gap-2 rounded-lg px-3 py-2
          bg-transparent border transition-all duration-300
          ${
            isInvalid
              ? "border-red-500"
              : "border-gray-400 hover:border-[#c4f70f] focus-within:border-[#c4f70f]"
          }`}
      >
        <Icon
          icon="solar:smartphone-2-bold-duotone"
          className={`w-6 h-6 transition-all duration-300 ease-in-out ${
            isInvalid
              ? "text-red-500"
              : "text-[#353537] group-hover:text-[#c4f70f] group-focus-within:text-[#c4f70f]"
          }`}
        />
        <PhoneInput
          international
          defaultCountry={defaultCountry as any}
          value={value}
          className="bg-transparent border-none text-black text-sm w-full placeholder-gray-400"
          onChange={(e: any) => {
            onChange(e ?? "");
          }}
          onBlur={() => setTouched(true)}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? "phone-error" : undefined}
          style={{ outline: "none", border: "none" }}
        />
      </div>
      {isInvalid && invalidTxt && (
        <p id="phone-error" className="text-red-500 text-xs font-semibold p-1">
          {invalidTxt}
        </p>
      )}
    </div>
  );
};

export default CustomPhoneInput;
