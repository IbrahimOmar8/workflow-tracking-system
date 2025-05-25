import { Component, Input, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../core/services/api.service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardTitle,MatCardHeader } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';


export interface ValidationLogEntry {
  id: string;
  processId:string;
  timestamp: Date; 
  stepName :string;
  message: string;
  IsSuccessful?: boolean; 
}

@Component({
  standalone:true,
  selector: 'app-validation-log',
  imports: [MatIcon,CommonModule,MatSpinner,MatLabel,MatFormField,MatCard,MatDivider,MatCardTitle,MatCardHeader,FormsModule],
  templateUrl: './validation-log.component.html',
  styleUrls: ['./validation-log.component.scss']
})
export class ValidationLogComponent implements OnInit {
  @Input() logs: ValidationLogEntry[] = [];
  @Input() workflowId?: string;
  @Input() showFilters = true;
  @Input() maxHeight = '400px';

  filteredLogs: ValidationLogEntry[] = [];
  selectedLevel: string = 'all';
  searchTerm: string = '';
  isLoading = false;

 

  constructor(private apiService : ApiService) {}

  ngOnInit(): void {
     this.apiService.getValidationLogs().subscribe({
      next: (data: any) => { 
        this.filteredLogs = data['$values'];
        this.isLoading = false;
      },
      error: (err) => {
       
        this.isLoading = false;
      },
    });;
  }

  ngOnChanges(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.logs];

     

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(log =>
        log.message.toLowerCase().includes(term) ||
        log.stepName?.toLowerCase().includes(term)  
      );
    }

   

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    this.filteredLogs = filtered;
  }

  onLevelChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  clearLogs(): void {
    this.logs = [];
    this.filteredLogs = [];
  }

  exportLogs(): void {
    const dataStr = JSON.stringify(this.filteredLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `validation-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
 

  refreshLogs(): void {
    this.isLoading = true;
    // Simulate loading - replace with actual service call
    setTimeout(() => {
      this.applyFilters();
      this.isLoading = false;
    }, 1000);
  }
}