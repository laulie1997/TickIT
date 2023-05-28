import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  currentUser: any;
  name: string;
  surname: string;
  email: string;
  username: string;
  requestChange: boolean = false;
  form: any = {
    name: null,
    surname: null,
    email: null,
    password: null,
  };
  selectedId: number;
  @Output() updateEvent = new EventEmitter<Data>();
  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
    this.router.navigate(['user', { id: this.currentUser.id }]);
  }

  changeData() {
    this.requestChange = true;
  }

  updateData() {
    const { name, surname, username, email, password } = this.form;
    this.authService
      .updateUser(name, surname, username, email, password)
      .subscribe(
        data => {
          console.log(data);
          this.requestChange = false;
          // this.isSuccessful = true;
          //  this.isSignUpFailed = false;
          // if (this.isSuccessful) {
          // }
        }
        // err => {
        //   this.errorMessage = err.error.message;
        //   this.isSignUpFailed = true;
        // }
      );
  }
}
