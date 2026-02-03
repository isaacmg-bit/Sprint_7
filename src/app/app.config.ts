import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'tmdb-angular-isaac',
        appId: '1:311750748287:web:dace2f32bad32507d8b74a',
        storageBucket: 'tmdb-angular-isaac.firebasestorage.app',
        apiKey: 'AIzaSyBMx1boXkCniHDmQgcu7f7fvhZz0jtpI1I',
        authDomain: 'tmdb-angular-isaac.firebaseapp.com',
        messagingSenderId: '311750748287',
        // projectNumber: '311750748287',
        // version: '2',
      }),
    ),
    provideAuth(() => getAuth()),
  ],
};
