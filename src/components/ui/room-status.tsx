import React from "react";
import { Clock, Play, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomStatusProps {
  status: "Aguardando" | "Em Andamento" | "Finalizado";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const RoomStatus: React.FC<RoomStatusProps> = ({
  status,
  size = "md",
  showText = true,
  className,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const getStatusConfig = () => {
    switch (status) {
      case "Aguardando":
        return {
          icon: Clock,
          color: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-700",
        };
      case "Em Andamento":
        return {
          icon: Play,
          color: "text-yellow-500",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-700",
        };
      case "Finalizado":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-700",
        };
      default:
        return {
          icon: Clock,
          color: "text-gray-500",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-700",
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  if (showText) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-2 py-1 rounded-full border",
          config.bgColor,
          config.borderColor,
          className
        )}
      >
        <IconComponent className={cn(sizeClasses[size], config.color)} />
        <span
          className={cn(textSizeClasses[size], "font-medium", config.textColor)}
        >
          {status}
        </span>
      </div>
    );
  }

  return (
    <IconComponent className={cn(sizeClasses[size], config.color, className)} />
  );
};
