import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Movies } from './components/movies/movies';
import { MovieCard } from './components/moviecard/moviecard';

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
];
