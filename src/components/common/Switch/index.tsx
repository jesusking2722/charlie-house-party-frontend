const Switch = ({
  checked,
  setChecked,
  label1,
  label2,
}: {
  checked: boolean;
  setChecked: (val: boolean) => void;
  label1: string;
  label2: string;
}) => {
  return (
    <label
      htmlFor="filter"
      aria-label="Toggle Filter"
      className="relative flex w-fit cursor-pointer select-none items-center rounded-full bg-white py-1 shadow-lg"
    >
      <input
        type="checkbox"
        id="filter"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="peer sr-only"
      />

      {/* Slider */}
      <span
        className={`
          absolute z-0 h-full w-1/2 rounded-full 
          bg-gradient-to-r from-[#fdfc47] to-[#24fe41]
          transition-all duration-500 ease-[cubic-bezier(0.47,1.64,0.41,0.8)]
          ${checked ? "translate-x-full" : "translate-x-0"}
        `}
      ></span>

      {/* Left Label */}
      <span
        className={`z-10 w-1/2 text-center text-xs font-medium px-4 py-2 transition-all ${
          checked ? "opacity-50 text-gray-500" : "opacity-100 text-black"
        }`}
      >
        {label1}
      </span>

      {/* Right Label */}
      <span
        className={`z-10 w-1/2 text-center text-xs font-medium px-4 py-2 transition-all ${
          checked ? "opacity-100 text-black" : "opacity-50 text-gray-500"
        }`}
      >
        {label2}
      </span>
    </label>
  );
};

export default Switch;
