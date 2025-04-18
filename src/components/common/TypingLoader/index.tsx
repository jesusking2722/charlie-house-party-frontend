import "./style.css";

const TypingLoader = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="typing-indicator relative w-[60px] h-[30px] z-[4]">
        <div className="typing-circle absolute w-2 h-2 rounded-full bg-black left-[15%] origin-center animate-typing-circle" />
        <div className="typing-circle absolute w-2 h-2 rounded-full bg-black left-[45%] origin-center animate-typing-circle animation-delay-200" />
        <div className="typing-circle absolute w-2 h-2 rounded-full bg-black right-[15%] origin-center animate-typing-circle animation-delay-300" />

        <div className="typing-shadow absolute w-[5px] h-1 rounded-full bg-black/20 top-[30px] left-[15%] origin-center z-[3] blur-[1px] animate-typing-shadow" />
        <div className="typing-shadow absolute w-[5px] h-1 rounded-full bg-black/20 top-[30px] left-[45%] origin-center z-[3] blur-[1px] animate-typing-shadow animation-delay-200" />
        <div className="typing-shadow absolute w-[5px] h-1 rounded-full bg-black/20 top-[30px] right-[15%] origin-center z-[3] blur-[1px] animate-typing-shadow animation-delay-300" />
      </div>

      <h2 className="text-xs animate-text-stream">
        <strong>{name}</strong> is typing<span className="dots">...</span>
      </h2>
    </div>
  );
};

export default TypingLoader;
