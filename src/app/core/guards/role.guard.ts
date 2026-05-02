import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleTypeEnum } from '../enums/RoleTypeEnum';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const allowedRoles: RoleTypeEnum[] = route.data['allowedRoles'] ?? [];
    const userRole = this.authService.getUserRole();

    if (userRole !== null && allowedRoles.includes(userRole)) {
      return true;
    }

    return this.router.createUrlTree(['/app/unauthorized']);
  }
}
