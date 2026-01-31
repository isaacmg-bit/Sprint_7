import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/authservice';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private userService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  fromMovies = signal(false);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['from'] === 'movies') {
        this.fromMovies.set(true);
      }
    });
  }

  formLog = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.formLog.valid) {
      const formData = {
        email: this.formLog.value.email || '',
        password: this.formLog.value.password || '',
      };

      this.userService
        .login(formData)
        .then((response) => {
          console.log(response);

          if (this.fromMovies()) {
            this.router.navigate(['/movies']);
          } else {
            this.router.navigate(['/home']);
          }
        })
        .catch((error) => console.log(error));
    }
  }
}
