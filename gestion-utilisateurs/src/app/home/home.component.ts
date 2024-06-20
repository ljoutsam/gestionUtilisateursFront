import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}
