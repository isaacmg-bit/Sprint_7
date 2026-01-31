import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { UserData } from '../../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);

  register({ email, password }: UserData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: UserData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
