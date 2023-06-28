import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../../api/ticket';
import { TicketService } from '../../services/ticket/ticket.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project/project.service';
import { Project } from '../../api/project';
import { User } from '../../api/user';
import { Router } from '@angular/router';
import { Category } from '../../api/category';

@Component({
  selector: 'app-ticketdata',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css'],
})
export class TicketModalComponent implements OnInit {
  @Input() projectId: number;
  @Input() project: Project;
  form: any = {
    title: null,
    description: null,
    dueDate: null,
  };
  ticket: Ticket = {};
  editMode: boolean;
  dialogTitle = '';
  ticketMembers: User[];
  selectedMember: User = null;
  categories: Category[] = [];
  selectedCategory: any;

  constructor(
    public dialogRef: MatDialogRef<TicketModalComponent>,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    public router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticketId: number;
      projectId: number;
      statusId: number;
      categoryId;
    }
  ) {
    this.projectId = data.projectId;
  }

  ngOnInit(): void {
    this.editMode = this.data.ticketId != null;
    this.dialogTitle = this.editMode ? 'Ticket bearbeiten' : 'Ticket erstellen';
    this.buildForm();
    if (this.editMode) {
      this.ticketService
        .getSelectedTicket(this.data.ticketId)
        .subscribe((ticket: Ticket) => {
          this.ticket = ticket;
          this.updateForm();
        });
    }
    if (this.router.url.includes('/project')) {
      this.projectService
        .getProjectMembers(this.projectId)
        .subscribe((members: User[]) => (this.ticketMembers = members));
    }
    this.fetchCategories(this.projectId);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [this.ticket.title || '', [Validators.required]],
      description: [this.ticket.description || ''],
      dueDate: [this.ticket.dueDate || ''],
      assignee: [''],
      category: ['']
    });
  }

  deleteTicket() {
    this.ticketService
      .deleteTicket(this.ticket.id)
      .subscribe(() => this.dialogRef.close(false));
  }

  saveTicket() {
    this.ticket.title = this.form.get('name').value;
    this.ticket.description = this.form.get('description').value;
    this.ticket.dueDate = this.form.get('dueDate').value;
    this.ticket.assignee = this.selectedMember;
    console.log('IDs ' + this.selectedMember);
    if (!this.editMode) {
      this.ticket.project = { id: this.data.projectId };
      this.ticket.status = { id: this.data.statusId };
    }
    (this.editMode
      ? this.ticketService.updateTicket(this.ticket)
      : this.projectService.createTicketForProject(
          this.data.projectId,
          this.ticket
        )
    ).subscribe(() => this.dialogRef.close(true));
  }

  private updateForm(): void {
    this.form.get('name').setValue(this.ticket?.title);
    this.form.get('description').setValue(this.ticket?.description);
    this.form.get('dueDate').setValue(this.ticket?.dueDate);
    this.selectedMember = this.ticket?.assignee;
  }

  isSelected(member: User): boolean {
    return this.selectedMember !== null && this.selectedMember.id === member.id;
  }

  toggleSelection(member: User): void {
    if (this.selectedMember !== null && this.selectedMember.id === member.id) {
      // If the member is already selected, remove the selection
      this.selectedMember = null;
    } else {
      // Otherwise, set the member as the selected assignee
      this.selectedMember = member;
    }
  }
  fetchCategories(projectId: number) {
    this.projectService
      .getCategories(projectId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log(this.categories);
      });
  }
  selectCategory(category: any) {
    this.selectedCategory = category;
  }

  clearCategory() {
    this.selectedCategory = null;
  }
}
