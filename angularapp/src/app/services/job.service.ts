// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { JobPosition } from 'src/models/job-position.model';
// import { JobApplication } from 'src/models/job-application.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class JobService {
//   private apiUrl = 'https://localhost:7115/api/job'; // Replace with your API URL

//   constructor(private http: HttpClient) { }

//   // Get all job positions
//   getJobPositions(): Observable<JobPosition[]> {
//     return this.http.get<JobPosition[]>(`${this.apiUrl}/positions`);
//   }

//   // Delete a job position by ID
//   deleteJobPosition(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/positions/delete/${id}`);
//   }

//   // Create a new job position
//   createJobPosition(jobPosition: JobPosition): Observable<JobPosition> {
//     return this.http.post<JobPosition>(`${this.apiUrl}/position/add`, jobPosition);
//   }

//   // Get all job applications
//   getJobApplications(): Observable<JobApplication[]> {
//     return this.http.get<JobApplication[]>(`${this.apiUrl}/applications`);
//   }

//   // Apply for a job position
//   applyForJob(application: JobApplication): Observable<JobApplication> {
//     return this.http.post<JobApplication>(`${this.apiUrl}/application/add`, application);
//   }

//   updateApplicationStatus(applicationId: number, newStatus: string): Observable<any> {
//     const updateStatusUrl = `${this.apiUrl}/application/update/${applicationId}`;
//     return this.http.put(updateStatusUrl, { status: newStatus });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobPosition } from 'src/models/job-position.model';
import { JobApplication } from 'src/models/job-application.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  public apiUrl = 'https://localhost:7115/api/job'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Get all job positions
  getJobPostings(): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(`${this.apiUrl}/positions`);
  }

  // Get all job applications
  getJobApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.apiUrl}/applications`);
  }

  // Get job position titles for dropdown
  getPositionTitles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/position_title`);
  }

  // Create a new job position
  createJobPosition(jobPositionData: JobPosition): Observable<JobPosition> {
    return this.http.post<JobPosition>(`${this.apiUrl}/position/add`, jobPositionData);
  }

  // Apply for a job position
  applyForJob(jobApplicationData: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(`${this.apiUrl}/application/add`, jobApplicationData);
  }

  // Update the status of a job application
  updateApplicationStatus(applicationId: number,applicantName:string, newStatus: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/application/update/${applicationId}`, { applicantName:applicantName,status: newStatus });
  }

  // Mark a job posting as closed
  markJobAsClosed(jobId: number): Observable<JobPosition> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set the Content-Type header to JSON
    const requestBody = true; // Send boolean directly as the request body
    return this.http.put<JobPosition>(`${this.apiUrl}/position/update/${jobId}`, requestBody, { headers });
  }

  getTotalApplicantsByJobPositionId(jobPositionId: number): Observable<number> {
    const url = `${this.apiUrl}/applications/by-job-position?jobPositionId=${jobPositionId}`
    return this.http.get<number>(url);
  }
}

