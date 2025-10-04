import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  currentUserRole: string = '';
  private usersSubscription: Subscription | undefined;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserRole = this.authService.getCurrentUserRole();
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.usersSubscription = this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          // Mettez à jour la liste des utilisateurs après la suppression
          this.fetchUsers();
          console.log('Utilisateur supprimé avec succès.');
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
