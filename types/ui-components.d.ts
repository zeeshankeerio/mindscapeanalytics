import React from 'react';

// Fix for Badge component in React 19
/*
declare module '@/components/ui/badge' {
  export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }

  export const Badge: React.ForwardRefExoticComponent<
    BadgeProps & React.RefAttributes<HTMLDivElement>
  >;
}
*/

// Fix for Card components in React 19
/*
declare module '@/components/ui/card' {
  export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

  export const Card: React.ForwardRefExoticComponent<
    CardProps & React.RefAttributes<HTMLDivElement>
  >;

  export const CardHeader: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >;

  export const CardTitle: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>
  >;

  export const CardDescription: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>
  >;

  export const CardContent: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >;

  export const CardFooter: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >;
}
*/

// Fix for Tabs components in React 19
/*
declare module '@/components/ui/tabs' {
  export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
  }

  export const Tabs: React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  >;

  export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

  export const TabsList: React.ForwardRefExoticComponent<
    TabsListProps & React.RefAttributes<HTMLDivElement>
  >;

  export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
  }

  export const TabsTrigger: React.ForwardRefExoticComponent<
    TabsTriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
  }

  export const TabsContent: React.ForwardRefExoticComponent<
    TabsContentProps & React.RefAttributes<HTMLDivElement>
  >;
}
*/

// Fix for Tooltip components in React 19
/*
declare module '@/components/ui/tooltip' {
  export interface TooltipProps {
    delayDuration?: number;
    skipDelayDuration?: number;
    disableHoverableContent?: boolean;
    children: React.ReactNode;
  }

  export const Tooltip: React.FC<TooltipProps>;

  export interface TooltipProviderProps {
    delayDuration?: number;
    skipDelayDuration?: number;
    disableHoverableContent?: boolean;
    children: React.ReactNode;
  }

  export const TooltipProvider: React.FC<TooltipProviderProps>;

  export interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
  }

  export const TooltipTrigger: React.ForwardRefExoticComponent<
    TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

  export const TooltipContent: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >;
}
*/

// Fix for Slider component in React 19
/*
declare module '@/components/ui/slider' {
  export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
    min?: number;
    max?: number;
    step?: number;
    value?: number[];
    defaultValue?: number[];
    onValueChange?: (value: number[]) => void;
  }

  export const Slider: React.ForwardRefExoticComponent<
    SliderProps & React.RefAttributes<HTMLDivElement>
  >;
}
*/

// Fix for Textarea component in React 19
/*
declare module '@/components/ui/textarea' {
  export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

  export const Textarea: React.ForwardRefExoticComponent<
    TextareaProps & React.RefAttributes<HTMLTextAreaElement>
  >;
}
*/

// Fix for Switch component in React 19
/*
declare module '@/components/ui/switch' {
  export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }

  export const Switch: React.ForwardRefExoticComponent<
    SwitchProps & React.RefAttributes<HTMLButtonElement>
  >;
}
*/

// Fix for Label component in React 19
/*
declare module '@/components/ui/label' {
  export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
  }

  export const Label: React.ForwardRefExoticComponent<
    LabelProps & React.RefAttributes<HTMLLabelElement>
  >;
}
*/

// Fix for Progress component in React 19
/*
declare module '@/components/ui/progress' {
  export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
  }

  export const Progress: React.ForwardRefExoticComponent<
    ProgressProps & React.RefAttributes<HTMLDivElement>
  >;
}
*/ 