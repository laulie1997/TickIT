import { Project } from './project';

export interface Status {
  id?: number;
  name?: string;
  color?: string;
  icon?: string;
  project?: Project;
}
