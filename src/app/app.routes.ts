import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Movies } from './components/movies/movies';
import { MovieCard } from './components/moviecard/moviecard';
import { Register } from './auth/components/register/register';
import { Login } from './auth/components/login/login';

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
  },
  {
    path: 'moviecard/:id',
    component: MovieCard,
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
