import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";

// Define variants, renaming 'size' to 'inputSize' to avoid conflict
const newInputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ",
  {
    variants: {
      variant: {
        default: "autofill-blue bg-blue-normal border-white-800 text-white-500 focus-visible:text-white focus-visible:border-white-800 selection:text-blue-normal selection:bg-white-800 caret-white-800",
        offWhite: "autofill-off-white bg-offWhite border-blue text-blue focus-visible:text-green focus-visible:border-white-800 selection:text-blue-off-white selection:bg-blue caret-blue"
      },
      inputSize: {
        default: "h-9 md:text-sm",
        sm: "h-8 text-sm",
        lg: "h-11 text-lg",
      },
      intent: {
        default: "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        error: "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      intent: "default",
      rounded: "default",
    },
  }
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof newInputVariants> {}

const NewInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, intent, rounded, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(newInputVariants({ variant, inputSize, intent, rounded }), className)}
        {...props}
      />
    );
  }
);

NewInput.displayName = "Input";


/**
 * Password input - 
 * 
 */
const NewPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, intent, rounded, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)
    return (
      <div className="relative">

      <input
        ref={ref}
        className={cn(newInputVariants({ variant, inputSize, intent, rounded }), className)}
        type={visible ? "text" : "password"}
        {...props}
      />

        {/* Toggle visibility button */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-off-white-inactive hover:text-off-white transition-colors"
        >
          {visible ? <FaEyeSlash className="size-6" /> : <FaEye className="size-6" />}
        </button>

      </div>
    );
  }
);

NewPassword.displayName = "Input";

export { NewInput, NewPassword };
