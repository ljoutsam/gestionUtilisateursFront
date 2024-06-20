import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AuthGuard } from '../auth.guard';
import { UserRolesComponent } from './user-roles/user-roles.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'user'] } },
  { path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'user'] } },
  { path: 'add-user', component: UserFormComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'edit-user/:id', component: UserFormComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }, },
  {path: 'user-roles/:id', component: UserRolesComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }, },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
