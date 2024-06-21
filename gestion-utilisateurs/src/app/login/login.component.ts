import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { nom, email } = this.loginForm.value;
      this.authService.login(nom, email).subscribe(
        () => {
          this.router.navigate(['/home']); // Redirection après connexion
        },
        error => {
          this.errorMessage = error; // Affichage du message d'erreur
        }
      );
    }
  }
}
