import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
