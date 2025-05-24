// workflow.model.ts

export type ActionType = 'input' | 'approve_reject' | 'review' | 'notification';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Category = 'approval' | 'review' | 'onboarding' | 'procurement' | 'hr' | 'finance' | 'it' | 'other';

export interface WorkflowStep {
  id?: string;
  stepName: string;
  assignedTo: string;
  actionType: ActionType;
  nextStep: string;
  requiresValidation?: boolean;
  description?: string;
  estimatedDuration?: string;
  isParallel?: boolean;
}

export interface Workflow {
  id?: string;
  name: string;
  description: string;
  priority: Priority;
  category: Category;
  steps: WorkflowStep[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
 // status?: 'draft' | 'active' | 'inactive' | 'archived';
}

// Additional interfaces for API responses and requests
export interface CreateWorkflowRequest {
  name: string;
  description: string;
  priority: Priority;
  category: Category;
  steps: WorkflowStep[];
}

export interface WorkflowResponse {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  category: Category;
  steps: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: 'draft' | 'active' | 'inactive' | 'archived';
}

export interface UpdateWorkflowRequest {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  category: Category;
  steps: WorkflowStep[];
}

// For dropdown options in the UI
export interface SelectOption {
  value: string;
  label: string;
}

export const ACTION_TYPE_OPTIONS: SelectOption[] = [
  { value: 'input', label: 'Input' },
  { value: 'approve_reject', label: 'Approve/Reject' },
  { value: 'review', label: 'Review' },
  { value: 'notification', label: 'Notification' }
];

export const PRIORITY_OPTIONS: SelectOption[] = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'urgent', label: 'Urgent' }
];

export const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'approval', label: 'Approval Process' },
  { value: 'review', label: 'Review Process' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'procurement', label: 'Procurement' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
  { value: 'it', label: 'IT Services' },
  { value: 'other', label: 'Other' }
];