import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../services/job.service'; // Import your job service

@Component({
  selector: 'app-job-posting-form',
  templateUrl: './job-posting-form.component.html',
  styleUrls: ['./job-posting-form.component.css']
})
export class JobPostingFormComponent implements OnInit {
  jobPostingForm: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {
    this.jobPostingForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      department: ['', [Validators.required, Validators.maxLength(100)]],
      location: ['', [Validators.required, Validators.maxLength(100)]],
      responsibilities: ['', [Validators.required]],
      qualifications: ['', [Validators.required]],
      applicationDeadline: ['', [Validators.required]]


    });
  }

  submitJobPosting() {
    if (this.jobPostingForm.valid) {
      const jobPostingData = this.jobPostingForm.value;
      console.log(jobPostingData);

      // Call the service method to create a new job position
      this.jobService.createJobPosition(jobPostingData).subscribe(
        (response) => {
          console.log('Job posting created successfully:', response);
          this.jobPostingForm.reset();
        },
        (error) => {
          console.error('Error creating job posting:', error);
        }
      );
    }
  }
}
