interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  projects: Array<Project>;
  collaboratingProjects: Array<Project>;
  creationDate: Date;
  modificationDate: Date;
}
