import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../api/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User;
  form: any = {
    name: null,
    surname: null,
    username: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.user = this.form;
    this.authService.register(this.user).subscribe(() => {
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      if (this.isSuccessful) {
        this.router.navigate(['']);
      }
    });
  }
}
