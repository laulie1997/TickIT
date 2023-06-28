import { Project } from './project';
import { Status } from './status';
import { User } from './user';
import { Category } from './category';

export interface Ticket {
  id?: number;
  title?: string;
  description?: string;
  dueDate?: number;
  createdBy?: User;
  assignee?: User;
  project?: Project;
  status?: Status;
  creationDate?: Date;
  modificationDate?: Date;
  categories?: Category[];
}
