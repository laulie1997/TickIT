import { Project } from './project';

export interface User {
  id?: number;
  name?: string;
  username?: string;
  surname?: string;
  email?: string;
  password?: string;

  projects?: Array<Project>;
  collaboratingProjects?: Array<Project>;
  creationDate?: Date;
  modificationDate?: Date;
}
