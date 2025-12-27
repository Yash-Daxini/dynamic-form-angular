import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  
  private static readonly defaultMessages: { [key: string]: string } = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: 'Minimum length is {requiredLength} characters',
    maxlength: 'Maximum length is {requiredLength} characters',
    min: 'Minimum value is {min}',
    max: 'Maximum value is {max}',
    pattern: 'Please enter a valid format'
  };

  getValidatorErrorMessage(
    validatorName: string,
    validatorValue?: any,
    customMessages?: { [key: string]: string }
  ): string {
    // Check for custom message first
    if (customMessages && customMessages[validatorName]) {
      return this.interpolateMessage(
        customMessages[validatorName],
        validatorValue
      );
    }

    // Fall back to default message
    const message = ValidationService.defaultMessages[validatorName];
    return this.interpolateMessage(message || 'Invalid field', validatorValue);
  }

  private interpolateMessage(message: string, params?: any): string {
    if (!params) {
      return message;
    }

    return message.replace(/{(\w+)}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  getControlErrors(
    control: AbstractControl,
    customMessages?: { [key: string]: string }
  ): string[] {
    if (!control || !control.errors || !control.touched) {
      return [];
    }

    return Object.keys(control.errors).map(key =>
      this.getValidatorErrorMessage(key, control.errors![key], customMessages)
    );
  }
}