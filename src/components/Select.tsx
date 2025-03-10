import React from "react";

interface SelectProps {
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, error }) => {
  return (
    <div>
      {label && <label className="block font-semibold mb-1">{label}</label>}
      <select
        className={`w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"}`}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Select;