import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class User {
  auth = inject(Auth);

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
