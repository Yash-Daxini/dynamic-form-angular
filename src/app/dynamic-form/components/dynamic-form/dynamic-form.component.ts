import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FieldConfig, FormFieldConfig, FieldGroup } from '../../models/field-config.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() fields: FormFieldConfig[] = [];
  @Input() initialValues: any = {};
  @Input() submitButtonText: string = 'Submit';
  @Input() resetButtonText: string = 'Reset';
  @Input() showResetButton: boolean = true;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formReset = new EventEmitter<void>();
  @Output() valueChanges = new EventEmitter<any>();

  formGroup!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.subscribeToFormChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): void {
    const group: any = {};

    this.fields.forEach(item => {
      if (this.isFieldGroup(item)) {
        // Process fields in group
        item.fields.forEach((field: any) => {
          this.addFieldToGroup(group, field);
        });
      } else {
        // Process regular field
        this.addFieldToGroup(group, item);
      }
    });

    this.formGroup = this.fb.group(group);
  }

  private addFieldToGroup(group: any, field: FieldConfig): void {
    const value = this.initialValues[field.key] ?? field.value ?? null;
    const validators = field.validators || [];
    const asyncValidators = field.asyncValidators || [];

    group[field.key] = new FormControl(
      { value, disabled: field.disabled || false },
      validators,
      asyncValidators
    );
  }

  private subscribeToFormChanges(): void {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(values => {
        this.valueChanges.emit(values);
      });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    } else {
      this.markAllAsTouched();
    }
  }

  onReset(): void {
    this.formGroup.reset();
    this.formReset.emit();
  }

  private markAllAsTouched(): void {
    Object.keys(this.formGroup.controls).forEach(key => {
      const control = this.formGroup.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  }

  get formValue(): any {
    return this.formGroup.value;
  }

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  patchValue(values: any): void {
    this.formGroup.patchValue(values);
  }

  resetForm(values?: any): void {
    if (values) {
      this.formGroup.reset(values);
    } else {
      this.formGroup.reset();
    }
  }

  isFieldGroup(field: FormFieldConfig): field is FieldGroup {
    return (field as FieldGroup).type === 'group';
  }

  isField(field: FormFieldConfig): field is FieldConfig {
    return !this.isFieldGroup(field);
  }
}
