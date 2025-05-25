// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet, RouterModule } from '@angular/router';

interface WorkflowStats {
  title: string;
  value: number;
  change: number;
  icon: string;
  color: string;
}

interface RecentWorkflow {
  name: string;
  status: string;
  progress: number;
  assignee: string;
  dueDate: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
     RouterOutlet,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTableModule,
    MatMenuModule
  ],
   templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  Math = Math;

  workflowStats: WorkflowStats[] = [
    {
      title: 'Active Workflows',
      value: 24,
      change: 12,
      icon: 'account_tree',
      color: '#667eea'
    },
    {
      title: 'Completed Tasks',
      value: 156,
      change: 8,
      icon: 'task_alt',
      color: '#28a745'
    },
    {
      title: 'Team Members',
      value: 18,
      change: 22,
      icon: 'group',
      color: '#17a2b8'
    },
    {
      title: 'Avg. Completion Time',
      value: 3.2,
      change: -15,
      icon: 'schedule',
      color: '#ffc107'
    }
  ];

  recentWorkflows: RecentWorkflow[] = [
    {
      name: 'Website Redesign Project',
      status: 'Active',
      progress: 75,
      assignee: 'Sarah Johnson',
      dueDate: 'Dec 15'
    },
    {
      name: 'Marketing Campaign Launch',
      status: 'Pending',
      progress: 45,
      assignee: 'Mike Chen',
      dueDate: 'Dec 20'
    },
    {
      name: 'Database Migration',
      status: 'Completed',
      progress: 100,
      assignee: 'Alex Rivera',
      dueDate: 'Dec 10'
    },
    {
      name: 'User Testing Phase',
      status: 'Active',
      progress: 60,
      assignee: 'Emma Davis',
      dueDate: 'Dec 18'
    }
  ];

  recentActivity = [
    {
      text: 'Sarah Johnson completed "UI Design Review" task',
      time: '2 hours ago',
      icon: 'check_circle',
      color: '#28a745'
    },
    {
      text: 'New workflow "Product Launch" was created',
      time: '4 hours ago',
      icon: 'add_circle',
      color: '#667eea'
    },
    {
      text: 'Mike Chen requested approval for budget review',
      time: '6 hours ago',
      icon: 'approval',
      color: '#ffc107'
    },
    {
      text: 'Team meeting scheduled for tomorrow at 2 PM',
      time: '1 day ago',
      icon: 'event',
      color: '#17a2b8'
    },
    {
      text: 'Emma Davis uploaded new project documents',
      time: '2 days ago',
      icon: 'upload_file',
      color: '#6c757d'
    }
  ];

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  }
}