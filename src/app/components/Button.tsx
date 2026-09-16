import React from "react";
import { cva, type VariantProps } from "cva";

export const buttonVariants = cva("flex justify-center", {
  variants: {
    intent: {
      primary: ["inline-flex h-9 items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"],
      cancel: ["inline-flex h-9 items-center gap-2 rounded-full  bg-red-500/10 px-3 text-xs font-medium text-neutral-300 transition hover:bg-red-500/20"],
      secondary:["inline-flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 px-3 text-xs font-medium text-neutral-300 transition hover:border-neutral-700 hover:text-neutral-100"]
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
      intent: "cancel",
      disabled: false,
      class: "hover:bg-red-100",
    },
    { intent: "primary", size: "medium", class: "" },
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