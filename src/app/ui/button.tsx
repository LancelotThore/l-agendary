import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import React from "react";

const baseButtonClass = "inline-flex justify-center items-center gap-2.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

const buttonVariants = cva(baseButtonClass, {
  variants: {
    intent: {
      primary: "bg-btnBg text-btnFg hover:bg-btnBg/80 font-medium",
      secondary: "bg-btnPublic text-btnFgS font-medium hover:bg-btnPublic/80",
      public: "bg-btnPublic text-btnFgS hover:bg-btnPublic/80",
      private: "bg-btnPrivate text-btnFgS hover:bg-btnPrivate/80",
    },
    size: {
      verysmall: "py-1 px-2 h-8 text-sm",
      small: "py-2 px-4  h-8 text-sm",
      medium: "py-3 px-6  h-12 text-base",
      large: "py-3 px-10 h-12 text-lg",
    },
    rounde: {
      full: "rounded-full",
      md: "rounded-md",
      rd: "rounded-lg",
      nrd: "rounded-none",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
    rounde: "md",
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "public" | "private" |"secondary";
  size?: "verysmall" | "small" | "medium" | "large";
  rounde?: "full" | "md" | "rd" | "nrd";
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className, 
  intent,    
  size,    
  rounde,    
  children, 
  ...props   
}) => {
  const buttonClassNames = clsx(buttonVariants({ intent, size, rounde }), className);

  return (
    <button className={buttonClassNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
