import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { AuthService } from '../../services/authservice';
import { Router } from '@angular/router';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let mockAuthService: any;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockAuthService = {
      register: vi.fn(),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form correctly', () => {
    expect(component.formReg.invalid).toBe(true);

    component.formReg.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(component.formReg.valid).toBe(true);
  });

  it('should call register and navigate on valid submit', async () => {
    mockAuthService.register.mockResolvedValue({ success: true });

    component.formReg.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });

    await component.onSubmit();

    expect(mockAuthService.register).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
