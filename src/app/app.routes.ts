import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Movies } from './components/movies/movies';
import { MovieCard } from './components/moviecard/moviecard';
import { Register } from './auth/components/register/register';

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
];
