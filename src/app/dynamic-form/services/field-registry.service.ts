import { Injectable, Type } from '@angular/core';
import { FieldType } from '../models/field-type.enum';
import { DateFieldComponent } from '../components/field-types/date-field/date-field.component';
import { InputFieldComponent } from '../components/field-types/input-field/input-field.component';
import { SelectFieldComponent } from '../components/field-types/select-field/select-field.component';

@Injectable({
  providedIn: 'root'
})
export class FieldRegistryService {
  private fieldTypes: Map<FieldType, Type<any>> = new Map();

  constructor() {
    this.registerDefaultTypes();
  }

  private registerDefaultTypes(): void {
    this.fieldTypes.set(FieldType.INPUT, InputFieldComponent);
    this.fieldTypes.set(FieldType.EMAIL, InputFieldComponent);
    this.fieldTypes.set(FieldType.PASSWORD, InputFieldComponent);
    this.fieldTypes.set(FieldType.NUMBER, InputFieldComponent);
    this.fieldTypes.set(FieldType.SELECT, SelectFieldComponent);
    this.fieldTypes.set(FieldType.DATE, DateFieldComponent);
  }

  getFieldComponent(type: FieldType): Type<any> | undefined {
    return this.fieldTypes.get(type);
  }

  registerFieldType(type: FieldType, component: Type<any>): void {
    this.fieldTypes.set(type, component);
  }
}