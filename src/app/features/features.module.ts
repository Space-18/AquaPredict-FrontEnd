import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeaturesRoutingModule } from './features-routing.module';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PredictionComponent } from './prediction/prediction.component';
import { DataFormComponent } from './data-form/data-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardLayoutComponent } from '../shared/components/dashboard-layout/dashboard-layout.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeaturesRoutingModule,
    AuthComponent,
    DashboardComponent,
    ReportsComponent,
    ForgotPasswordComponent,
    PredictionComponent,
    DataFormComponent,
    UserManagementComponent,
    UserProfileComponent,
    DashboardLayoutComponent,
    UnauthorizedComponent,
    NotFoundComponent,
  ]
})
export class FeaturesModule { }
