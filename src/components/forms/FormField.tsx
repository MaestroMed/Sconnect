"use client";

import { forwardRef, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
  required?: boolean;
}

// Input Field
interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, required, className = "", ...props }, ref) => {
    return (
      <div>
        <label className="input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          className={`input-field ${error ? "input-error" : ""} ${className}`}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

// Select Field
interface SelectFieldProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, required, options, placeholder, className = "", ...props }, ref) => {
    return (
      <div>
        <label className="input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          ref={ref}
          className={`input-field ${error ? "input-error" : ""} ${className}`}
          aria-invalid={error ? "true" : "false"}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

// Textarea Field
interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, required, className = "", ...props }, ref) => {
    return (
      <div>
        <label className="input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          className={`input-field min-h-[120px] resize-y ${error ? "input-error" : ""} ${className}`}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";

// Checkbox Field
interface CheckboxFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            className={`mt-1 w-5 h-5 rounded border-dark-300 text-primary-600 focus:ring-primary-500 cursor-pointer ${className}`}
            {...props}
          />
          <span className="text-dark-700 group-hover:text-dark-900 transition-colors">
            {label}
          </span>
        </label>
        {error && <p className="error-message mt-1">{error}</p>}
      </div>
    );
  }
);

CheckboxField.displayName = "CheckboxField";

// Radio Group
interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  options: RadioOption[];
  error?: string;
  required?: boolean;
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ label, options, error, required, name, ...props }, ref) => {
    return (
      <div>
        <label className="input-label mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="space-y-3">
          {options.map((option, index) => (
            <label
              key={option.value}
              className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl border border-dark-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all"
            >
              <input
                ref={index === 0 ? ref : undefined}
                type="radio"
                name={name}
                value={option.value}
                className="mt-0.5 w-5 h-5 border-dark-300 text-primary-600 focus:ring-primary-500"
                {...props}
              />
              <div>
                <span className="font-medium text-dark-900">{option.label}</span>
                {option.description && (
                  <p className="text-sm text-dark-500 mt-0.5">{option.description}</p>
                )}
              </div>
            </label>
          ))}
        </div>
        {error && <p className="error-message mt-2">{error}</p>}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

// Checkbox Group (for multiple selection)
interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  error?: string;
  required?: boolean;
}

export function CheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  error,
  required,
}: CheckboxGroupProps) {
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter((v) => v !== value));
    }
  };

  return (
    <div>
      <label className="input-label mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer group p-4 rounded-xl border border-dark-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="w-5 h-5 rounded border-dark-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="font-medium text-dark-700 group-hover:text-dark-900 transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="error-message mt-2">{error}</p>}
    </div>
  );
}

