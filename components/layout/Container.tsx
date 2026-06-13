import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  size?: "standard" | "narrow" | "wide";
  className?: string;
}

const sizeClassName: Record<NonNullable<ContainerProps["size"]>, string> = {
  standard: "w-full max-w-[1200px] mx-auto px-5 md:px-10 lg:px-20",
  narrow: "w-full max-w-[720px] mx-auto px-5 md:px-10",
  wide: "w-full max-w-[1440px] mx-auto"
};

export function Container({ children, as: Component = "div", size = "standard", className = "" }: ContainerProps) {
  return <Component className={`${sizeClassName[size]} ${className}`}>{children}</Component>;
}
