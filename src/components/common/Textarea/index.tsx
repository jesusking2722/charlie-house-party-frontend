import { FC } from "react";

interface TextareaProps {
  value?: string;
  onChange?: (val: string) => void;
}

const Textarea: FC<TextareaProps> = ({ value, onChange }) => {
  return (
    <div
      className="group w-full flex items-center gap-2 rounded-lg px-3 py-2
    bg-transparent border border-[#696969] transition-all duration-300
    hover:border-[#c4f70f] hover:shadow-lg focus-within:border-[#c4f70f] focus-within:shadow-lg h-[200px]"
    >
      <textarea
        className="w-full h-full border-none outline-none bg-transparent text-sm text-black placeholder-[#696969]"
        placeholder="Type here..."
        style={{ resize: "none" }}
        onChange={
          onChange
            ? (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange(e.target.value)
            : undefined
        }
      />
    </div>
  );
};

export default Textarea;
