import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: User | undefined;
  currentUserRole: string = '';
  private getUserSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getUserSubscription = this.userService.getUserById(id).subscribe(data => {
        this.user = data;
      });
    }
    this.currentUserRole = this.authService.getCurrentUserRole();
  }

  editUser(): void {
    if (this.user) {
      this.router.navigate(['/edit-user', this.user.id]);
    }
  }

  editRoles(): void {
    if (this.user) {
      this.router.navigate(['/user-roles', this.user.id]);
    }
  }

  deleteUser(): void {
    if (this.user && confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(this.user.id).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.getUserSubscription) {
      this.getUserSubscription.unsubscribe();
    }
  }
}
