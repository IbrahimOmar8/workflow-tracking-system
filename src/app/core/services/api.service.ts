import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  StartProcessRequest, ExecuteStepRequest, Process } from '../models/process.model';
import {Workflow } from '../models/workflow.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://localhost:7203/v1'; 

  constructor(private http: HttpClient) {}

  createWorkflow(workflow: Workflow): Observable<Workflow> {
    return this.http.post<Workflow>(`${this.baseUrl}/workflows`, workflow);
  }

updateWorkflow(id: string, workflow: Workflow) : Observable<Workflow> {
   return this.http.put<Workflow>(`${this.baseUrl}/workflows/${id}`, workflow);
}

getWorkflow(id: string) { 
   return this.http.get<Workflow>(`${this.baseUrl}/workflows/${id}`);
}


  getWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.baseUrl}/workflows`);
  }

  startProcess(request: StartProcessRequest): Observable<Process> {
    return this.http.post<Process>(`${this.baseUrl}/processes/start`, request);
  }

  executeStep(request: ExecuteStepRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/processes/execute`, request);
  }

  getProcesses(): Observable<Process[]> {
    return this.http.get<Process[]>(`${this.baseUrl}/processes`);
  }

  getValidationLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/processes/validations`);
  }


}
