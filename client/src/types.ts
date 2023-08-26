export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
};

export enum ProjectStatus {
  NOT_STARTED = "Not started",
  IN_PROGRESS = "In progress",
  COMPLETED = "Completed",
}
