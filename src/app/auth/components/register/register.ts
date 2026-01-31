import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private userService = inject(AuthService);
  private Router = inject(Router);

  formReg = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.formReg.valid) {
      const formData = {
        email: this.formReg.value.email || '',
        password: this.formReg.value.password || '',
      };

      this.userService
        .register(formData)
        .then((response) => {
          console.log(response);
          this.Router.navigate(['/login']);
        })
        .catch((error) => console.log(error));
    }
  }
}
