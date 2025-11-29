// Import and re-export all custom type definitions to ensure they're loaded
import './lucide-react';
import './button';
import './ui-components';

// Define a JSX namespace augmentation for React 19 compatibility
declare namespace JSX {
  interface ElementAttributesProperty {
    props: {};
  }
} 