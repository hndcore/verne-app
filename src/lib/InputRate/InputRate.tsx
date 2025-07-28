import React from "react";
import { Star } from "lucide-react";

export type InputRateSize = "sm" | "md" | "lg";
const MAX_RATING = 5;

export type InputRateProps = {
  value?: number;
  editable?: boolean;
  size?: InputRateSize;
  className?: string;
  onChange?: (value: number) => void;
  disabled?: boolean;
  testId?: string;
  label?: string;
};

const InputRate: React.FC<InputRateProps> = ({
  value = 0,
  editable = false,
  size = "md",
  className = "",
  onChange,
  disabled = false,
  testId = "rating",
  label = "Rating",
}) => {
  const normalizedValue = Math.max(0, Math.min(MAX_RATING, Math.round(value)));

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const radioSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const handleChange = (newValue: number) => {
    if (onChange && !disabled) {
      onChange(newValue);
    }
  };

  if (!editable) {
    return (
      <div
        className={`flex items-center space-x-1 ${className}`}
        data-testid={`${testId}-readonly`}
        role="img"
        aria-label={`${label}: ${normalizedValue} of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map(starValue => (
          <Star
            key={starValue}
            className={`${sizes[size]} ${
              starValue <= normalizedValue
                ? "text-amber-400 fill-amber-400"
                : "text-gray-300 fill-gray-300"
            }`}
            data-testid={`${testId}-star-${starValue}`}
          />
        ))}
      </div>
    );
  }

  return (
    <fieldset
      className={`${className}`}
      disabled={disabled}
      data-testid={`${testId}-editable`}
      aria-label={label}
    >
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map(starValue => (
          <label
            key={starValue}
            className={`
              relative cursor-pointer ${radioSizes[size]} flex items-center justify-center
              rounded-lg border-2 transition-all duration-200
              ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-50"}
              ${
                normalizedValue >= starValue
                  ? "border-amber-500 bg-amber-100"
                  : "border-amber-200 bg-white hover:border-amber-300"
              }
            `}
            data-testid={`${testId}-option-${starValue}`}
            aria-label={`${label}: ${starValue} of 5 stars`}
          >
            <input
              type="radio"
              name={`${testId}-rating`}
              value={starValue}
              checked={normalizedValue === starValue}
              onChange={() => handleChange(starValue)}
              disabled={disabled}
              className="sr-only"
              data-testid={`${testId}-input-${starValue}`}
            />

            <Star
              className={`${sizes[size]} ${
                normalizedValue >= starValue ? "text-amber-500 fill-amber-500" : "text-amber-400"
              }`}
            />

            <span className="text-xs text-amber-700 font-medium mt-1">{starValue}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default InputRate;
