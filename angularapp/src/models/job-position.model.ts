import { JobApplication } from "./job-application.model";

export interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  responsibilities: string;
  qualifications: string;
  applicationDeadline: Date;
  isClosed: boolean;
  applications?: JobApplication[];
}
