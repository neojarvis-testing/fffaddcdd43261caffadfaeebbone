// import { Component, OnInit } from '@angular/core';
// import { JobService } from '../services/job.service'; // Import your job service
// import { JobPosition } from 'src/models/job-position.model'; // Import the job position model

// @Component({
//   selector: 'app-view-job-postings',
//   templateUrl: './view-job-postings.component.html',
//   styleUrls: ['./view-job-postings.component.css']
// })
// export class ViewJobPostingsComponent implements OnInit {
//   jobPostings: JobPosition[] = [];
//   isMarkClosedDisabled = true; // Initialize as disabled by default


//   totalApplicantsMap: { [key: number]: number } = {}; // Store total applicants by job posting ID


//   constructor(private jobService: JobService) { }

//   ngOnInit(): void {
//     this.loadJobPostings();
//   }

//   loadJobPostings() {
//     // Call the service method to get job postings
//     this.jobService.getJobPostings().subscribe(
//       (data: JobPosition[]) => {
//         this.jobPostings = data;
//         this.jobPostings.forEach((posting) => {
//           this.totalApplicantsMap[posting.id] = 0;
//         });

//         // Fetch total applicants for each job posting
//         this.fetchTotalApplicants();
//       },
//       (error) => {
//         console.error('Error loading job postings:', error);
//       }
//     );
//   }

//   fetchTotalApplicants() {
//     this.jobPostings.forEach((posting) => {
//       this.jobService.getTotalApplicantsByJobPositionId(posting.id).subscribe((totalApplicants) => {
//         this.totalApplicantsMap[posting.id] = totalApplicants;
//         console.log(posting.isClosed);

//         if (!posting.isClosed) {
//           this.isMarkClosedDisabled = true; // Button is disabled
//         } else {
//           this.isMarkClosedDisabled = false; // Button is enabled
//         }
//         // console.log(this.totalApplicantsMap[posting.id]);

//       });
//       console.log(this.isMarkClosedDisabled);

//     }

//     );
//   }

//   // checkMarkClosedDisabled() {
//   //   // Example logic, you should replace this with your actual logic
//   //   if (this.jobPostings.) {
//   //     this.isMarkClosedDisabled = true; // Button is disabled
//   //   } else {
//   //     this.isMarkClosedDisabled = false; // Button is enabled
//   //   }
//   // }

//   markAsClosed(jobId: number) {
//     // Call the service method to mark a job posting as closed
//     this.jobService.markJobAsClosed(jobId).subscribe(
//       () => {
//         // Job posting marked as closed, reload the list
//         this.loadJobPostings();
//       },
//       (error) => {
//         console.error('Error marking job posting as closed:', error);
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { JobPosition } from 'src/models/job-position.model';

@Component({
  selector: 'app-view-job-postings',
  templateUrl: './view-job-postings.component.html',
  styleUrls: ['./view-job-postings.component.css']
})
export class ViewJobPostingsComponent implements OnInit {
  jobPostings: JobPosition[] = [];
  isMarkClosedDisabled: boolean[] = []; // Store the disabled state for each job posting
  totalApplicantsMap: { [key: number]: number } = {};

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadJobPostings();
  }

  loadJobPostings() {
    this.jobService.getJobPostings().subscribe(
      (data: JobPosition[]) => {
        this.jobPostings = data;
        this.jobPostings.forEach((posting) => {
          this.totalApplicantsMap[posting.id] = 0;
          this.isMarkClosedDisabled[posting.id] = posting.isClosed; // Set the disabled state
        });
        this.fetchTotalApplicants();
      },
      (error) => {
        console.error('Error loading job postings:', error);
      }
    );
  }

  fetchTotalApplicants() {
    this.jobPostings.forEach((posting) => {
      this.jobService.getTotalApplicantsByJobPositionId(posting.id).subscribe((totalApplicants) => {
        this.totalApplicantsMap[posting.id] = totalApplicants;
        console.log(posting.isClosed);

        if (posting.isClosed) {
          this.isMarkClosedDisabled[posting.id] = true; // Button is disabled
        } else {
          this.isMarkClosedDisabled[posting.id] = false; // Button is enabled
        }
      });
      console.log(this.isMarkClosedDisabled);
    });
  }

  markAsClosed(jobId: number) {
    this.jobService.markJobAsClosed(jobId).subscribe(
      () => {
        this.loadJobPostings();
      },
      (error) => {
        console.error('Error marking job posting as closed:', error);
      }
    );
  }
}
