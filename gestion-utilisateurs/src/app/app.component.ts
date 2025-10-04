import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from './users/users.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    HomeComponent,
    SharedModule,
    LoginComponent,
    FormsModule,
    HttpClientModule,
    UsersModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'gestion-utilisateurs';
  isloggedIn = false

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isloggedIn = this.authService.isLoggedIn();
  }




}
