import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { FieldType } from './field-type.enum';

export type FormFieldConfig = FieldConfig | FieldGroup;

export interface FieldGroup {
  type: 'group';
  key?: string;
  label?: string;
  className?: string;
  fields: FieldConfig[];
}
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
  asyncValidators?: AsyncValidatorFn[]; //Pending implementations

  options?: FieldOption[];  // For select, radio
  inputType?: string;       // For input fields (text, email, password, etc.)
  rows?: number;            // For textarea

  className?: string;
  styleClass?: string;
  containerClass?: string;

  hideExpression?: (model: any) => boolean;
  onChange?: (value: any, formGroup: any) => void;
}

export interface FieldOption {
  label: string;
  value: any;
  disabled?: boolean;
}