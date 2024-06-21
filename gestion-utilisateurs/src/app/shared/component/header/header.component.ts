import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isNavbarOpen = false;
  currentUserRole: string='';
  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    this.currentUserRole = this.authService.getCurrentUserRole();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

}
