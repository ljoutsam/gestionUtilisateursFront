import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isNavbarOpen = false;
  currentUserRole: string='';
  showHeader = true;

  constructor(private authService: AuthService, 
    private headerService: HeaderService){

  }

  ngOnInit(): void {
    this.currentUserRole = this.authService.getCurrentUserRole();
    this.headerService.showHeader$.subscribe(show => this.showHeader = show);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

}
