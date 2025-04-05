import React from "react";
import clsx from "clsx";

const Button = ({ icon, className, label, type, onClick = () => {} }) => {
    return (
        <button
            type={type || "button"}
            onClick={onClick}
            className={clsx("px-3 py-2 rounded", className)}
        >
            <span>{label}</span>
            {icon && icon}
        </button>
    );
};

export default Button;
