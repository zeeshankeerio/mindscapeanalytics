/**
 * @deprecated This component is deprecated. Please use components/ui/dashboard-shell.tsx instead.
 * This file is maintained for backward compatibility and will be removed in a future version.
 */

import { DashboardShell as UIDashboardShell } from "@/components/ui/dashboard-shell";

// Re-export the modern DashboardShell to maintain backward compatibility
export const DashboardShell = UIDashboardShell;

// Display deprecation warning in development
if (process.env.NODE_ENV === 'development') {
  console.warn(
    'Warning: components/dashboard-shell.tsx is deprecated. ' +
    'Please use components/ui/dashboard-shell.tsx instead.'
  );
} 