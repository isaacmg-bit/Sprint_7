import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set fromMovies to true when query param from=movies', () => {
    // aquí testear que fromMovies() === true si viene query param
  });

  it('should invalidate the form if email or password are empty', () => {
    // aquí testear que formLog.invalid es true si inputs vacíos
  });

  it('should call AuthService.login with form values when form is valid', () => {
    // aquí testear que se llama login() con los datos correctos
  });

  it('should navigate to /movies if fromMovies is true after successful login', () => {
    // aquí testear que router.navigate(['/movies']) se llama
  });

  it('should navigate to /home if fromMovies is false after successful login', () => {
    // aquí testear que router.navigate(['/home']) se llama
  });
});
