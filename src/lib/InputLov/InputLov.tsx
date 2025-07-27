import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, Loader2, Check } from "lucide-react";

export interface Option {
  label: string;
  value: string;
}
// A small delay (10ms) is used to ensure proper focus management during UI transitions.
const FOCUS_DELAY_MS = 10;
// A debounce delay for input changes to avoid excessive API calls.
const DEBOUNCE_DELAY_MS = 300;

export type InputSize = "sm" | "md" | "lg";

export type InputLovProps = {
  value?: Option | null;
  placeholder?: string;
  loadOptions: (inputValue: string) => Promise<Option[]>;
  size?: InputSize;
  className?: string;
  onChange?: (option: Option | null) => void;
  onCreateOption?: (inputValue: string) => void;
  disabled?: boolean;
  noOptionsMessage?: string;
  isClearable?: boolean;
  testId?: string;
};

const InputLov: React.FC<InputLovProps> = ({
  value,
  placeholder = "Search...",
  loadOptions,
  size = "md",
  className = "",
  onChange,
  onCreateOption,
  disabled = false,
  noOptionsMessage = "No results found",
  isClearable = true,
  testId = "input-lov",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-14 px-4 text-base",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!inputValue.trim()) {
      setOptions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timeoutId = setTimeout(() => {
      loadOptions(inputValue)
        .then(newOptions => {
          setOptions(newOptions);
          setLoading(false);
          setHighlightedIndex(-1);
        })
        .catch(() => {
          setOptions([]);
          setLoading(false);
        });
    }, DEBOUNCE_DELAY_MS);

    return () => {
      clearTimeout(timeoutId);
      setLoading(false);
    };
  }, [inputValue, loadOptions]);

  useEffect(() => {
    if (value && !isOpen) {
      setInputValue(value.label);
    }
  }, [value, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleOptionSelect = (option: Option) => {
    setInputValue(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    setOptions([]);

    if (onChange) {
      onChange(option);
    }
  };

  const handleAddNew = () => {
    if (onCreateOption && inputValue.trim()) {
      onCreateOption(inputValue.trim());
      setIsOpen(false);
      setHighlightedIndex(-1);
      setOptions([]);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setOptions([]);
    setIsOpen(false);
    if (onChange) {
      onChange(null);
    }
  };

  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setTimeout(() => inputRef.current?.focus(), FOCUS_DELAY_MS);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const totalItems = options.length + (shouldShowAddOption() ? 1 : 0);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev => (prev < totalItems - 1 ? prev + 1 : 0));
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : totalItems - 1));
        break;

      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          if (highlightedIndex < options.length) {
            handleOptionSelect(options[highlightedIndex]);
          } else if (shouldShowAddOption()) {
            handleAddNew();
          }
        }
        break;

      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const shouldShowAddOption = () => {
    return !loading && options.length === 0 && inputValue.trim() !== "" && onCreateOption;
  };

  const baseClasses = `
   w-full border border-amber-300 rounded-lg
   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
   transition-colors duration-200 bg-white
   ${sizes[size]}
   ${disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : ""}
   ${className}
 `;

  return (
    <div ref={containerRef} className="relative w-full" data-testid={`${testId}-container`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses} pr-20`}
          data-testid={`${testId}-input`}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
          {isClearable && value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-amber-600 hover:text-amber-800 transition-colors"
              data-testid={`${testId}-clear`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {loading && (
            <Loader2
              className="w-4 h-4 text-amber-500 animate-spin"
              data-testid={`${testId}-loading`}
            />
          )}

          <button
            type="button"
            onClick={handleTriggerClick}
            disabled={disabled}
            className="text-amber-600 hover:text-amber-800 transition-colors disabled:opacity-50"
            data-testid={`${testId}-open`}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white border border-amber-300 rounded-lg shadow-lg max-h-80 overflow-auto"
          data-testid={`${testId}-dropdown`}
        >
          {!loading && options.length === 0 && inputValue.trim() === "" && (
            <div
              className="px-4 py-6 text-center text-amber-700 text-sm"
              data-testid={`${testId}-empty-message`}
            >
              Start writing to search options...
            </div>
          )}

          {loading && (
            <div
              className="px-4 py-6 text-center text-amber-600"
              data-testid={`${testId}-loading-message`}
            >
              <Loader2 className="w-5 h-5 mx-auto mb-2 animate-spin" />
              <p className="text-sm">Loading...</p>
            </div>
          )}

          {!loading && options.length > 0 && (
            <div className="py-1">
              {options.map((option, index) => (
                <div
                  key={`${option.value}-${index}`}
                  data-testid={`${testId}-option-${index}`}
                  onClick={() => handleOptionSelect(option)}
                  className={`
                   relative flex items-center px-4 py-3 cursor-pointer text-sm transition-colors duration-150
                   ${
                     highlightedIndex === index
                       ? "bg-amber-100 text-amber-900"
                       : "text-gray-900 hover:bg-amber-50"
                   }
                 `}
                >
                  <Check
                    className={`mr-3 h-4 w-4 text-amber-600 ${
                      value?.value === option.value ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span className="truncate">{option.label}</span>
                </div>
              ))}
            </div>
          )}

          {!loading &&
            options.length === 0 &&
            inputValue.trim() !== "" &&
            !shouldShowAddOption() && (
              <div
                className="px-4 py-6 text-center text-amber-700 text-sm"
                data-testid={`${testId}-no-options`}
              >
                {noOptionsMessage}
              </div>
            )}

          {shouldShowAddOption() && (
            <div className="py-1 border-t border-amber-200">
              <div
                onClick={handleAddNew}
                className={`
                 relative flex items-center px-4 py-3 cursor-pointer text-sm transition-colors duration-150
                 ${
                   highlightedIndex === options.length
                     ? "bg-amber-100 text-amber-900"
                     : "text-amber-800 hover:bg-amber-50"
                 }
               `}
                data-testid={`${testId}-add-option`}
              >
                <Plus className="mr-3 h-4 w-4 text-amber-600" />
                <span>Add "{inputValue}"</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputLov;
