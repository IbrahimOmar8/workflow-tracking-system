import { Routes } from '@angular/router';
import {WorkflowCreateComponent} from '../app/components/workflow-create/workflow-create.component'
import { HomeComponent } from './components/home/home.component';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';
import { ValidationLogComponent } from './components/validation-log/validation-log.component';
export const routes: Routes = [
     
  
  { path: 'workflows/create', component: WorkflowCreateComponent }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'workflows', component: WorkflowListComponent},
  { path: 'workflows/edit/:id', component: WorkflowCreateComponent }, // Add this route for editing
   { path: 'ValidationLog', component: ValidationLogComponent},

  // { path: 'tasks', loadComponent: () => import('./tasks/tasks.component').then(m => m.TasksComponent) },
  // { path: 'analytics', loadComponent: () => import('./analytics/analytics.component').then(m => m.AnalyticsComponent) },
  // { path: 'team', loadComponent: () => import('./team/team.component').then(m => m.TeamComponent) },
  // { path: 'templates', loadComponent: () => import('./templates/templates.component').then(m => m.TemplatesComponent) },
  // { path: 'integrations', loadComponent: () => import('./integrations/integrations.component').then(m => m.IntegrationsComponent) },
  // { path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
  { path: '**', redirectTo: '/home' }

];
