import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  currentUser: any;
  constructor(private tokenStorage: TokenStorageService) {}
  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
  }
}
