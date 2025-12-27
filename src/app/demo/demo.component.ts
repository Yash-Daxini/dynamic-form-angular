import { Component } from '@angular/core';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { Validators } from '@angular/forms';
import { FieldType } from '../dynamic-form/models/field-type.enum';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  submittedData: any = null;

  formFields: FieldConfig[] = [
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
      containerClass: 'col-12 md:col-6'
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
      containerClass: 'col-12 md:col-6'
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
    // {
    //   type: FieldType.RADIO,
    //   key: 'gender',
    //   label: 'Gender',
    //   required: true,
    //   validators: [Validators.required],
    //   validationMessages: {
    //     required: 'Gender is required'
    //   },
    //   options: [
    //     { label: 'Male', value: 'male' },
    //     { label: 'Female', value: 'female' },
    //     { label: 'Other', value: 'other' }
    //   ],
    //   containerClass: 'col-12 md:col-6'
    // },
    // {
    //   type: FieldType.TEXTAREA,
    //   key: 'address',
    //   label: 'Address',
    //   placeholder: 'Enter your address',
    //   rows: 3,
    //   validators: [Validators.maxLength(200)],
    //   validationMessages: {
    //     maxlength: 'Address cannot exceed 200 characters'
    //   },
    //   containerClass: 'col-12'
    // },
    // {
    //   type: FieldType.CHECKBOX,
    //   key: 'newsletter',
    //   label: 'Subscribe to newsletter',
    //   value: false,
    //   containerClass: 'col-12 md:col-6'
    // },
    // {
    //   type: FieldType.CHECKBOX,
    //   key: 'terms',
    //   label: 'I agree to the terms and conditions',
    //   required: true,
    //   validators: [Validators.requiredTrue],
    //   validationMessages: {
    //     required: 'You must agree to the terms and conditions'
    //   },
    //   containerClass: 'col-12 md:col-6'
    // }
  ];

  initialValues = {
    newsletter: true
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
}
