import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private userService = inject(AuthService);
  private Router = inject(Router);

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
          this.Router.navigate(['/home']);
        })
        .catch((error) => console.log(error));
    }
  }
}
