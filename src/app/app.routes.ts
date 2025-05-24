import { Routes } from '@angular/router';
import {WorkflowCreateComponent} from '../app/components/workflow-create/workflow-create.component'
export const routes: Routes = [
     { path: 'workflows/create', component: WorkflowCreateComponent },
  { path: '', redirectTo: 'workflows/create', pathMatch: 'full' }

];
