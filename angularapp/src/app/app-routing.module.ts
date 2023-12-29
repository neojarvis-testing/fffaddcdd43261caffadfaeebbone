import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { JobPostingFormComponent } from './job-posting-form/job-posting-form.component';
import { ViewJobApplicationsComponent } from './view-job-applications/view-job-applications.component';
import { ViewJobPostingsComponent } from './view-job-postings/view-job-postings.component';
import { RouterTestingModule } from '@angular/router/testing';


const routes: Routes = [
  { path: 'apply-job', component: JobApplicationsComponent },
  {path:'create-job', component:JobPostingFormComponent},
  {path:'applications',component: ViewJobApplicationsComponent},
  {path:'view-post',component: ViewJobPostingsComponent},
  { path: '', redirectTo: '/view-post', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterTestingModule.withRoutes([])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
