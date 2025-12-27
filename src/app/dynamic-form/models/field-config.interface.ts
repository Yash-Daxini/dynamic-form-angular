import { ValidatorFn } from '@angular/forms';
import { FieldType } from './field-type.enum';

export interface FieldConfig {
  type: FieldType;
  key: string;
  label?: string;
  placeholder?: string;
  value?: any;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  
  // Validation
  validators?: ValidatorFn[];
  validationMessages?: { [key: string]: string };
  
  // Field-specific options
  options?: FieldOption[];  // For select, radio
  inputType?: string;       // For input fields (text, email, password, etc.)
  rows?: number;            // For textarea
  
  // Styling and layout
  className?: string;
  styleClass?: string;
  containerClass?: string;
  
  // Conditional display
  hideExpression?: (model: any) => boolean;
  
  // Events
  onChange?: (value: any, formGroup: any) => void;
}

export interface FieldOption {
  label: string;
  value: any;
  disabled?: boolean;
}