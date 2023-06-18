import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectBoardComponent } from './components/project-board/project-board.component';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { ProjectsComponent } from './components/projects/projects.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StatusModalComponent } from './components/status-modal/status-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { TicketModalComponent } from './components/ticket-modal/ticket-modal.component';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxColorsModule } from 'ngx-colors';
import { MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { StatusHeaderComponent } from './components/status-header/status-header/status-header.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectDropdownComponent } from './components/project-dropdown/project-dropdown.component';
import { CategoriesModalComponent } from './components/categories-modal/categories-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LogoutComponent,
    UserComponent,
    ProjectComponent,
    ProjectBoardComponent,
    ProjectsComponent,
    ProjectModalComponent,
    TicketModalComponent,
    TicketCardComponent,
    StatusModalComponent,
    StatusHeaderComponent,
    ProjectDropdownComponent,
    CategoriesModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    CdkAccordionModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    MatDialogModule,
    MatDatepickerModule,
    CdkDropList,
    MatSnackBarModule,
    NgxColorsModule,
    MatSelectModule,
    MatMenuModule,
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
