import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})

export class UserDetailsComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe(data => {
        this.user = data;
      });
    }
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
}