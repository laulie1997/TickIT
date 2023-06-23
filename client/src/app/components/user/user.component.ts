import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';
import { Data } from '@angular/router';
import { User } from '../../api/user';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User;

  form: any = {
    name: null,
    surname: null,
    email: null,
    username: null,
  };

  @Output() updateEvent = new EventEmitter<Data>();

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // fetch user from api
    const userId = this.tokenStorage.getUser().id;
    this.userService
      .getUser(userId)
      .subscribe((user: User) => (this.user = user));
  }

  updateUser() {
    this.userService
      .updateUser(this.user)
      .subscribe((user: User) => (this.user = user));
    this.openSnackBar('Benutzerdaten wurden aktualisiert', 'schließen');
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
