import React from "react";
import { cva, type VariantProps } from "cva";

export const buttonVariants = cva("flex justify-center", {
  variants: {
    intent: {
      primary: ["inline-flex h-9 items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"],
      secondary: ["flex items-center gap-2 rounded-lg px-3 py-2 text-left text-neutral-400 transition hover:bg-neutral-900/60 hover:text-neutral-100"],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
    disabled: {
      false: null,
      true: ["opacity-50", "cursor-not-allowed"],
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      disabled: false,
      class: "hover:bg-blue-600",
    },
    {
      intent: "secondary",
      disabled: false,
      class: "hover:bg-gray-100",
    },
    { intent: "primary", size: "medium", class: "uppercase" },
  ],
  defaultVariants: {
    disabled: false,
    intent: "primary",
    size: "medium",
  },
});

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  disabled,
  ...props
}) => (
  <button
    className={buttonVariants({ intent, size, disabled, className })}
    disabled={disabled || undefined}
    {...props}
  />
);