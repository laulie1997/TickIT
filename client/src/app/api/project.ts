import { Category } from './category';
import { Status } from './status';
import { Ticket } from './ticket';
import { User } from './user';

export interface Project {
  id?: number;
  name?: string;
  description?: string;
  owner?: User;
  members?: Array<User>;
  statuses?: Array<Status>;
  tickets?: Array<Ticket>;
  categories?: Array<Category>;
}
