import { TestBed } from '@angular/core/testing';
import { MovieService } from './movieservice';
import { MovieApi } from '../models/movie-api';
import { MovieCrewApi } from '../models/moviecrew-api';
import { ApiService } from './apirequest';
import { of } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieCrew } from '../models/moviecrew';

describe('Movieservice', () => {
  let service: MovieService;
  let mockApiService: {
    get: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockApiService = {
      get: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [MovieService, { provide: ApiService, useValue: mockApiService }],
    });

    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map MovieApi to Movie correctly', () => {
    const api: MovieApi = {
      id: 1,
      title: 'Matrix',
      adult: false,
      poster_path: '',
      backdrop_path: '',
      release_date: '',
      genres: [{ name: 'Sci-Fi' }],
      origin_country: '',
      overview: '',
      runtime: 120,
      vote_average: 8.7,
    };

    const movie = service['mapMovie'](api);

    expect(movie.title).toBe('Matrix');
    expect(movie.adult).toBe(false);
    expect(movie.genresText).toBe('Sci-Fi');
    expect(movie.vote_average).toBe(8.7);
  });

  it('should map MovieCrewApi to MovieCrew correctly', () => {
    const api: MovieCrewApi = {
      id: 1,
      cast: [
        {
          id: 10,
          name: 'Clin Isbut',
          character: '',
          profile_path: '',
        },
      ],
      crew: [
        {
          id: 10,
          name: 'Estanli Cubric',
          job: 'Director',
          profile_path: '',
        },
      ],
    };

    const crew = service['mapMovieCrew'](api);
    expect(api.id).toBe(1);
    expect(crew.cast[0].name).toBe('Clin Isbut');
    expect(crew.crewName).toBe('Estanli Cubric');
  });

  it('should return director name and poster url if present', () => {
    service['crew'].set([
      {
        id: 1,
        crewName: 'Estanli Cubric',
        cast: [],
        crewPic: '',
        crewRole: '',
      } as MovieCrew,
    ]);

    service['movies'].set([
      {
        id: 1,
        title: '',
        posterUrl: 'poster.jpg',
      } as Movie,
    ]);

    expect(service.getDirectorByMovieId(1)).toBe('Estanli Cubric');
    expect(service.getDirectorByMovieId(2)).toBe('Unknown');
    expect(service.getPosterByMovieId(1)).toBe('poster.jpg');
    expect(service.getPosterByMovieId(2)).toBe('Unknown');
  });

  it('should fetch movies and crew and update signals', () => {
    const fakeMovie: MovieApi = {
      id: 1,
      title: 'Test Movie',
      adult: false,
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2026-01-01',
      genres: [{ name: 'Action' }],
      origin_country: 'US',
      overview: 'Overview',
      runtime: 100,
      vote_average: 7,
    };

    const fakeCrew: MovieCrewApi = {
      id: 1,
      cast: [
        {
          id: 10,
          name: '',
          character: '',
          profile_path: '',
        },
      ],
      crew: [
        {
          id: 10,
          name: '',
          job: '',
          profile_path: '',
        },
      ],
    };

    mockApiService.get.mockImplementation((url: string) => {
      if (url.includes('credits')) {
        return of(fakeCrew);
      }

      return of(fakeMovie);
    });

    service.fetchMovies();

    expect(service.movies().length).toBeGreaterThan(0);
    expect(service.crew().length).toBeGreaterThan(0);
    expect(service.loading()).toBe(false);
  });
});
