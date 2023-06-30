import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';
import { Data } from '@angular/router';
import { User } from '../../api/user';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User;
  userForm: FormGroup;

  @Output() updateEvent = new EventEmitter<Data>();

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: [''],
      email: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  ngOnInit() {
    // fetch user from api
    const userId = this.tokenStorage.getUser().id;
    this.userService.getUser(userId).subscribe((user: User) => {
      this.user = user;
      this.userForm.patchValue(user);
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      const updatedUser = { ...this.user, ...this.userForm.value };
      this.userService.updateUser(updatedUser).subscribe((user: User) => {
        this.user = user;
        this.openSnackBar('Benutzerdaten wurden aktualisiert', 'schließen');
      });
    }
  }

  openChangePasswordModal() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      height: '400px',
      width: '400px',
      data: { userId: this.user.id },
    });

    dialogRef.afterClosed().subscribe((successful: boolean) => {
      if (successful) {
        this.openSnackBar('Passwort wurde geändert', 'schließen');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }
}
