import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";

export const Dropup = ({ color, name, content, imag }) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "top",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  useEffect(() => {
    document.addEventListener("click", closeDropdownPopover, true);

    return () =>
      document.removeEventListener("click", closeDropdownPopover, true);
  }, []);

  // bg colors
  let bgColor;
  color === "white" ? (bgColor = "bg-blueGray-700") : (bgColor = "bg-blue-600");

  return (
    <div className="h-auto">
      <button
        className={
          " outline-none focus:outline-none tracking-tighter duration-150 h-auto flex flex-col justify-center items-center focus:text-blue-900 transform transition ease-in scale-y-50 "
        }
        type="button"
        ref={btnDropdownRef}
        onClick={() => {
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        {imag}

        <label className="text-sm text-white font-medium">{name}</label>
      </button>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          (color === "white" ? "bg-white " : bgColor + " ") +
          "text-base z-50 float-left py-2 list-none text-left  h-auto rounded shadow-lg mb-1 w-40 break-words"
        }
      >
        {content}
      </div>
    </div>
  );
};

export default function DropdownRender() {
  return (
    <>
      <Dropup color="blue-600" />
    </>
  );
}
