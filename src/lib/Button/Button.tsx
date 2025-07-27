import type { PropsWithChildren, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type IconPosition = "left" | "right";

export type ButtonBaseProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  testId?: string;
};

export type ButtonProps = PropsWithChildren<ButtonBaseProps>;

const LoadingSpinner = () => {
  return (
    <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
  );
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  icon,
  iconPosition = "left",
  testId = "button",
}) => {
  const variants = {
    primary: "bg-amber-900 hover:bg-amber-800 text-amber-50 border-transparent shadow-sm",
    secondary: "bg-[#e6daca] hover:bg-[#deceb9] text-amber-900 border-transparent shadow-sm",
    outline:
      "bg-transparent hover:bg-amber-50 text-amber-900 border-amber-300 hover:border-amber-400",
    ghost: "bg-transparent hover:bg-amber-100 text-amber-800 border-transparent",
    danger: "bg-red-800 hover:bg-red-700 text-red-50 border-transparent shadow-sm",
    success: "bg-emerald-800 hover:bg-emerald-700 text-emerald-50 border-transparent shadow-sm",
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  const isDisabled = disabled || loading;
  const disabledStyles = isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-md border
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
    ${sizes[size]}
    ${variants[variant]}
    ${disabledStyles}
    ${className}
  `;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      data-testid={testId}
      type={"button"}
      className={baseClasses.trim()}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {!loading && icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
