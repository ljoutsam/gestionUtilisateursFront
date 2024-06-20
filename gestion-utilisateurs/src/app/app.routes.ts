import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [{ path: 'home', component: HomeComponent},
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{
    path: '',
    loadChildren: () => import('./shared/shared.module')
      .then(mod => mod.SharedModule)
  },
  {
    path: '',
    loadChildren: () => import('./users/users.module')
      .then(mod => mod.UsersModule)
  },];
