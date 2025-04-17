import "./style.css";

const Loader = () => {
  return (
    <div
      className="relative flex justify-center items-center w-16 h-16 rounded-full"
      id="wifi-loader"
    >
      <svg
        viewBox="0 0 86 86"
        className="circle-outer absolute w-[86px] h-[86px] flex justify-center items-center"
      >
        <circle r={40} cy={43} cx={43} className="back" />
        <circle r={40} cy={43} cx={43} className="front" />
        <circle r={40} cy={43} cx={43} className="new" />
      </svg>
      <svg
        viewBox="0 0 60 60"
        className="circle-middle absolute w-[60px] h-[60px] flex justify-center items-center"
      >
        <circle r={27} cy={30} cx={30} className="back" />
        <circle r={27} cy={30} cx={30} className="front" />
      </svg>
      <div
        data-text="Loading..."
        className="loader-text absolute -bottom-10 flex justify-center items-center font-medium text-sm tracking-[0.02em] lowercase"
      />
    </div>
  );
};

export default Loader;
