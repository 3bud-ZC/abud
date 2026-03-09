import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "purple" | "green" | "yellow" | "red" | "blue" | "gray";
  size?: "sm" | "md";
  className?: string;
}

const variantClasses = {
  default: "bg-[#1a1a2e] text-[#a0a0b8] border border-[#2a2a3e]",
  purple: "bg-purple-600/15 text-purple-400 border border-purple-600/30",
  green: "bg-green-500/15 text-green-400 border border-green-500/30",
  yellow: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  red: "bg-red-500/15 text-red-400 border border-red-500/30",
  blue: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  gray: "bg-gray-500/15 text-gray-400 border border-gray-500/30",
};

const sizeClasses = {
  sm: "text-xs px-2 py-0.5",
  md: "text-xs px-3 py-1",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
