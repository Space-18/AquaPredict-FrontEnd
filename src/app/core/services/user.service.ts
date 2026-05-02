import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  User, UserDtoPagedResult, UserFormData,
  UpdateUserCommand, UpdateUserAdminCommand, DeleteUserCommand,
  UserProfile
} from '../models/user/user.model';
import { ApiSuccessResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(pageNumber = 1, pageSize = 20): Observable<UserDtoPagedResult> {
    return this.http
      .get<ApiSuccessResponse<UserDtoPagedResult>>(`${this.apiUrl}/User/Listar`, {
        params: { PageNumber: pageNumber, PageSize: pageSize }
      })
      .pipe(map(res => res.data));
  }

  createUser(data: UserFormData): Observable<number> {
    return this.http
      .post<ApiSuccessResponse<number>>(`${this.apiUrl}/Login/Registrar`, {
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        role: data.role,
        dni: parseInt(data.dni, 10)
      })
      .pipe(map(res => res.data));
  }

  updateUser(data: UpdateUserCommand): Observable<string> {
    return this.http
      .put<ApiSuccessResponse<string>>(`${this.apiUrl}/User/Actualizar`, data)
      .pipe(map(res => res.data));
  }

  updateUserAdmin(data: UpdateUserAdminCommand): Observable<string> {
    return this.http
      .put<ApiSuccessResponse<string>>(`${this.apiUrl}/User/ActualizarAdmin`, data)
      .pipe(map(res => res.data));
  }

  deleteUser(userId: number): Observable<string> {
    return this.http
      .delete<ApiSuccessResponse<string>>(`${this.apiUrl}/User/Eliminar`, {
        body: { id: userId } as DeleteUserCommand
      })
      .pipe(map(res => res.data));
  }

  getProfile(): Observable<UserProfile> {
    return this.http
      .get<ApiSuccessResponse<UserProfile>>(`${this.apiUrl}/user/miusuario`)
      .pipe(map(res => res.data));
  }

  updateProfile(data: UserProfile): Observable<string> {
    return this.http
      .put<ApiSuccessResponse<string>>(`${this.apiUrl}/User/Actualizar`, data)
      .pipe(map(res => res.data));
  }
}
