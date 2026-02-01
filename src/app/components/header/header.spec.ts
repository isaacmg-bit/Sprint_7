import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Header } from './header';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../../auth/services/authservice';
import { vi } from 'vitest';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let mockRouter: Router;
  let mockAuthService: any;

  beforeEach(async () => {
    const mockAuth = {
      currentUser: null,
      onAuthStateChanged: vi.fn(() => vi.fn()),
    };

    mockAuthService = {
      logout: vi.fn().mockResolvedValue(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        { provide: Auth, useValue: mockAuth },
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    vi.spyOn(mockRouter, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userEmail as empty string', () => {
    expect(component.userEmail()).toBe('');
  });

  it('should call logout and navigate to login', async () => {
    await component.logout();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
