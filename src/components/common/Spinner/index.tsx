import { Icon } from "@iconify/react";

const Spinner = () => {
  return (
    <div className="fixed z-50 w-full h-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="absolute flex items-center justify-center">
        <Icon
          icon="svg-spinners:tadpole"
          className="w-16 h-16 text-[#c1eb2a]"
        />
      </div>
    </div>
  );
};

export default Spinner;
