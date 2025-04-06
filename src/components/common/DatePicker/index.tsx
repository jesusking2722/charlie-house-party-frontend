import { Icon } from "@iconify/react";
import { FC, useState } from "react";
import { DatePicker as ReactDatePicker } from "react-responsive-datepicker";
import "react-responsive-datepicker/dist/index.css";
import { formatDate } from "../../../utils";

interface DatePickerProps {
  label?: string;
  icon: string;
  placeholder: string;
  invalid?: boolean;
  readonly?: boolean;
  onChange: (date: Date | null) => void;
}

const DatePicker: FC<DatePickerProps> = ({
  label,
  icon,
  invalid,
  placeholder,
  readonly,
  onChange,
}) => {
  const [touched, setTouched] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dateTxt, setDateTxt] = useState<string | null>(null);

  // Validation logic: apply invalid state only if the field is touched
  const isInvalid = touched && invalid;

  const handleOnChange = (date: Date | null) => {
    const formattedDate = formatDate(date ?? "");
    setDateTxt(formattedDate);
    onChange(date);
  };

  return (
    <div className="z-50 w-full">
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
          onClick={() => {
            setIsOpen(true);
          }}
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
            type="text"
            className="bg-transparent border-none outline-none focus:border-none text-black 
            text-xs w-full placeholder-[#696969]"
            value={dateTxt ?? ""}
            placeholder={placeholder}
            onBlur={() => setTouched(true)}
            readOnly={readonly}
          />
        </div>
      </div>
      <ReactDatePicker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultValue={new Date(2025, 3, 4)}
        minDate={new Date(2025, 3, 4)}
        headerFormat="DD, MM dd"
        onChange={(date: any) => {
          handleOnChange(date);
        }}
      />
    </div>
  );
};

export default DatePicker;
