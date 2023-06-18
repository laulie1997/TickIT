import { Project } from './project';

export interface Category {
  id?: number;
  name?: string;
  color?: string;
  project?: Project;
}
