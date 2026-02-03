import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Movies } from './components/movies/movies';
import { MovieCard } from './components/moviecard/moviecard';
import { Register } from './auth/components/register/register';
import { Login } from './auth/components/login/login';
import { authGuard } from './auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'movies',
    component: Movies,
    canActivate: [authGuard],
  },
  {
    path: 'moviecard/:id',
    component: MovieCard,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
];
