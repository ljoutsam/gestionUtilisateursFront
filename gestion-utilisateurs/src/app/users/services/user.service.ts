import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient , private authService: AuthService) { }

  private apiUrl = 'server/api/users';

  getUsers(): Observable<User[]> {
    const currentUser = this.authService.getCurrentUser();
    return this.http.get<User[]>(this.apiUrl, {
      headers: {
        email: currentUser.email,
        nom: currentUser.nom
      }
    });
  }

  getUserById(id: string | null): Observable<User> {
    const currentUser = this.authService.getCurrentUser();
    return this.http.get<User>(`${this.apiUrl}/${id}`, {
      headers: {
        email: currentUser.email,
        nom: currentUser.nom
      }
    });
  }

  addUser(user: User): Observable<User> {
    const currentUser = this.authService.getCurrentUser();
    return this.http.post<User>(this.apiUrl, user, {
      headers: {
        email: currentUser.email,
        nom: currentUser.nom
      }
    });
  }

  updateUser(id: string | null, user: User): Observable<User> {
    const currentUser = this.authService.getCurrentUser();
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, {
      headers: {
        email: currentUser.email,
        nom: currentUser.nom
      }
    });
  }

  deleteUser(id: string | null): Observable<User> {
    const currentUser = this.authService.getCurrentUser();
    return this.http.delete<User>(`${this.apiUrl}/${id}`, {
      headers: {
        email: currentUser.email,
        nom: currentUser.nom
      }
    });
  }

  updateUserRole(id: string, role: string): Observable<void> {
    const currentUser = this.authService.getCurrentUser();
    return this.http.put<void>(`${this.apiUrl}/${id}/role`, { role }, {
      headers: {
        email: currentUser.email,
        nom: currentUser.nom
      }
    });
  }

}
