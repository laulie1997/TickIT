import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/api/user';
import { ProjectService } from 'src/app/services/project/project.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserSelectionModalComponent } from '../user-selection-modal/user-selection-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/api/project';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.css'],
})
export class ProjectMembersComponent implements OnInit {
  @Input() projectId: number;
  projectMembers: User[];
  project: Project;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectService
      .getProjectMembers(this.projectId)
      .subscribe((members: User[]) => (this.projectMembers = members));
    this.projectService
      .getProject(this.projectId)
      .subscribe((project: Project) => (this.project = project));
  }

  openAddMembersModal() {
    const dialogRef = this.dialog.open(UserSelectionModalComponent, {
      height: '500px',
      width: '500px',
      data: this.projectMembers.map(member => member.id),
    });
    dialogRef
      .afterClosed()
      .subscribe((selectedUsers: User[]) =>
        this.projectMembers.push(...selectedUsers)
      );
  }

  removeProjectMember(userId: number) {
    this.projectMembers = this.projectMembers.filter(user => user.id != userId);
  }

  saveProjectMembers() {
    const memberIds = this.projectMembers.map(user => user.id);
    this.projectService
      .updateProjectMembership(this.projectId, {
        userIds: memberIds,
      })
      .subscribe(
        (updatedMemberships: User[]) =>
          (this.projectMembers = updatedMemberships)
      );
  }

  isProjectOwner(userId: number) {
    return this.project?.ownerId == userId;
  }
}
