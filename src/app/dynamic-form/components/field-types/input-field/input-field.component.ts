import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/dynamic-form/models/field-config.interface';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Input() field!: FieldConfig;
  @Input() formGroup!: FormGroup;
  @Input() errors: string[] = [];

  onFieldChange(): void {
    if (this.field.onChange) {
      const value = this.formGroup.get(this.field.key)?.value;
      this.field.onChange(value, this.formGroup);
    }
  }
}
