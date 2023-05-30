import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LogoutComponent } from '../logout/logout.component';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  projects: Project[];
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
  navigateNewProject() {
    this.router.navigate(['project']);
  }

  errorMessage = '';
  ngOnInit() {
    //  this.projectService.getProjects().subscribe(data => console.log(data)),
    //    error => {
    //     this.errorMessage = error.error.message;
    //   };
  }
  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private projectService: ProjectService
  ) {}

  protected readonly LogoutComponent = LogoutComponent;
}
