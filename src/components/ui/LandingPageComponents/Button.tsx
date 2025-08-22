import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  to: string;
}

const Button = function ({ children, to }: ButtonProps) {
  return (
    <div className="relative inline-block">
      <img src="/Icons/Button.svg" alt="" />
      <Link
        to={to}
        className="absolute inset-0 flex items-center justify-center text-white font-bold text-[14px]"
      >
        {children}
      </Link>
    </div>
  );
};

export default Button;
