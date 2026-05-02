import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

const PUBLIC_ENDPOINTS = ['/Login/IniciarSesion', '/Login/Registrar'];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isPublic = PUBLIC_ENDPOINTS.some(ep => request.url.toLowerCase().includes(ep.toLowerCase()));
    if (isPublic) return next.handle(request);

    const token = this.authService.getToken();
    if (!token) return next.handle(request);

    const authRequest = request.clone({
      setHeaders: { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' }
    });

    return next.handle(authRequest);
  }
}
