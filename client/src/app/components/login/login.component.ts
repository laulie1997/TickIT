import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TextFieldModule} from '@angular/cdk/text-field';
import {AuthService} from "../../services/auth/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email!: string;
  password!: string;
  constructor(private authService: AuthService) {
  }
login(){
this.authService.login(this.email, this.password);
}

}
