import { 
  Component, 
  Input, 
  OnInit, 
  ViewChild, 
  ViewContainerRef, 
  ComponentRef,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { FieldRegistryService } from '../../services/field-registry.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-dynamic-field',
  template: `
    <div *ngIf="!isHidden" [class]="field.className">
      <ng-template #fieldContainer></ng-template>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 1.5rem;
    }
  `]
})
export class DynamicFieldComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() field!: FieldConfig;
  @Input() formGroup!: FormGroup;
  
  @ViewChild('fieldContainer', { read: ViewContainerRef })
  fieldContainer!: ViewContainerRef;
  
  private componentRef?: ComponentRef<any>;
  
  get isHidden(): boolean {
    if (this.field.hideExpression) {
      return this.field.hideExpression(this.formGroup.value);
    }
    return false;
  }

  constructor(
    private fieldRegistry: FieldRegistryService,
    private validationService: ValidationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Don't create component here anymore
  }

  ngAfterViewInit(): void {
    // Create component after view is initialized
    this.createFieldComponent();
    this.subscribeToValueChanges();
    // Trigger change detection after creating component
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private createFieldComponent(): void {
    const componentType = this.fieldRegistry.getFieldComponent(this.field.type);
    
    if (!componentType) {
      console.error(`No component found for field type: ${this.field.type}`);
      return;
    }

    if (!this.fieldContainer) {
      console.error('Field container is not available');
      return;
    }

    this.fieldContainer.clear();
    this.componentRef = this.fieldContainer.createComponent(componentType);
    
    // Pass inputs to the component
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.formGroup = this.formGroup;
    this.updateErrors();
  }

  private subscribeToValueChanges(): void {
    const control = this.formGroup.get(this.field.key);
    
    if (control) {
      control.statusChanges.subscribe(() => {
        this.updateErrors();
      });
    }
  }

  private updateErrors(): void {
    if (this.componentRef) {
      const control = this.formGroup.get(this.field.key);
      if (control) {
        this.componentRef.instance.errors = this.validationService.getControlErrors(
          control,
          this.field.validationMessages
        );
      }
    }
  }
}