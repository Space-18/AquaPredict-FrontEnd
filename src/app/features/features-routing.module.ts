import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PredictionComponent } from './prediction/prediction.component';
import { DataFormComponent } from './data-form/data-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardLayoutComponent } from '../shared/components/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AnonGuard } from '../core/guards/anon.guard';
import { RoleGuard } from '../core/guards/role.guard';
import { RoleTypeEnum } from '../core/enums/RoleTypeEnum';

const ALL_ROLES = [RoleTypeEnum.ADMIN, RoleTypeEnum.ANALYST, RoleTypeEnum.OPERATOR];

const routes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [AnonGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AnonGuard] },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [RoleGuard],
        data: { allowedRoles: ALL_ROLES }
      },
      {
        path: 'prediction',
        component: PredictionComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: [RoleTypeEnum.OPERATOR, RoleTypeEnum.ANALYST] }
      },
      {
        path: 'data-form',
        component: DataFormComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: [RoleTypeEnum.OPERATOR, RoleTypeEnum.ANALYST] }
      },
      {
        path: 'users',
        component: UserManagementComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: [RoleTypeEnum.ADMIN] }
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ALL_ROLES }
      },
      { path: 'unauthorized', component: UnauthorizedComponent },
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
