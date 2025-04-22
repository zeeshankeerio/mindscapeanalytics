import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';

// Fix for Button component in React 19
declare module '@/components/ui/button' {
  export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
    asChild?: boolean;
  }

  export const Button: React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  >;
} 