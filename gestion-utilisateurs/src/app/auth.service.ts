import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoles: string[] = ['admin']; // Exemple : rôles de l'utilisateur connecté

  hasRoles(requiredRoles: string[]): boolean {
    return requiredRoles.some(role => this.userRoles.includes(role));
  }

}
