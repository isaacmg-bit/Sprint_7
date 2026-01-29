import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class MovieCard implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly movieService = inject(MovieService);

  movieId = signal<number>(0);

  selectedMovie = computed<Movie | null>(() => {
    const id = this.movieId();
    return this.movieService.movies().find((m) => m.id === id) ?? null;
  });

  selectedCrew = computed((): MovieCrew => {
    const id = this.movieId();

    return this.movieService.crew().find((crew) => crew.id === id)!;
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId.set(+params['id']);
    });
  }
}
