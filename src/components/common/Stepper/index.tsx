import React, {FC} from "react";
import {Icon} from "@iconify/react";

export type StepperItem = {
    icon: string;
    label: string;
    completed: boolean;
};

interface StepperProps {
    steps: StepperItem[];
    activeStep: number;
}

const Stepper: FC<StepperProps> = ({steps, activeStep}) => {
    const width = `w-1/${steps.length}`

    return (
        <div className="w-full py-6">
            <div className="flex">
                {steps.map((step, index) => (
                    <div className={width}>
                        <div className="relative mb-2">
                            {index > 0 && (
                                <div
                                    className="absolute flex align-center items-center align-middle content-center"
                                    style={{
                                        width: 'calc(100% - 2.5rem - 1rem)',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <div
                                        className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
                                        <div
                                            className={`w-0 ${steps[index - 1].completed ? 'bg-green-400' : 'bg-gray-300'} py-1 rounded`}
                                            style={{width: '100%'}}></div>
                                    </div>
                                </div>
                            )}
                            {index === activeStep ? (
                                <span
                                    className="relative w-10 h-10 mx-auto rounded-full shadow-lg flex items-center bg-green-300">
                                  <span
                                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                    <Icon icon={step.icon}
                                          className={`text-center w-full relative inline-flex rounded-full ${step.completed ? 'text-white' : 'text-white'}`}/>
                                </span>
                            ) : <div
                                className={`w-10 h-10 mx-auto ${step.completed ? 'bg-green-500' : 'bg-gray-400'} rounded-full shadow-lg flex items-center`}>
                                <Icon icon={step.icon}
                                      className={`text-center w-full ${step.completed ? 'text-white' : 'text-white'}`}/>
                            </div>
                            }
                        </div>
                        <div
                            className={`text-xs text-center md:text-sm ${step.completed ? 'text-green-500 font-semibold' : 'text-black'}`}>{step.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stepper;
