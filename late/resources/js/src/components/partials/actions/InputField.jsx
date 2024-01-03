import React from "react";
import Input from "@material-tailwind/react/Input";

export const InputField = ({
    type = "text",
    value,
    disabled = false,
    placeholder,
}) => {
    return (
        <Input
            value={value}
            disabled={disabled}
            type={type}
            color="lightBlue"
            size="sm"
            outline={true}
            placeholder={placeholder}
        />
    );
};
