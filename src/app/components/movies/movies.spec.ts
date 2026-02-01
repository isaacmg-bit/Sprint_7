import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Movies } from './movies';
import { provideRouter } from '@angular/router';
import { MovieService } from '../../services/movieservice';
import { vi } from 'vitest';
import { signal } from '@angular/core';

describe('Movies', () => {
  let component: Movies;
  let fixture: ComponentFixture<Movies>;
  let mockMovieService: any;

  beforeEach(async () => {
    mockMovieService = {
      initMovies: vi.fn(),
      fetchMovies: vi.fn(),
      movies: signal([
        { id: 1, title: 'Movie 1', release_date: '2024-01-01' },
        { id: 2, title: 'Movie 2', release_date: '2023-06-15' },
      ]),
      loading: signal(false),
      getDirectorByMovieId: vi.fn().mockReturnValue('Director Name'),
      getPosterByMovieId: vi.fn().mockReturnValue('poster-path.jpg'),
    };

    await TestBed.configureTestingModule({
      imports: [Movies],
      providers: [{ provide: MovieService, useValue: mockMovieService }, provideRouter([])],
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
    expect(mockMovieService.initMovies).toHaveBeenCalled();
  });

  it('should call fetchMovies on scroll', () => {
    component.onScroll();

    expect(mockMovieService.fetchMovies).toHaveBeenCalled();
  });
});
