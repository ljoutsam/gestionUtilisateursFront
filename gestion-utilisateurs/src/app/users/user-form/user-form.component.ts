import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';


const PHONE_PATTERN = /^\+?[0-9]{10,15}$/;


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})


export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  userId: string | null = null;
  phone_pattern :string = '/^\+?[0-9]{10,15}$/';


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
      this.initForm();
      this.subscribeToRouteParams();
  }

  private initForm() {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: [null],
      telephone: ['', [Validators.required,Validators.pattern(PHONE_PATTERN) ]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private subscribeToRouteParams(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        this.isEditMode = true;
        this.loadUserData(this.userId);
      } else {
        this.isEditMode = false;
        // Réinitialisez le formulaire 
      }
    });
  }

  private loadUserData(id: string): void {
    this.userService.getUserById(id).subscribe(data => {
      this.userForm.patchValue({
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        telephone: data.telephone,
        email: data.email
      });
    });
  }
  
  getErrorMsg(fieldName: string): string | null {
    const control = this.userForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Ce champ est requis.';
      } else if (control.errors['email']) {
        return 'Veuillez entrer une adresse email valide.';
      } else if (control.errors['pattern']) {
        return 'Veuillez entrer un numéro de téléphone valide.';
      }
      
    }
    return null;
  }


  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (this.isEditMode) {
        this.updateUser(formData);
      } else {
        this.addUser(formData);
      }
    }
  }

  private updateUser(formData: any): void {
    this.userService.updateUser(this.userId!, formData).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

  private addUser(formData: any): void {
    this.userService.addUser(formData).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

}