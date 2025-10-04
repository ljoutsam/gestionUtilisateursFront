import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AudioRecorderComponent } from './component/audio-recorder/audio-recorder.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
