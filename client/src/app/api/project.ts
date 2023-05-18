import { Status } from './status';
import { User } from './user';

export interface Project {
  id: number;
  name: string;
  description: string;
  owner: User;
  members: Array<User>;
  statuses: Array<Status>;
}
