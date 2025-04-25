import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface DashboardHeaderProps {
  heading?: string;
  description?: string;
  children?: React.ReactNode;
  onMenuClick?: () => void;
}

export function DashboardHeader({
  heading,
  description,
  children,
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-2 px-4 py-3 border-b border-zinc-800 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center">
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-3 md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {heading && (
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">{heading}</h1>
            {description && (
              <p className="text-muted-foreground text-xs md:text-sm">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
          {children}
        </div>
      )}
    </div>
  );
} 