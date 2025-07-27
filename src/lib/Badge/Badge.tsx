import type { PropsWithChildren, ReactNode } from "react";

export type BadgeVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";

export type BadgeSize = "sm" | "lg";

export type IconPosition = "left" | "right";

export interface BadgeBaseProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  testId?: string;
}

export type BadgeProps = PropsWithChildren<BadgeBaseProps>;

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "sm",
  className = "",
  icon,
  iconPosition = "left",
  testId = "badge",
}) => {
  const variants = {
    primary: "bg-amber-900 text-amber-50",
    secondary: "bg-[#e6dbcb] text-amber-900",
    outline: "bg-transparent text-amber-900 border border-amber-300",
    ghost: "bg-amber-100 text-amber-800",
    danger: "bg-red-800 text-red-50",
    success: "bg-emerald-800 text-emerald-50",
  };

  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm",
  };

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-full
    ${sizes[size]}
    ${variants[variant]}
    ${className}
  `;

  return (
    <span className={baseClasses.trim()} data-testid={testId}>
      {icon && iconPosition === "left" && <span className="mr-1">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-1">{icon}</span>}
    </span>
  );
};

export default Badge;
