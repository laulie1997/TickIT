import { Component } from '@angular/core';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}
  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['']);
  }
}
