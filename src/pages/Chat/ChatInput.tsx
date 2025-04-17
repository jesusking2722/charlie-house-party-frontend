import { FC, useState, useRef, useEffect } from "react";

interface ChatInputProps {
  placeholder: string;
  value: string;
  invalid?: boolean;
  invalidTxt?: string;
  onChange: (val: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({
  value,
  invalid,
  invalidTxt,
  placeholder,
  onChange,
}) => {
  const [touched, setTouched] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isInvalid = touched && invalid;

  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      // Store original line height (should match your CSS)
      const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 20; // Fallback to 20px

      // Start with single line height
      el.style.height = `${lineHeight}px`;

      // Calculate content height
      const contentHeight = el.scrollHeight;

      // Apply calculated height (minimum 1 line, maximum 200px)
      el.style.height = `${Math.min(contentHeight, 200)}px`;

      // Show scrollbar only when at max height
      el.style.overflowY = contentHeight > 200 ? "auto" : "hidden";
    }
  }, [value]);

  return (
    <div className="w-full flex flex-col gap-1">
      <div
        className={`group w-full flex items-center gap-2 rounded-lg px-3 py-2
        bg-transparent border border-gray-400 transition-all duration-300
        hover:border-[#c4f70f] hover:bg-white focus-within:bg-white hover:shadow-lg
        focus-within:border-[#c4f70f] focus-within:shadow-lg ${
          isInvalid ? "border-red-500" : ""
        }`}
      >
        <textarea
          ref={textareaRef}
          className="w-full max-h-[200px] border-none outline-none bg-transparent text-xs text-black placeholder-[#696969] scrollbar-hide leading-normal"
          placeholder={placeholder ?? "Type here..."}
          style={{ resize: "none" }}
          value={value}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange?.(e.target.value)}
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

export default ChatInput;
