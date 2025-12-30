import { Component } from '@angular/core';
import { FieldConfig, FormFieldConfig } from '../dynamic-form/models/field-config.interface';
import { Validators } from '@angular/forms';
import { FieldType } from '../dynamic-form/models/field-type.enum';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  submittedData: any = null;

  formFields: FormFieldConfig[] = [
    {
      type: 'group',
      key: 'personalInfo',
      className: 'row',
      fields: [
        {
          type: FieldType.INPUT,
          key: 'firstName',
          label: 'First Name',
          placeholder: 'Enter your first name',
          required: true,
          validators: [Validators.required, Validators.minLength(2)],
          validationMessages: {
            required: 'First name is required',
            minlength: 'First name must be at least 2 characters'
          },
          className: 'col-6'
        },
        {
          type: FieldType.INPUT,
          key: 'lastName',
          label: 'Last Name',
          placeholder: 'Enter your last name',
          required: true,
          validators: [Validators.required, Validators.minLength(2)],
          validationMessages: {
            required: 'Last name is required',
            minlength: 'Last name must be at least 2 characters'
          },
          className: 'col-6'
        }
      ]
    },
    {
      type: FieldType.EMAIL,
      key: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      inputType: 'email',
      required: true,
      validators: [Validators.required, Validators.email],
      validationMessages: {
        required: 'Email is required',
        email: 'Please enter a valid email address'
      },
      containerClass: 'col-12 md:col-6'
    },
    {
      type: FieldType.INPUT,
      key: 'phone',
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      inputType: 'tel',
      validators: [Validators.pattern(/^[0-9]{10}$/)],
      validationMessages: {
        pattern: 'Phone number must be 10 digits'
      },
      containerClass: 'col-12 md:col-6'
    },
    {
      type: FieldType.DATE,
      key: 'dateOfBirth',
      label: 'Date of Birth',
      placeholder: 'Select your date of birth',
      required: true,
      validators: [Validators.required],
      validationMessages: {
        required: 'Date of birth is required'
      },
      containerClass: 'col-12 md:col-6',
      onChange: (value, formGroup) => {
        const age = this.calculateAge(value);
        formGroup.patchValue({ age });
      },
    },
    {
      type: FieldType.NUMBER,
      key: 'age',
      label: 'Age',
      placeholder: 'Select your age',
      required: true,
      readonly: true,
      disabled: true,
      validators: [Validators.required],
      validationMessages: {
        required: 'Age is required'
      },
      containerClass: 'col-12 md:col-6'
    },
    {
      type: FieldType.SELECT,
      key: 'country',
      label: 'Country',
      placeholder: 'Select your country',
      required: true,
      validators: [Validators.required],
      validationMessages: {
        required: 'Country is required'
      },
      options: [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
        { label: 'India', value: 'in' },
        { label: 'Germany', value: 'de' }
      ],
      containerClass: 'col-12 md:col-6',
      onChange: (value, formGroup) => {
        console.log('Country changed to:', value);
      }
    },
    {
      type: FieldType.INPUT,
      key: 'pan',
      label: 'PAN Card Number',
      placeholder: 'Enter your PAN Card Number',
      required: false,
      validators: [Validators.required, Validators.pattern(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)],
      validationMessages: {
        required: 'PAN Card Number is required',
        pattern: 'Invalid PAN Card Number format'
      },
      containerClass: 'col-12 md:col-6',
      hideExpression: (model) => {
        const country = model['country'];
        return country !== 'in';
      }
    },
  ];

  initialValues = {
    country: 'in'
  };

  onFormSubmit(formData: any): void {
    console.log('Form Submitted:', formData);
    this.submittedData = formData;
  }

  onFormReset(): void {
    console.log('Form Reset');
    this.submittedData = null;
  }

  onValueChange(values: any): void {
    console.log('Form Values Changed:', values);
  }

  calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
