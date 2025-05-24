export interface StartProcessRequest {
  workflowId: string;
  initiator: string;
}

export interface ExecuteStepRequest {
  processId: string;
  stepName: string;
  performedBy: string;
  action: string;
}

export interface Process {
  id: string;
  workflowId: string;
  initiator: string;
  status: string;
  steps: ProcessStep[];
}

export interface ProcessStep {
  stepName: string;
  performedBy: string;
  action: string;
  performedAt: string;
}
