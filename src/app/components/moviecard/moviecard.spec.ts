import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MovieCard } from './moviecard';
import { MovieService } from '../../services/movieservice';

describe('MovieCard', () => {
  let component: MovieCard;
  let fixture: ComponentFixture<MovieCard>;

  const paramsSubject = new BehaviorSubject({ id: 5 });

  const mockMovies = [
    {
      id: 5,
      title: 'Matrix',
      posterUrl: '',
      backdropUrl: '',
      release_date: '1999-01-01',
      adult: false,
      genresText: 'Sci-Fi',
      origin_country: ['US'],
      overview: 'Neo...',
      runtime: 120,
      vote_average: 8.5,
    },
    {
      id: 8,
      title: 'Alien',
      posterUrl: '',
      backdropUrl: '',
      release_date: '1979-05-25',
      adult: false,
      genresText: 'Sci-Fi',
      origin_country: ['US'],
      overview: 'Space horror...',
      runtime: 117,
      vote_average: 7.9,
    },
  ];

  const mockCrew = [
    {
      id: 5,
      cast: [{ id: 1, name: 'Keanu Reeves', character: 'Neo', pic: 'fake-url.jpg' }],
      crewName: 'Wachowski',
      crewPic: 'director.jpg',
      crewRole: 'Director',
    },
    {
      id: 8,
      cast: [{ id: 2, name: 'Sigourney Weaver', character: 'Ripley', pic: 'alien.jpg' }],
      crewName: 'Ridley Scott',
      crewPic: 'director2.jpg',
      crewRole: 'Director',
    },
  ];

  const movieServiceMock = {
    movies: () => mockMovies,
    crew: () => mockCrew,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCard],
      providers: [
        { provide: ActivatedRoute, useValue: { params: paramsSubject.asObservable() } },
        { provide: MovieService, useValue: movieServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read the id from route params and select the correct movie', () => {
    const movie = component.selectedMovie();
    expect(movie).toBeDefined();
    expect(movie?.id).toBe(5);
    expect(movie?.title).toBe('Matrix');
  });

  it('should select the correct crew for the movie', () => {
    const crew = component.selectedCrew();
    expect(crew).toBeDefined();
    expect(crew?.id).toBe(5);
    expect(crew?.cast.length).toBe(1);
    expect(crew?.cast[0].name).toBe('Keanu Reeves');
  });

  it('should update movieId and selectedMovie when params change', () => {
    paramsSubject.next({ id: 8 });
    fixture.detectChanges();

    const movie = component.selectedMovie();
    const crew = component.selectedCrew();

    expect(movie).toBeDefined();
    expect(movie?.id).toBe(8);
    expect(movie?.title).toBe('Alien');

    expect(crew).toBeDefined();
    expect(crew?.id).toBe(8);
    expect(crew?.cast[0].name).toBe('Sigourney Weaver');
  });
});
