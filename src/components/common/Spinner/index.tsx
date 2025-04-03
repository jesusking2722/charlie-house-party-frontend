import { Icon } from "@iconify/react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <Icon icon="svg-spinners:tadpole" className="w-16 h-16 text-[#c1eb2a]" />
    </div>
  );
};

export default Spinner;
