import { Project } from './project';

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  projects: Array<Project>;
  collaboratingProjects: Array<Project>;
  creationDate: Date;
  modificationDate: Date;
}
