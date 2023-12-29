import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { JobService } from './services/job.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { JobPostingFormComponent } from './job-posting-form/job-posting-form.component';
import { ViewJobApplicationsComponent } from './view-job-applications/view-job-applications.component';
import { ViewJobPostingsComponent } from './view-job-postings/view-job-postings.component';


@NgModule({
  declarations: [
    AppComponent,
    JobApplicationsComponent,
    NavigationMenuComponent,
    JobPostingFormComponent,
    ViewJobApplicationsComponent,
    ViewJobPostingsComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule,ReactiveFormsModule],

  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
