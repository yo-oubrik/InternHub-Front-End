import { LucideIcon } from "lucide-react";
import React from "react";
import clsx from "clsx";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    Icon?: LucideIcon;
    iconSize?: number;
    outline?: boolean;
}

const Button: React.FC<IButton> = ({
    label,
    Icon,
    iconSize = 20,
    outline = false,
    disabled,
    className,
    onClick,
    ...props
}) => {
    return (
        <button
            className={clsx(
                "py-2 px-6 rounded-md border flex items-center gap-3 transition-all duration-200 ease-in-out outline-none border-primary hover:opacity-75",
                "disabled:cursor-not-allowed disabled:opacity-75",
                outline
                    ? "bg-transparent text-primary "
                    : "bg-primary text-white",
                className
            )}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {Icon && <Icon size={iconSize} />}
            <span>{label}</span>
        </button>
    );
};

export default Button;
