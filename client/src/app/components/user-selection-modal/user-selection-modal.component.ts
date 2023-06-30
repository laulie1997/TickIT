import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { User } from 'src/app/api/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-selection-modal',
  templateUrl: './user-selection-modal.component.html',
  styleUrls: ['./user-selection-modal.component.css'],
})
export class UserSelectionModalComponent implements OnInit {
  users: User[] = [];
  selection: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { memberIds: number[] },
    private userService: UserService,
    public dialogRef: MatDialogRef<UserSelectionModalComponent>
  ) {}

  ngOnInit(): void {
    const existingMembers = this.data.memberIds || [];
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      // filter users which are already member of the project
      this.users.filter(user => !existingMembers.includes(user.id));
    });
  }

  onSelectionChange(selection: MatListOption[]) {
    this.selection = selection.map(option => option.value);
  }

  confirmSelection() {
    this.dialogRef.close(this.selection);
  }
}
