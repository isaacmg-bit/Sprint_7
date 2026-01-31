import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Auth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    const mockAuth = {
      currentUser: null,
      onAuthStateChanged: vi.fn(() => vi.fn()),
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: Auth, useValue: mockAuth }, provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
