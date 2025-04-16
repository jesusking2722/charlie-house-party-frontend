import React from "react";
import "./style.css";

type ProgressProps = {
  value: number;
};

const Progress: React.FC<ProgressProps> = ({ value }) => {
  return (
    <div className="relative w-[60%] max-w-[500px] h-5 rounded-full overflow-hidden shadow-lg bg-gradient-radial-custom box-border">
      {/* Progress Bar */}
      <div
        className="progress-bar absolute top-0 left-0 h-full rounded-full shadow-progress-bar"
        style={{ width: `${value}%` }}
      />
      {/* Progress Text */}
      <div className="absolute top-1/2 left-1/2 text-black font-bold text-xs tracking-wider z-20 -translate-x-1/2 -translate-y-1/2 text-shadow-custom">
        {value}%
      </div>
      {/* Particles */}
      <div className="particles absolute w-full h-full overflow-hidden pointer-events-none">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
      </div>
    </div>
  );
};

export default Progress;
