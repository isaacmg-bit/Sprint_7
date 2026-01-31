import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Header } from './header';
import { provideRouter } from '@angular/router';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    const mockAuth = {
      currentUser: null,
      onAuthStateChanged: vi.fn(() => vi.fn()),
    };

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [{ provide: Auth, useValue: mockAuth }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
