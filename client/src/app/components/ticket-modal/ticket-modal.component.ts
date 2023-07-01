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
import { CategoryAssignment } from '../../api/categoryAssignment';

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
  selectedCategories: Category[] = [];

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
      this.fetchCategories(this.projectId);
    }
  }

  private buildForm() {
    const date =
      this.ticket.dueDate != null
        ? new Date(this.ticket.dueDate).toISOString()
        : '';
    this.form = this.formBuilder.group({
      name: [this.ticket.title || '', [Validators.required]],
      description: [this.ticket.description || ''],
      dueDate: [date],
      assignee: [''],
      category: [''],
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
    if (this.form.get('dueDate').value) {
      const date = new Date(this.form.get('dueDate').value);
      this.ticket.dueDate = date.getTime();
    }
    this.ticket.assignee = this.selectedMember;

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
    ).subscribe((savedTicket: Ticket) => this.assignCategories(savedTicket.id));
  }

  private assignCategories(ticketId: number) {
    const selectedCategoriesIds =
      this.selectedCategories.length > 0
        ? this.selectedCategories.map(category => category.id)
        : [];
    const categoryAssignment: CategoryAssignment = {
      categoryIds: selectedCategoriesIds,
    };
    this.ticketService
      .assignCategories(ticketId, categoryAssignment)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  private updateForm(): void {
    this.form.get('name').setValue(this.ticket?.title);
    this.form.get('description').setValue(this.ticket?.description);
    const date =
      this.ticket.dueDate != null && this.ticket.dueDate != 0
        ? new Date(this.ticket.dueDate).toISOString()
        : '';
    this.form.get('dueDate').setValue(date);
    this.selectedMember = this.ticket?.assignee;
    this.selectedCategories = this.ticket?.categories || [];
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
      });
  }
  selectCategory(category: Category) {
    if (!this.selectedCategories.includes(category)) {
      this.selectedCategories.push(category);
    }
  }

  removeCategory(category: Category) {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    }

    // Check if no category is selected
    if (this.selectedCategories.length === 0) {
      this.selectedCategories = [];
    }
  }

  isCategorySelected(category: Category): boolean {
    return this.selectedCategories.some(
      selectedCategory => selectedCategory.id === category.id
    );
  }

  duplicateTicket() {
    // Create a copy of the ticket object
    // Reset the ID and other properties that should be unique for the new ticket
    const duplicatedTicket: Ticket = {
      title: 'Copy of ' + this.ticket.title,
      description: 'Copy of ' + this.ticket.description,
      dueDate: this.ticket.dueDate,
      project: { id: this.data.projectId },
      status: { id: this.ticket.status.id },
      assignee: { id: this.ticket.assignee.id },
    };

    // Create the duplicated ticket
    this.projectService
      .createTicketForProject(this.data.projectId, duplicatedTicket)
      .subscribe((createdTicket: Ticket) => {
        // Assign the selected categories to the duplicated ticket
        this.assignCategories(createdTicket.id);
      });
  }
}
