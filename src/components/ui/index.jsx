"use client";
import { memo } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Loading Spinner component
 */
export function LoadingSpinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-2 border-white/20 border-t-teal-500 rounded-full animate-spin`}
      />
    </div>
  );
}

/**
 * Full page loading state
 */
export function LoadingPage({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-white/70">{message}</p>
    </div>
  );
}

/**
 * Glass card container with backdrop blur effect
 */
export const GlassCard = memo(function GlassCard({ 
  children, 
  className = "",
  padding = "p-6",
}) {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        rounded-2xl shadow-xl
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  );
});

/**
 * Form input component with consistent styling
 */
export const FormInput = memo(function FormInput({
  type = "text",
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  error = "",
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={name} className="text-xl text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          p-2 border-2 rounded-lg text-white bg-transparent
          w-full focus:outline-none focus:ring-0 focus:border-teal-600
          placeholder-white/40 transition-colors
          ${error ? "border-red-500" : "border-white/20"}
          ${className}
        `}
      />
      {error && <span className="text-red-400 text-sm">{error}</span>}
    </div>
  );
});

/**
 * Password input with toggle visibility
 */
export const PasswordInput = memo(function PasswordInput({
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  showPassword,
  onToggleVisibility,
  error = "",
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={name} className="text-xl text-white">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            p-2 pr-10 border-2 rounded-lg text-white bg-transparent
            w-full focus:outline-none focus:ring-0 focus:border-teal-600
            placeholder-white/40 transition-colors
            ${error ? "border-red-500" : "border-white/20"}
          `}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <span className="text-red-400 text-sm">{error}</span>}
    </div>
  );
});

/**
 * Primary button with loading state
 */
export const PrimaryButton = memo(function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative px-6 py-3 rounded-lg font-semibold
        bg-teal-500 text-black hover:bg-teal-400
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <LoadingSpinner size="sm" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
});

/**
 * Secondary/outline button
 */
export const SecondaryButton = memo(function SecondaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-semibold
        border-2 border-teal-500 text-white
        hover:bg-teal-500 hover:text-black
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
});

/**
 * Section heading component
 */
export const SectionHeading = memo(function SectionHeading({
  children,
  className = "",
  gradient = false,
}) {
  const baseClasses = "font-bold text-4xl md:text-5xl uppercase text-center state-wide";
  const colorClasses = gradient
    ? "bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
    : "text-white";

  return (
    <h2 className={`${baseClasses} ${colorClasses} ${className}`}>
      {children}
    </h2>
  );
});

/**
 * Page title component
 */
export const PageTitle = memo(function PageTitle({
  children,
  className = "",
}) {
  return (
    <h1 
      className={`
        race font-bold text-5xl md:text-7xl text-center 
        bg-clip-text text-transparent 
        bg-gradient-to-b from-neutral-50 to-neutral-400 
        w-full uppercase
        ${className}
      `}
    >
      {children}
    </h1>
  );
});

/**
 * Floating action button container
 */
export const FloatingButton = memo(function FloatingButton({
  children,
  onClick,
  ariaLabel,
  isActive = false,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-20 h-20 rounded-full 
        bg-black/40 backdrop-blur-md border border-white/20 
        text-white flex items-center justify-center 
        shadow-lg hover:bg-black/60 
        transition-all duration-300
        ${className}
      `}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
});

/**
 * Dropdown menu container
 */
export const DropdownMenu = memo(function DropdownMenu({
  children,
  isOpen,
  className = "",
}) {
  return (
    <div
      className={`
        absolute right-0 mt-2 w-48 p-2 rounded-xl shadow-2xl
        bg-black/60 backdrop-blur-xl border border-white/20
        transition-all duration-300 ease-in-out origin-top-right
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        ${className}
      `}
    >
      {children}
    </div>
  );
});

/**
 * Menu item for dropdowns
 */
export const MenuItem = memo(function MenuItem({
  children,
  onClick,
  href,
  className = "",
}) {
  const baseClasses = "px-4 py-2 text-white rounded-md hover:bg-white/10 transition-colors block text-left w-full";

  if (href) {
    return (
      <a href={href} onClick={onClick} className={`${baseClasses} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
});

/**
 * Alert/Warning banner
 */
export const AlertBanner = memo(function AlertBanner({
  children,
  type = "warning",
  className = "",
}) {
  const typeStyles = {
    warning: "bg-red-500/20 border-red-400 text-red-300",
    info: "bg-blue-500/20 border-blue-400 text-blue-300",
    success: "bg-green-500/20 border-green-400 text-green-300",
  };

  return (
    <div
      className={`
        px-4 py-2 rounded-lg border text-sm md:text-base
        ${typeStyles[type]}
        ${className}
      `}
    >
      {children}
    </div>
  );
});
