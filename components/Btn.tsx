import { LucideIcon } from "lucide-react";
import React from "react";
import clsx from "clsx"; // Ensure clsx is installed: `npm install clsx`

interface IButton {
  label: string;
  disabled?: boolean;
  customClass?: string;
  outline?: boolean;
  Icon?: LucideIcon;
  IconSize?: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IButton> = ({
  label,
  disabled = false,
  Icon,
  customClass = "",
  outline = false,
  IconSize = 20,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "py-2 px-6 rounded-md border flex items-center gap-3 transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-75",
        outline
          ? "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
          : "bg-primary text-white hover:bg-primary-hover",
        customClass
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={IconSize} />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
