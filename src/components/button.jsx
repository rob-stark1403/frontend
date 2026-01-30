import React from "react";
import clsx from "clsx";

/**
 * MedLink AI Button Component
 * 
 * A comprehensive button component with multiple variants, sizes, and states
 * following the MedLink AI design system for medical/healthcare applications.
 * 
 * @param {React.ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {string} type - HTML button type (button, submit, reset)
 * @param {string} variant - Button style variant
 * @param {string} size - Button size (sm, md, lg)
 * @param {boolean} disabled - Disabled state
 * @param {boolean} fullWidth - Full width button
 * @param {boolean} loading - Loading state
 * @param {React.ReactNode} leftIcon - Icon to display on the left
 * @param {React.ReactNode} rightIcon - Icon to display on the right
 */
export const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  size = "md",
  disabled = false,
  fullWidth = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  className = "",
  ...props 
}) => {
  // Base button styles - foundational classes that apply to all variants
  const baseStyles = clsx(
    // Display & Layout
    "inline-flex items-center justify-center gap-2",
    
    // Typography
    "font-medium text-center",
    "leading-tight tracking-normal",
    
    // Transitions & Animations
    "transition-all duration-200 ease-in-out",
    "transform active:scale-95",
    
    // Focus State (accessibility)
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    
    // Cursor & User Interaction
    "cursor-pointer select-none",
    "whitespace-nowrap",
    
    // Disabled State
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "disabled:shadow-none disabled:transform-none",
    
    // Width
    fullWidth && "w-full"
  );

  // Size variants - control padding, font size, and icon sizing
  const sizeStyles = {
    sm: clsx(
      "px-3 py-1.5",
      "text-sm",
      "rounded-md",
      "gap-1.5",
      "[&_svg]:w-4 [&_svg]:h-4"
    ),
    md: clsx(
      "px-4 py-2.5",
      "text-base",
      "rounded-lg",
      "gap-2",
      "[&_svg]:w-5 [&_svg]:h-5"
    ),
    lg: clsx(
      "px-6 py-3.5",
      "text-lg",
      "rounded-lg",
      "gap-2.5",
      "[&_svg]:w-6 [&_svg]:h-6"
    ),
  };

  // Variant styles - different button appearances for various contexts
  const variantStyles = {
    // Primary: Main call-to-action buttons (medical blue theme)
    primary: clsx(
      "bg-gradient-to-r from-blue-600 to-blue-700",
      "text-white",
      "shadow-md shadow-blue-500/20",
      "hover:from-blue-700 hover:to-blue-800",
      "hover:shadow-lg hover:shadow-blue-500/30",
      "hover:-translate-y-0.5",
      "focus:ring-blue-500",
      "active:from-blue-800 active:to-blue-900"
    ),
    
    // Secondary: Alternative actions (green/health theme)
    secondary: clsx(
      "bg-gradient-to-r from-emerald-600 to-emerald-700",
      "text-white",
      "shadow-md shadow-emerald-500/20",
      "hover:from-emerald-700 hover:to-emerald-800",
      "hover:shadow-lg hover:shadow-emerald-500/30",
      "hover:-translate-y-0.5",
      "focus:ring-emerald-500",
      "active:from-emerald-800 active:to-emerald-900"
    ),
    
    // Outline: Subtle actions with border emphasis
    outline: clsx(
      "bg-white dark:bg-slate-900",
      "text-blue-700 dark:text-blue-400",
      "border-2 border-blue-600 dark:border-blue-500",
      "shadow-sm",
      "hover:bg-blue-50 dark:hover:bg-blue-950/50",
      "hover:border-blue-700 dark:hover:border-blue-400",
      "hover:shadow-md",
      "focus:ring-blue-500"
    ),
    
    // Ghost: Minimal, text-only buttons
    ghost: clsx(
      "bg-transparent",
      "text-slate-700 dark:text-slate-300",
      "hover:bg-slate-100 dark:hover:bg-slate-800",
      "hover:text-slate-900 dark:hover:text-slate-100",
      "focus:ring-slate-400"
    ),
    
    // Danger: Destructive or critical actions (medical alert red)
    danger: clsx(
      "bg-gradient-to-r from-red-600 to-red-700",
      "text-white",
      "shadow-md shadow-red-500/20",
      "hover:from-red-700 hover:to-red-800",
      "hover:shadow-lg hover:shadow-red-500/30",
      "hover:-translate-y-0.5",
      "focus:ring-red-500",
      "active:from-red-800 active:to-red-900"
    ),
    
    // Success: Positive confirmation actions
    success: clsx(
      "bg-gradient-to-r from-green-600 to-green-700",
      "text-white",
      "shadow-md shadow-green-500/20",
      "hover:from-green-700 hover:to-green-800",
      "hover:shadow-lg hover:shadow-green-500/30",
      "hover:-translate-y-0.5",
      "focus:ring-green-500",
      "active:from-green-800 active:to-green-900"
    ),
    
    // Warning: Caution or intermediate actions
    warning: clsx(
      "bg-gradient-to-r from-amber-600 to-amber-700",
      "text-white",
      "shadow-md shadow-amber-500/20",
      "hover:from-amber-700 hover:to-amber-800",
      "hover:shadow-lg hover:shadow-amber-500/30",
      "hover:-translate-y-0.5",
      "focus:ring-amber-500",
      "active:from-amber-800 active:to-amber-900"
    ),
    
    // Medical: Healthcare-specific accent (purple/medical tech)
    medical: clsx(
      "bg-gradient-to-r from-purple-600 to-purple-700",
      "text-white",
      "shadow-md shadow-purple-500/20",
      "hover:from-purple-700 hover:to-purple-800",
      "hover:shadow-lg hover:shadow-purple-500/30",
      "hover:-translate-y-0.5",
      "focus:ring-purple-500",
      "active:from-purple-800 active:to-purple-900"
    ),
  };

  // Combine all styles
  const buttonClasses = clsx(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className // Allow custom classes to override
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {/* Left icon */}
      {leftIcon && !loading && (
        <span className="inline-flex items-center">
          {leftIcon}
        </span>
      )}
      
      {/* Button content */}
      <span className="inline-flex items-center">
        {children}
      </span>
      
      {/* Right icon */}
      {rightIcon && !loading && (
        <span className="inline-flex items-center">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;