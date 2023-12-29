import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {
  jobApplicationForm: FormGroup;
  jobPositions: any[] = []; // Populate this with job positions from your service

  constructor(private fb: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {
    this.jobApplicationForm = this.fb.group({
      jobPositionId: ['', Validators.required],
      applicantName: ['', Validators.required],
      status: ['pending']
      // Add other applicant details as needed
    });

    // Load job positions into the dropdown
    // this.loadJobPositions();
    this.jobService.getJobPostings().subscribe(
        (data: any[]) => {
          this.jobPositions = data;
        },
        (error) => {
          console.error('Error fetching job positions:', error);
        }
      );
      console.log(this.jobPositions);
  }

  loadJobPositions() {
    // Call the service method to get job positions and populate this.jobPositions
    this.jobService.getJobPostings().subscribe(
      (data: any[]) => {
        this.jobPositions = data;
      },
      (error) => {
        console.error('Error loading job positions:', error);
      }
    );
    console.log(this.jobPositions);

  }

  applyForJob() {
    if (this.jobApplicationForm.valid) {
      const jobApplicationData = this.jobApplicationForm.value;
      console.log(jobApplicationData);

      // Call the service method to apply for the job position
      this.jobService.applyForJob(jobApplicationData).subscribe(
        (response) => {
          console.log('Job application submitted successfully:', response);
          this.jobApplicationForm.reset();
        },
        (error) => {
          console.error('Error submitting job application:', error);
        }
      );
    }
  }
}
