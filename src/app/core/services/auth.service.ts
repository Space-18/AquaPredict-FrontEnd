import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as models from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://your-api.com/api';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  login(credentials: models.auth.LoginRequest): Observable<models.auth.LoginResponse> {
    return this.http.post<models.auth.LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  // Store token after login
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get token from storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  // Check if token is expired (decode JWT)
  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expiration;
    } catch (error) {
      return true;
    }
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}