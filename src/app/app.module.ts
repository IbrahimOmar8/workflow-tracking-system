import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 



// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule ,MatCardActions  } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatLabel , MatFormField } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
 

import { AppComponent } from './app.component';
import { WorkflowCreateComponent } from './components/workflow-create/workflow-create.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkflowCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // ✅ required by Material
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([]), // or use your actual routes

    // Material modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule ,
    MatCardActions ,
    MatDividerModule ,
    MatLabel ,
    MatFormField,
    MatSelectModule ,
    MatIconModule,
    MatTooltipModule ,
    MatSnackBar ,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}