import React, { ReactNode, FormHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Form content
   */
  children: ReactNode;
  
  /**
   * Whether the form is loading
   */
  isLoading?: boolean;
  
  /**
   * Whether the form has errors
   */
  hasErrors?: boolean;
  
  /**
   * Form layout
   */
  layout?: 'vertical' | 'horizontal';
  
  /**
   * Form width
   */
  width?: 'full' | 'auto';
  
  /**
   * Additional class name
   */
  className?: string;
}

export interface FormGroupProps {
  /**
   * Form group content
   */
  children: ReactNode;
  
  /**
   * Form group label
   */
  label?: string;
  
  /**
   * Form group helper text
   */
  helperText?: string;
  
  /**
   * Form group error message
   */
  error?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Form group layout
   */
  layout?: 'vertical' | 'horizontal';
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * ID for the form control
   */
  id?: string;
}

/**
 * Form component for collecting user input
 */
export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({
    children,
    isLoading = false,
    hasErrors = false,
    layout = 'vertical',
    width = 'full',
    className,
    ...props
  }, ref) => {
    return (
      <form
        ref={ref}
        className={cn(
          width === 'full' ? 'w-full' : '',
          isLoading ? 'opacity-70 pointer-events-none' : '',
          className
        )}
        aria-busy={isLoading}
        {...props}
      >
        <div className={cn(
          'space-y-4',
          layout === 'horizontal' ? 'sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-6' : ''
        )}>
          {children}
        </div>
      </form>
    );
  }
);

Form.displayName = 'Form';

/**
 * FormGroup component for grouping form controls with labels and error messages
 */
export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({
    children,
    label,
    helperText,
    error,
    required = false,
    layout = 'vertical',
    className,
    id,
  }, ref) => {
    // Generate a unique ID if not provided
    const fieldId = id || `field-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div
        ref={ref}
        className={cn(
          layout === 'vertical' ? 'space-y-2' : 'sm:grid sm:grid-cols-12 sm:gap-4 sm:items-start',
          className
        )}
      >
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(
              'block text-sm font-medium text-gray-700',
              layout === 'horizontal' ? 'sm:col-span-3 sm:mt-2' : '',
              error ? 'text-error' : ''
            )}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <div className={layout === 'horizontal' ? 'sm:col-span-9' : ''}>
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                id: fieldId,
                'aria-invalid': error ? 'true' : undefined,
                'aria-describedby': error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined,
              });
            }
            return child;
          })}
          
          {(error || helperText) && (
            <div className="mt-1">
              {error ? (
                <p id={`${fieldId}-error`} className="text-sm text-error" role="alert">
                  {error}
                </p>
              ) : helperText ? (
                <p id={`${fieldId}-helper`} className="text-sm text-gray-500">
                  {helperText}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup';

export default Object.assign(Form, {
  Group: FormGroup
});