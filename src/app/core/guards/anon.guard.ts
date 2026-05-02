import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnonGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly route:ActivatedRoute) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    return this.router.createUrlTree(['/app/'], {relativeTo: this.route});
  }
}