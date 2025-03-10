import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "danger" | "warning" | "success";
  type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = "primary", type = "button" }) => {
  const baseStyle = "px-4 py-2 rounded text-white transition";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600",
    danger: "bg-red-500 hover:bg-red-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
    success: "bg-green-500 hover:bg-green-600",
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
};

export default Button;