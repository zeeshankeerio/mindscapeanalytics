import dynamic from 'next/dynamic';
import { Suspense, ReactElement } from 'react';

interface DynamicComponentProps {
  componentName: string;
  fallback?: ReactElement;
  [key: string]: any;
}

/**
 * A component that dynamically imports other components to reduce initial bundle size.
 * This is particularly useful for heavy components that aren't needed immediately.
 *
 * @param componentName The path to the component relative to the components directory
 * @param fallback Optional fallback UI to show while loading
 * @param props Props to pass to the dynamically loaded component
 */
const DynamicComponent: React.FC<DynamicComponentProps> = ({ 
  componentName, 
  fallback = <div className="min-h-[50px] animate-pulse bg-gray-200 rounded-md"></div>,
  ...props 
}) => {
  const Component = dynamic(() => 
    import(/* webpackChunkName: "[request]" */ `./${componentName}`)
      .then(mod => mod.default || mod), 
    { 
      loading: () => fallback as ReactElement,
      ssr: true,
      suspense: true
    }
  );

  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

/**
 * Helper function to create predefined dynamic components
 * This allows for better type checking and easier imports
 */
export const createDynamicComponent = <T extends object>(
  componentName: string, 
  options?: { 
    fallback?: ReactElement,
    ssr?: boolean 
  }
) => {
  return function DynamicImportedComponent(props: T) {
    return (
      <DynamicComponent 
        componentName={componentName} 
        fallback={options?.fallback} 
        {...props} 
      />
    );
  };
};

export default DynamicComponent; 