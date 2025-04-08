import React, {FC} from "react";

interface RangeProps {
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
}

const Range: FC<RangeProps> = ({label, min, max, step, value, onChange}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className='w-full flex flex-col gap-2'>
            <div className="mb-4">
                <label htmlFor="price-range" className="block text-gray-700 font-bold mb-2">
                    {label}
                </label>
                <input
                    type="range"
                    id="price-range"
                    className="w-full accent-indigo-600"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex justify-between text-gray-500">
                <span id="minPrice">{min}</span>
                <span id="maxPrice">{max}</span>
                <span id="currentPrice">{value}</span>
            </div>
        </div>
    );
};

export default Range;
