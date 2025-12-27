import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DateFieldComponent } from './dynamic-form/components/field-types/date-field/date-field.component'
import { CardModule } from 'primeng/card';
import { InputFieldComponent } from './dynamic-form/components/field-types/input-field/input-field.component';
import { SelectFieldComponent } from './dynamic-form/components/field-types/select-field/select-field.component';
import { DynamicFormComponent } from './dynamic-form/components/dynamic-form/dynamic-form.component';
import { DynamicFieldComponent } from './dynamic-form/components/dynamic-field/dynamic-field.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFieldComponent,
    SelectFieldComponent,
    DateFieldComponent,
    DynamicFieldComponent,
    DynamicFormComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    RadioButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
