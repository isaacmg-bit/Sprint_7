import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Movies } from './movies';
import { provideRouter } from '@angular/router';
import { MovieService } from '../../services/movieservice';
import { signal } from '@angular/core';

describe('Movies', () => {
  let component: Movies;
  let fixture: ComponentFixture<Movies>;

  const mockMovies = [
    {
      id: 5,
      title: '',
      posterUrl: '',
      backdropUrl: '',
      release_date: '',
      adult: false,
      genresText: '',
      origin_country: [''],
      overview: '',
      runtime: 120,
      vote_average: 8.5,
    },
  ];

  const movieServiceMock = {
    initMovies: vi.fn(),
    fetchMovies: vi.fn(),
    movies: () => mockMovies,
    loading: signal(false),
    getDirectorByMovieId: vi.fn().mockReturnValue('Director Name'),
    getPosterByMovieId: vi.fn().mockReturnValue('poster-path.jpg'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Movies],
      providers: [{ provide: MovieService, useValue: movieServiceMock }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Movies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize MovieService', () => {
    expect(component.movieService).toBeDefined();
  });

  it('should call initMovies on constructor', () => {
    expect(movieServiceMock.initMovies).toHaveBeenCalled();
  });

  it('should call fetchMovies on scroll', () => {
    component.onScroll();

    expect(movieServiceMock.fetchMovies).toHaveBeenCalled();
  });
});
