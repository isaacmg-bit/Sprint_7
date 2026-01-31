import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { User } from '../../services/user';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private userService = inject(User);

  formReg = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    this.userService
      .register(this.formReg.value)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }
}
