"use client";

import { ReactNode } from "react";

interface ButtonProps {
//   children: ReactNode;
//   className?: string;
//   appName?: string;
}

// export const Button = ({ children, className, appName }: ButtonProps) => {
export const Button = (props: ButtonProps) => {
  return (
    <button
    //   className={className}
    //   onClick={() => alert(`Hello from your ${appName} app!`)}
      onClick={() => alert(`Hello from your app!`)}
    >
        My Button
      {/* {children} */}
    </button>
  );
};
