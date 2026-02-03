import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { AuthService } from '../../auth/services/authservice';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
})
export class Header {
  private auth = inject(Auth);
  private router = inject(Router);
  private userService = inject(AuthService);

  userEmail = signal<string>('');

  constructor() {
    authState(this.auth).subscribe((user) => {
      this.userEmail.set(user?.email || '');
    });
  }

  logout() {
    this.userService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
