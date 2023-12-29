import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service'; // Import your job service
import { JobApplication } from 'src/models/job-application.model'; // Import the job application model

@Component({
  selector: 'app-view-job-applications',
  templateUrl: './view-job-applications.component.html',
  styleUrls: ['./view-job-applications.component.css']
})
export class ViewJobApplicationsComponent implements OnInit {
  jobApplications: JobApplication[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {

    this.loadJobApplications();
  }

  loadJobApplications() {
    // Call the service method to get job applications
    this.jobService.getJobApplications().subscribe(
      (data: JobApplication[]) => {
        this.jobApplications = data;
    console.log(this.jobApplications);


      },
      (error) => {
        console.error('Error loading job applications:', error);
      }
    );

  }

  changeStatus(applicationId: number,applicantName:string, status: string) {
    // Call the service method to update the application status
    console.log(status);


    this.jobService.updateApplicationStatus(applicationId,applicantName, status).subscribe(
      () => {
        // Application status updated, reload the list
        this.loadJobApplications();
      },
      (error) => {
        console.error('Error updating application status:', error);
      }
    );
  }
}
