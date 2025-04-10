import { FC, useState } from "react";

interface TextareaProps {
  value?: string;
  invalid?: boolean;
  invalidTxt?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
}

const Textarea: FC<TextareaProps> = ({
  value,
  invalid,
  invalidTxt,
  placeholder,
  onChange,
}) => {
  const [touched, setTouched] = useState<boolean>(false);
  const isInvalid = touched && invalid;

  return (
    <div className="w-full flex flex-col gap-1">
      <div
        className={`group w-full flex items-center gap-2 rounded-lg px-3 py-2 h-[150px]
bg-transparent border border-gray-400 transition-all duration-300
hover:border-[#c4f70f] hover:bg-white focus-within:bg-white hover:shadow-lg focus-within:border-[#c4f70f] focus-within:shadow-lg ${
          isInvalid ? "border-red-500" : ""
        }`}
      >
        <textarea
          className="w-full h-full border-none outline-none bg-transparent text-xs text-black placeholder-[#696969]"
          placeholder={placeholder ?? "Type here..."}
          style={{ resize: "none" }}
          value={value}
          onBlur={() => setTouched(true)}
          onChange={
            onChange
              ? (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  onChange(e.target.value)
              : undefined
          }
        />
      </div>
      {isInvalid && invalidTxt && (
        <p className="w-full text-red-500 text-xs font-semibold p-1">
          {invalidTxt}
        </p>
      )}
    </div>
  );
};

export default Textarea;
