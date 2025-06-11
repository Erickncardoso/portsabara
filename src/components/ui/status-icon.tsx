import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusIconProps {
  status: "success" | "error" | "Sucesso" | "Falha" | "aprovado" | "rejeitado";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  size = "md",
  className,
}) => {
  const isSuccess =
    status === "success" || status === "Sucesso" || status === "aprovado";
  const isError =
    status === "error" || status === "Falha" || status === "rejeitado";

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  if (isSuccess) {
    return (
      <CheckCircle
        className={cn(sizeClasses[size], "text-green-500", className)}
      />
    );
  }

  if (isError) {
    return (
      <XCircle className={cn(sizeClasses[size], "text-red-500", className)} />
    );
  }

  return null;
};
