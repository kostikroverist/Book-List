import React, { FC } from "react";
type InputProps = {
  label?: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}
const Input:FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div>
      {label && <label className="block font-semibold mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
