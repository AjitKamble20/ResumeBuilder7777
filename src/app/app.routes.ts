import { Routes } from '@angular/router';
import { ResumeFormComponent } from './features/resume-form/resume-form.component';
import { ResumeListComponent } from './features/resume-list/resume-list.component';
import { ResumePreviewComponent } from './features/resume-preview/resume-preview.component';

export const routes: Routes = [ 
     { path: '', component: ResumeFormComponent },
  { path: 'resumes', component: ResumeListComponent },
  { path: 'preview/:id', component: ResumePreviewComponent }
];
