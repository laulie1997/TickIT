import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LogoutComponent } from '../logout/logout.component';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isLoggedIn() {
    this.tokenStorage.isLoggedIn();
  }

  navigateUser() {
    this.router.navigate(['user']);
  }

  navigateDashboard() {
    this.router.navigate(['dashboard']);
  }
  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  protected readonly LogoutComponent = LogoutComponent;
}
