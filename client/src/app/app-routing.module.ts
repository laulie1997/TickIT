import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard-components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectBoardComponent } from './components/project-board/project-board.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/:id',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'project/:id',
    component: ProjectBoardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
