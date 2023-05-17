import { Component } from '@angular/core';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(private tokenStorage: TokenStorageService) {}
  logout() {
    this.tokenStorage.signOut();
  }
}
