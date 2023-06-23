import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';
import { Router } from '@angular/router';
import { User } from '../../api/user';
import { LoginCredentials } from '../../api/loginCredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginCredentials: LoginCredentials;
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getAuth()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.loginCredentials = this.form;

    this.authService.login(this.loginCredentials).subscribe(data => {
      this.tokenStorage.saveUser(data);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.router.navigate(['dashboard']);
    });
  }
}
