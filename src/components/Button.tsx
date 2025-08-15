import type { JSX } from "react";
import { formatClassName } from "../utils";

interface ButtonProps {
  children: string;
  className?: string;
  href?: string;
  icon?: JSX.Element;
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, className, icon, ...rest }: ButtonProps) => {
  const Component = rest.href ? "a" : "button";
  return (
    <Component
      className={formatClassName(
        "flex h-14 items-center justify-center gap-3 rounded-lg bg-black px-6 text-lg font-medium text-white transition-[opacity,filter,box-shadow] duration-150 enabled:hover:shadow-lg enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none",
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </Component>
  );
};
