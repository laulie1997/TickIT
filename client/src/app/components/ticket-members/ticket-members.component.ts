import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../api/user';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';
import { UserSelectionModalComponent } from '../user-selection-modal/user-selection-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'app-ticket-members',
  templateUrl: './ticket-members.component.html',
  styleUrls: ['./ticket-members.component.css'],
})
export class TicketMembersComponent implements OnInit {
  @Input() projectId: number;
  @Input() ticketId: number;
  ticketMembers: User[];
  project: Project;
  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private ticketService: TicketService
  ) {}
  ngOnInit(): void {
    console.log('project' + this.projectId);
    console.log('ticketId' + this.ticketId);
    this.projectService
      .getProjectMembers(29)
      .subscribe((members: User[]) => (this.ticketMembers = members));
  }

  openAddMembersModal() {
    const dialogRef = this.dialog.open(UserSelectionModalComponent, {
      height: '500px',
      width: '500px',
      data: this.ticketMembers.map(member => member.id),
    });
    dialogRef
      .afterClosed()
      .subscribe((selectedUsers: User[]) =>
        this.ticketMembers.push(...selectedUsers)
      );
  }

  //returns 500 error
  saveTicketMembers() {
    const memberIds = this.ticketMembers.map(user => user.id);
    this.ticketService
      .updateTicketMembership(this.ticketId, {
        userIds: memberIds,
      })
      .subscribe(
        (updatedMemberships: User[]) =>
          (this.ticketMembers = updatedMemberships)
      );
  }
}
