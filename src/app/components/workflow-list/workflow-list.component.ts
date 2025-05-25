import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Workflow } from '../../core/models/workflow.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';




@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatListModule,MatDividerModule,MatIcon,MatSpinner],
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
})
export class WorkflowListComponent implements OnInit {
  workflows: Workflow[] = [];
  isLoading = true;
  selectedWorkflow: Workflow | null = null; 
  error: string | null = null;

  constructor( private router: Router,
    private dialog: MatDialog,private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getWorkflows().subscribe({
      next: (data: any) => { 
        this.workflows = data['$values'];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load workflows';
        this.isLoading = false;
      },
    });
  }



showDetails(workflowId: string) {
  // Fetch workflow details by ID
 this.selectedWorkflow = this.workflows.find(w => w.id === workflowId) || null;
     
}

editWorkflow(workflowId: string ) {
  // Navigate to edit page or open edit dialog
  this.router.navigate(['/workflows/edit/', workflowId]);
}

deleteWorkflow(workflowId: string): void {
    // Simple confirmation using browser's confirm dialog
    const confirmed = confirm('Are you sure you want to delete this workflow? This action cannot be undone.');
    
    if (confirmed) {
      
      // For now, just remove from local array
      this.workflows = this.workflows.filter(w => w.id !== workflowId);
    }
  }



createWorkflow() {
  // Navigate to create workflow page
  this.router.navigate(['/workflows/create']);
}

closeDetails() {
  this.selectedWorkflow = null;
}

}