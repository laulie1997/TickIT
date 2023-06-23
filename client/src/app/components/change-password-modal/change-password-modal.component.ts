import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PasswordChangeRequest } from 'src/app/api/passwordChangeRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css'],
})
export class ChangePasswordModalComponent implements OnInit {
  passwordChangeRequest: PasswordChangeRequest;

  updatePasswordForm: any = {
    oldPassword: null,
    newPassword: null,
  };
  userId: number;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { userId: number }
  ) {}

  ngOnInit(): void {
    this.userId = this.data.userId;
  }

  updatePassword() {
    this.passwordChangeRequest = this.updatePasswordForm;
    this.userService
      .updatePassword(this.passwordChangeRequest, this.userId)
      .subscribe(() => this.dialogRef.close(true));
  }
}
