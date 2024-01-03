import React, { useState } from "react";

export const Disclosure = ({ title, children, childrenStyle = "" }) => {
    const [open, setOpen] = useState(true);
    return (
        <div className="border-b rounded-b-sm border-gray-200 pb-2 ">
            <div
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between cursor-pointer py-3"
            >
                <h2 className="text-sm capitalize text-bold">{title}</h2>
                <div className={`text-black text-bold`}>
                    {!open ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    )}
                </div>
            </div>
            <div
                className={`w-full overflow-hidden mb-2 ${childrenStyle} ${
                    !open && "hidden"
                }`}
            >
                {children}
            </div>
        </div>
    );
};
