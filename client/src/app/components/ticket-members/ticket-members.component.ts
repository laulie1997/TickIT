import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../api/user';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';
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
  selectedMembers: User[] = [];
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
  isSelected(member: User): boolean {
    return this.selectedMembers.includes(member);
  }

  toggleSelection(member: User): void {
    const index = this.selectedMembers.indexOf(member);
    if (index === -1) {
      this.selectedMembers.push(member);
    } else {
      this.selectedMembers.splice(index, 1);
    }
  }
  //returns 500 error
  saveTicketMembers() {
    const memberIds = this.selectedMembers.map(member => member.id);
    console.log(this.selectedMembers);
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
