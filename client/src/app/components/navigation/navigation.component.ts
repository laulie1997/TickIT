import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LogoutComponent } from '../logout/logout.component';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isLoggedIn() {
    this.tokenStorage.isLoggedIn();
  }
  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenStorage: TokenStorageService
  ) {}

  protected readonly LogoutComponent = LogoutComponent;
}
