import { Icon } from "@iconify/react";
import { FC, useState } from "react";

interface InputFieldProps {
  type: "text" | "password" | "number" | "email";
  label?: string;
  placeholder?: string;
  value?: any;
  icon?: string;
  invalid?: boolean;
  invalidTxt?: string;
  readonly?: boolean;
  onChange?: (val: string) => void;
}

const Input: FC<InputFieldProps> = ({
  type,
  label,
  placeholder,
  value,
  icon,
  invalid,
  invalidTxt,
  readonly,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  const getPasswordStrength = (password: string) => {
    if (!password) return null;
    if (password.length === 0) return null; // No indicator when empty
    if (password.length < 6) return "weak"; // Weak: Less than 6 characters
    if (password.match(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/)) return "normal"; // Normal: 6+ characters, letters & numbers
    if (password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/))
      return "strong"; // Strong: 8+ characters, letters, numbers & symbols
    return "weak";
  };

  const passwordStrength =
    type === "password" ? getPasswordStrength(value) : null;

  const isInvalid = touched && invalid;

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
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          className="bg-transparent border-none outline-none focus:border-none text-black 
            text-xs w-full placeholder-[#696969]"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={() => setTouched(true)}
          readOnly={readonly}
        />
        {type === "password" && (
          <button
            type="button"
            className="pl-1 border-l border-[#696969] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon
              icon={
                showPassword
                  ? "solar:eye-closed-bold-duotone"
                  : "solar:eye-bold-duotone"
              }
              className="text-[#696969] group-hover:text-[#c4f70f] group-focus-within:text-[#c4f70f] transition-all duration-300 w-6 h-6"
            />
          </button>
        )}
      </div>

      {/* Password Strength Indicator */}
      {passwordStrength && (
        <div className="w-full flex flex-col gap-1">
          <div className="flex gap-1 mt-1">
            <div
              className={`h-1 flex-1 rounded-lg ${
                passwordStrength === "weak" ? "bg-red-500" : "bg-[#696969]"
              }`}
            ></div>
            <div
              className={`h-1 flex-1 rounded-lg ${
                passwordStrength === "normal"
                  ? "bg-[#c4f70f]"
                  : passwordStrength === "strong"
                  ? "bg-[#c4f70f]"
                  : "bg-[#696969]"
              }`}
            ></div>
            <div
              className={`h-1 flex-1 rounded-lg ${
                passwordStrength === "strong" ? "bg-[#c4f70f]" : "bg-[#696969]"
              }`}
            ></div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-[#696969] font-semibold text-[10px]">
              {passwordStrength.toUpperCase()}
            </span>
            <Icon
              icon="heroicons:information-circle-solid"
              className="text-[#696969] w-4 h-4"
            />
          </div>
        </div>
      )}

      {isInvalid && invalidTxt && (
        <p className="w-full text-red-500 text-xs font-semibold p-1">
          {invalidTxt}
        </p>
      )}
    </div>
  );
};

export default Input;
