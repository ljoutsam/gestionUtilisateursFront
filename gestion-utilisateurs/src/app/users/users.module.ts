import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserFormComponent,
    UserDetailsComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports : [
    UserFormComponent,
    UserDetailsComponent,
    UserListComponent
  ]
})
export class UsersModule { }
