import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../../services/authservice';
import { Router } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      login: vi.fn(),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form correctly', () => {
    expect(component.formLog.invalid).toBe(true);

    component.formLog.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(component.formLog.valid).toBe(true);
  });

  it('should call login and navigate on valid submit', async () => {
    mockAuthService.login.mockResolvedValue({ success: true });

    component.formLog.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });

    await component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
