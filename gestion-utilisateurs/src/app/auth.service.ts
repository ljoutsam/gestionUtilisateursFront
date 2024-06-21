// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'server/api/';
  private currentUser: any;

  constructor(private http: HttpClient,
    private router: Router) {
  }

  login(nom: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { nom, email }).pipe(
      map(user => {
        if (user) {
          this.currentUser = user;
          console.log('Login successful!', user);
          return user;
        } else {
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.router.navigate(['/login']); 
        return throwError(error.error);
      })

    );
  }

  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
    console.log('Logout successful!');
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  hasRole(role: string): boolean {
    return this.currentUser && this.currentUser.role === role;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  getCurrentUserRole(): any {
    return this.currentUser ? this.currentUser.role : null;
  }

}
