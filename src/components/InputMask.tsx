import { InputMask as ReactInputMask } from "@react-input/mask";

interface InputMaskProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; 
}

const InputMask = ({ value, onChange, error }: InputMaskProps) => {
  return (
    <div>
      <ReactInputMask
        mask="999-9-99-999999-9"
        replacement={{ 9: /\d/ }}
        placeholder="978-3-16-148410-0"
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        } focus:ring-blue-500 focus:border-blue-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputMask;