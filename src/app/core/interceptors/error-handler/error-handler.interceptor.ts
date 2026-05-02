import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ApiErrorResponse } from '../../models/api-response.model';

const PUBLIC_ENDPOINTS = ['/Login/IniciarSesion', '/Login/Registrar'];

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const isPublic = PUBLIC_ENDPOINTS.some(ep =>
          request.url.toLowerCase().includes(ep.toLowerCase())
        );

        const apiError = error.error as ApiErrorResponse;
        const message = apiError?.message || 'Error desconocido';

        switch (error.status) {
          case 401:
            if (!isPublic) {
              this.authService.logout();
              this.alertService.error('No autorizado', message).then(() => {
                this.router.navigate(['/app/login']);
              });
            }
            break;
          case 403:
            this.alertService.error('Acceso denegado', message);
            break;
          case 404:
            this.alertService.error('No encontrado', message);
            break;
          case 500:
            this.alertService.error('Error del servidor', message);
            break;
          default:
            if (error.status > 0 && !isPublic) {
              this.alertService.error(`Error ${error.status}`, message);
            }
        }

        return throwError(() => error);
      })
    );
  }
}
