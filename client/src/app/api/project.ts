interface Project {
  id: number;
  name: string;
  description: string;
  owner: User;
  members: Array<User>;
  statuses: Array<Status>;
}
