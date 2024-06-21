import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: '',
        loadChildren: () => import('./shared/shared.module')
        .then(mod => mod.SharedModule)
    },
    {
        path: '',
        loadChildren: () => import('./users/users.module')
        .then(mod => mod.UsersModule)
    },
];
