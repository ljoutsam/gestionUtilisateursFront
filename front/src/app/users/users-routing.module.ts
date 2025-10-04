import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-user/:id', component: UserFormComponent, canActivate: [AuthGuard] },
  {path: 'user-roles/:id', component: UserRolesComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
