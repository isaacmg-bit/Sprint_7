import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { MovieService } from '../../services/movieservice';
import { Movie } from '../../models/movie';
import { MovieCrew } from '../../models/moviecrew';
import { ActorCard } from '../actorcard/actorcard';

@Component({
  selector: 'app-moviecard',
  imports: [ActorCard],
  templateUrl: './moviecard.html',
  styleUrl: './moviecard.css',
})
export class MovieCard {
  private readonly route = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);

  private movieId = toSignal(this.route.params.pipe(map((params) => +params['id'])), {
    initialValue: 0,
  });

  readonly selectedMovie = computed<Movie | null>(() => {
    const id = this.movieId();
    return this.movieService.movies().find((m) => m.id === id) ?? null;
  });

  readonly selectedCrew = computed<MovieCrew | undefined>(() => {
    const id = this.movieId();
    return this.movieService.crew().find((crew) => crew.id === id);
  });
}
