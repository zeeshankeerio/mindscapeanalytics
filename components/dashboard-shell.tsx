import React from 'react';
import { cn } from "@/lib/utils";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("flex-1 overflow-hidden", className)} {...props}>
      <div className="flex-1 overflow-auto p-4 md:p-6">
        {children}
      </div>
    </div>
  );
} 