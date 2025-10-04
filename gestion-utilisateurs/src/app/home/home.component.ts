import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AudioRecorderComponent } from '../shared/component/audio-recorder/audio-recorder.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, AudioRecorderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  currentUserRole: string='';
  
  constructor(private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserRole = this.authService.getCurrentUserRole();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}
