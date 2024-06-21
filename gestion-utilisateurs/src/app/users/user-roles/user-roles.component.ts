import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit, OnDestroy {

  userForm!: FormGroup;
  userId: string | null = null;
  user: User | null = null;
  roles: string[] = ['admin', 'user']; // Liste des rôles disponibles
  private userSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.loadUser();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      nom: [''],
      prenom: [''],
      role: ['']
    });
  }

  loadUser(): void {
    if (this.userId) {
      this.userSubscription = this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        this.userForm.patchValue({
          nom: user.nom,
          prenom: user.prenom,
          role: user.role
        });
      });
    }
  }

  updateUserRole(): void {
    if (this.user && this.userId !== null) {
      const selectedRole = this.userForm.value.role;

      // Appeler le service pour mettre à jour le rôle de l'utilisateur
      this.userService.updateUserRole(this.userId, selectedRole).subscribe(() => {
        console.log('Rôle mis à jour avec succès !');
        this.router.navigate(['/users']);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}