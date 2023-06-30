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
import { DashboardComponent } from './components/dashboard-components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ProjectBoardComponent } from './components/project-board/project-board.component';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { ProjectPreviewComponent } from './components/dashboard-components/project-preview/project-preview.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './handler/error-handler';
import { ProjectFormComponent } from './components/project-form/project-form/project-form.component';
import { ProjectMembersComponent } from './components/project-members/project-members.component';
import { UserSelectionModalComponent } from './components/user-selection-modal/user-selection-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LogoutComponent,
    UserComponent,
    ProjectBoardComponent,
    ProjectPreviewComponent,
    ProjectModalComponent,
    TicketModalComponent,
    TicketCardComponent,
    StatusModalComponent,
    StatusHeaderComponent,
    ProjectDropdownComponent,
    CategoriesModalComponent,
    ProjectFormComponent,
    ProjectMembersComponent,
    UserSelectionModalComponent,
    NavigationItemComponent,
    ChangePasswordModalComponent,
    CategoriesComponent,
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
    MatTabsModule,
    MatTooltipModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatNativeDateModule,
  ],
  providers: [
    ProjectBoardComponent,
    httpInterceptorProviders,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
