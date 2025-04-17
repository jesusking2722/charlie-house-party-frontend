import React, { useRef } from "react";
import "./style.css";
import { Icon } from "@iconify/react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative flex items-center z-50">
      <input
        ref={inputRef}
        type="text"
        name="text"
        placeholder="Search something..."
        value={value}
        className={`
          search-input
          w-10 h-10 rounded-[10px] border-none outline-none px-4 py-[18px] bg-transparent cursor-pointer
          transition-all duration-500 ease-in-out group text-xs 
          placeholder:text-transparent
          focus:placeholder:text-gray-500
          shadow-lg
        `}
        onChange={handleInput}
      />
      <span className="search-icon absolute left-0 top-0 flex items-center justify-center h-10 w-10 rounded-[10px] z-[-1] transition-transform duration-200 ease-in-out">
        <Icon icon="mdi:search" className="text-[#353537] w-6 h-6" />
      </span>
    </div>
  );
};

export default SearchInput;
