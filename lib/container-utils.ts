import { cn } from './utils';

/**
 * Returns appropriate container classes based on options
 * 
 * @param options Configuration options for the container
 * @returns Tailwind classes string for container styling
 */
export function getContainerClasses(options?: {
  fullWidth?: boolean;  // Whether to use full width or standard container
  noPadding?: boolean;  // Whether to apply padding or not
  className?: string;   // Additional classes to add
}) {
  // Always use fullWidth true regardless of input
  const { fullWidth = true, noPadding = false, className = '' } = options || {};
  
  return cn(
    // Base styling
    "relative w-full mx-auto box-border",
    
    // Set a max-width constraint for extra-large screens
    "max-w-[100%] min-w-[320px] xl:max-w-[1600px] 2xl:max-w-[1800px]",
    
    // Apply consistent horizontal padding that works well at all zoom levels
    !noPadding && "px-3 sm:px-4 md:px-6 lg:px-8",
    
    // Add any additional classes
    className
  );
} 