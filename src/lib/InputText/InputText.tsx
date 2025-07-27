export type InputTextSize = "sm" | "md" | "lg";

export type InputTextType = "text" | "email" | "password" | "number" | "tel" | "url";

export interface InputTextProps {
  value?: string;
  placeholder?: string;
  size?: InputTextSize;
  className?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  type?: InputTextType;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  testId?: string;
}

const InputText: React.FC<InputTextProps> = ({
  value,
  placeholder,
  size = "md",
  className = "",
  onChange,
  disabled = false,
  readOnly = false,
  type = "text",
  testId = "input",
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-14 px-4 text-base",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  const baseClasses = `
    w-full border border-amber-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
    transition-colors duration-200 bg-white
    ${sizes[size]}
    ${disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : ""}
    ${readOnly ? "bg-gray-50 cursor-default" : ""}
    ${className}
  `;

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      disabled={disabled}
      readOnly={readOnly}
      className={baseClasses.trim()}
      data-testid={`${testId}-input`}
    />
  );
};

export default InputText;
