import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { 
  Workflow, 
  WorkflowStep, 
  CreateWorkflowRequest, 
  UpdateWorkflowRequest,
  ACTION_TYPE_OPTIONS, 
  PRIORITY_OPTIONS, 
  CATEGORY_OPTIONS,
  ActionType,
  Priority,
  Category
} from '../../core/models/workflow.model';



@Component({
  selector: 'app-workflow-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
   // MatSnackBar,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  templateUrl: './workflow-create.component.html',
  styleUrl: './workflow-create.component.scss'
})

export class WorkflowCreateComponent implements OnInit {
  workflowForm!: FormGroup;
  isEditMode = false;
  workflowId: string | null = null;
  currentWorkflow: Workflow | null = null;
  isLoading = false;
  isSubmitting = false;

  // Use the imported constants for consistency
  actionTypes = ACTION_TYPE_OPTIONS;
  priorityOptions = PRIORITY_OPTIONS;
  categoryOptions = CATEGORY_OPTIONS;

  // Status options for edit mode
  statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' }
  ];

  constructor(
    private fb: FormBuilder, 
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkRouteParams();
    this.initializeForm();
  }

  private checkRouteParams(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.workflowId = params['id'];
        this.loadWorkflowForEdit(params['id']);
      }
    });
  }

  private loadWorkflowForEdit(id: string): void {
    this.isLoading = true;
    
    this.api.getWorkflow(id).subscribe({
      next: (workflow: Workflow) => {
        this.currentWorkflow = workflow;
        this.populateFormWithWorkflow(workflow);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading workflow:', error);
        this.snackBar.open('Failed to load workflow for editing', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
        this.router.navigate(['/workflows']);
      }
    });
  }

  private populateFormWithWorkflow(workflow: Workflow): void {
    // Update form with workflow data
    this.workflowForm.patchValue({
      name: workflow.name,
      description: workflow.description,
      priority: workflow.priority,
      category: workflow.category,
    //  status: workflow.status || 'draft'
    });

    // Clear existing steps
    while (this.steps.length !== 0) {
      this.steps.removeAt(0);
    }

    // Add workflow steps
    if (workflow.steps && workflow.steps.length > 0) {
      workflow.steps.forEach(step => {
        this.steps.push(this.createStepGroupFromData(step));
      });
    } else {
      // Add at least one empty step
      this.addStep();
    }
  }

  private createStepGroupFromData(step: WorkflowStep): FormGroup {
    return this.fb.group({
      id: [step.id || ''],
      step_name: [step.stepName || '', [Validators.required, Validators.minLength(2)]],
      assigned_to: [step.assignedTo || '', Validators.required],
      action_type: [step.actionType || 'input', Validators.required],
      next_step: [step.nextStep || ''],
      requires_validation: [step.requiresValidation || false],
      description: [step.description || ''],
      estimated_duration: [step.estimatedDuration || ''],
      is_parallel: [step.isParallel || false]
    });
  }

  private initializeForm(): void {
    this.workflowForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      priority: ['medium', Validators.required],
      category: ['', Validators.required],
      status: ['draft'], // Only used in edit mode
      steps: this.fb.array([])
    });

    // Add initial step only if not in edit mode
    if (!this.isEditMode) {
      this.addStep();
    }
  }

  get steps(): FormArray {
    return this.workflowForm.get('steps') as FormArray;
  }

  get name() {
    return this.workflowForm.get('name');
  }

  get isFormValid(): boolean {
    return this.workflowForm.valid && this.steps.length > 0;
  }

  createStepGroup(): FormGroup {
    return this.fb.group({
      step_name: ['', [Validators.required, Validators.minLength(2)]],
      assigned_to: ['', Validators.required],
      action_type: ['input', Validators.required],
      next_step: [''],
      requires_validation: [false],
      description: [''],
      estimated_duration: [''],
      is_parallel: [false],
      status: ['pending'] // For edit mode
    });
  }

  addStep(): void {
    this.steps.push(this.createStepGroup());
  }

  removeStep(index: number): void {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    }
  }

  moveStepUp(index: number): void {
    if (index > 0) {
      const step = this.steps.at(index);
      this.steps.removeAt(index);
      this.steps.insert(index - 1, step);
    }
  }

  moveStepDown(index: number): void {
    if (index < this.steps.length - 1) {
      const step = this.steps.at(index);
      this.steps.removeAt(index);
      this.steps.insert(index + 1, step);
    }
  }

  onSubmit(): void {
    if (this.isFormValid) {
      this.isSubmitting = true;
      
      if (this.isEditMode) {
        this.updateWorkflow();
      } else {
        this.createWorkflow();
      }
    } else {
      this.markFormGroupTouched(this.workflowForm);
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
    }
  }

  private createWorkflow(): void {
    const formValue = this.workflowForm.value;
    
    const workflowRequest: CreateWorkflowRequest = {
      name: formValue.name,
      description: formValue.description,
      priority: formValue.priority as Priority,
      category: formValue.category as Category,
      steps: formValue.steps.map((step: any): WorkflowStep => ({
        stepName: step.step_name,
        assignedTo: step.assigned_to,
        actionType: step.action_type as ActionType,
        nextStep: step.next_step,
        requiresValidation: step.requires_validation || false,
        description: step.description || '',
        estimatedDuration: step.estimated_duration || '',
        isParallel: step.is_parallel || false
      }))
    };

    this.api.createWorkflow(workflowRequest).subscribe({
      next: (response) => {
        console.log('Workflow created:', response);
        this.snackBar.open('Workflow created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.resetForm();
        // Optionally navigate to the created workflow or workflows list
        // this.router.navigate(['/workflows', response.id]);
      },
      error: (err) => {
        console.error('Error creating workflow:', err);
        this.snackBar.open('Error creating workflow: ' + (err.message || 'Unknown error'), 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isSubmitting = false;
      }
    });
  }

  private updateWorkflow(): void {
    if (!this.workflowId || !this.currentWorkflow) {
      this.snackBar.open('Error: No workflow to update', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.isSubmitting = false;
      return;
    }

    const formValue = this.workflowForm.value;
    
    const updateRequest: UpdateWorkflowRequest = {
      id: this.workflowId,
      name: formValue.name,
      description: formValue.description,
      priority: formValue.priority as Priority,
      category: formValue.category as Category,
      steps: formValue.steps.map((step: any): WorkflowStep => ({
        id: step.id || undefined,
        stepName: step.step_name,
        assignedTo: step.assigned_to,
        actionType: step.action_type as ActionType,
        nextStep: step.next_step,
        requiresValidation: step.requires_validation || false,
        description: step.description || '',
        estimatedDuration: step.estimated_duration || '',
        isParallel: step.is_parallel || false
      }))
    };

    this.api.updateWorkflow(this.workflowId, updateRequest).subscribe({
      next: (response) => {
        console.log('Workflow updated:', response);
        this.currentWorkflow = response;
        this.snackBar.open('Workflow updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.isSubmitting = false;
        // Optionally navigate back to workflows list
        // this.router.navigate(['/workflows']);
      },
      error: (err) => {
        console.error('Error updating workflow:', err);
        this.snackBar.open('Error updating workflow: ' + (err.message || 'Unknown error'), 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isSubmitting = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((ctrl) => {
          if (ctrl instanceof FormGroup) {
            this.markFormGroupTouched(ctrl);
          }
        });
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.workflowForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  getStepFieldError(stepIndex: number, fieldName: string): string {
    const step = this.steps.at(stepIndex);
    const field = step?.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  resetForm(): void {
    if (this.isEditMode && this.currentWorkflow) {
      // Reset to original workflow data
      this.populateFormWithWorkflow(this.currentWorkflow);
    } else {
      // Reset to empty form
      this.workflowForm.reset({
        priority: 'medium',
        status: 'draft'
      });
      this.steps.clear();
      this.addStep();
    }
    this.isSubmitting = false;
  }

  goBack(): void {
    this.router.navigate(['/workflows']);
  }

  getPageTitle(): string {
    return this.isEditMode ? 'Update Workflow' : 'Create New Workflow';
  }

  getSubmitButtonText(): string {
    if (this.isSubmitting) {
      return this.isEditMode ? 'Updating...' : 'Creating...';
    }
    return this.isEditMode ? 'Update Workflow' : 'Create Workflow';
  }

  getStatusIcon(status: string): string {
    const statusIcons: { [key: string]: string } = {
      'draft': 'edit',
      'active': 'play_circle',
      'paused': 'pause_circle',
      'completed': 'check_circle',
      'archived': 'archive'
    };
    return statusIcons[status] || 'help';
  }

  getStatusLabel(status: string): string {
    return this.statusOptions.find(s => s.value === status)?.label || status;
  }

  getStepStatusLabel(status: string): string {
    const stepStatusLabels: { [key: string]: string } = {
      'pending': 'Pending',
      'in_progress': 'In Progress',
      'completed': 'Completed',
      'blocked': 'Blocked'
    };
    return stepStatusLabels[status] || 'Pending';
  }
}