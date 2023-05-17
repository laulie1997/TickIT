import { Component } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string;
  constructor(private registerService: RegisterService) {}
  register() {
    this.registerService.register();
  }
}
