# Peliculitas - Movie Database
https://peliculitas-malagon.vercel.app/home

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
![Angular](https://img.shields.io/badge/Angular-21.1.2-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-06B6D4?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.2.0-FFCA28?logo=firebase&logoColor=white)
![Node](https://img.shields.io/badge/Node-25.1.0-339933?logo=node.js&logoColor=white)
![License: CC BY-NC](https://img.shields.io/badge/license-CC--BY--NC-orange)

**Movie discovery application built with Angular and Firebase, featuring authentication, infinite scroll, and detailed movie information from TMDB API.**

---

## Table of Contents

- [Background](#background)
- [Technologies](#technologies)
- [Structure](#structure)
- [Installation](#installation)
- [API Configuration](#api-configuration)
- [Features](#features)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

---

## Background

Peliculitas was developed to explore advanced Angular concepts including Firebase authentication, API integration, reactive programming with Signals, and modern Angular routing patterns.

The application provides an interface for browsing movies, viewing detailed information about films including cast and crew, and managing user authentication with Firebase.

---

## Technologies

- HTML5
- TailwindCSS v4.1.18
- JavaScript ES6
- TypeScript v5.9.3
- Node.js v24.13.0 LTS
- Angular 21.1.2
- Firebase 11.2.0
- AngularFire 21.0.0 RC
- RxJS for reactive programming
- TMDB API for movie data

---

## Structure

```text
SPRINT_7/
├── .angular/                    # Angular cache (auto-generated)
├── .vscode/                     # VSCode workspace settings
├── node_modules/                # Installed dependencies (auto-generated)
├── public/                      # Static assets served at root
│   └── assets/                  # Application assets
│       └── img/                 # Images and logos
├── src/                         # Application source code
│   ├── app/                     # Main application module
│   │   ├── auth/                # Authentication module
│   │   │   ├── components/      # Auth UI components
│   │   │   │   ├── login/       # Login component
│   │   │   │   └── register/    # Registration component
│   │   │   ├── guards/          # Route guards
│   │   │   │   └── auth-guard.ts
│   │   │   ├── services/        # Auth services
│   │   │   │   ├── authservice.ts
│   │   │   │   └── user.ts
│   │   │   └── models/          # Auth data models
│   │   │       └── auth.ts
│   │   ├── components/          # Shared components
│   │   │   ├── actorcard/       # Actor/crew card component
│   │   │   ├── header/          # Main header component
│   │   │   ├── home/            # Landing page component
│   │   │   ├── moviecard/       # Movie detail view
│   │   │   └── movies/          # Movies list component
│   │   ├── models/              # Data models
│   │   │   ├── movie.ts
│   │   │   ├── movie-api.ts
│   │   │   ├── moviecrew.ts
│   │   │   └── moviecrew-api.ts
│   │   ├── services/            # Application services
│   │   │   ├── apirequest.ts    # HTTP service
│   │   │   └── movieservice.ts  # Movie data service
│   │   ├── app.config.ts        # Application configuration
│   │   ├── app.css              # Root component styles
│   │   ├── app.html             # Root component template
│   │   ├── app.routes.ts        # Application routes
│   │   └── app.ts               # Root component
│   ├── environment/             # Environment configuration
│   │   ├── environment.ts
│   │   └── environmentlocal.ts
│   ├── index.html               # Main HTML entry point
│   ├── main.ts                  # Application bootstrap
│   └── styles.css               # Global styles
├── .editorconfig                # Editor configuration
├── .firebaserc                  # Firebase project config
├── .gitignore                   # Git ignored files
├── .postcssrc.json              # PostCSS configuration
├── angular.json                 # Angular workspace configuration
├── eslint.config.js             # ESLint configuration
├── firebase.json                # Firebase hosting config
├── package-lock.json            # Dependency lockfile (auto-generated)
├── package.json                 # Project manifest
├── README.md                    # Project documentation
├── tsconfig.app.json            # TypeScript config for app
├── tsconfig.json                # Base TypeScript configuration
└── tsconfig.spec.json           # TypeScript config for tests
```

---

## Installation

```bash
# Clone the repository
git clone https://github.com/isaacmg-bit/Sprint_7.git

# Navigate to the project folder
cd Sprint_7

# Install dependencies
npm install

# Set up environment variables
# Rename src/environment/environment.ts to environmentlocal.ts with your TMDB API key
# and Firebase configuration, or contact me and I will send you the necessary config to make it work.

# Start development server
ng serve

# Open http://localhost:4200 in your browser
```

---

## API Configuration

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) to fetch movie data.

### Getting Your TMDB API Key

1. Create a free account at [TMDB](https://www.themoviedb.org/signup)
2. Go to your [Account Settings](https://www.themoviedb.org/settings/api)
3. Click on "API" in the left sidebar
4. Request an API key (choose "Developer" option)
5. Fill out the application form
6. Copy your API Key (v3 auth)

### API Endpoints Used

- `GET /movie/{movie_id}` - Get movie details
- `GET /movie/{movie_id}/credits` - Get cast and crew information

### Environment Configuration

Add your API key to `src/environment/environmentlocal.ts`:

```typescript
export const environment = {
  apiUrl: 'https://api.themoviedb.org/3',
  apiKey: 'YOUR_TMDB_API_KEY_HERE',
};
```

### API Rate Limits

- Free tier: 40 requests per 10 seconds
- No daily limit for free accounts
- Read more: [TMDB API FAQ](https://www.themoviedb.org/talk/category/5047951f760ee3318900009a)

### Firebase Setup

This project also uses Firebase for authentication:

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication in Authentication section
3. Copy your Firebase configuration
4. Add it to your environment file

```typescript
export const environment = {
  // ... TMDB config
  firebase: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project.firebasestorage.app',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
};
```

---

### Environment Setup

Rename `src/environment/environment.ts to environmentlocal.ts`:

---

## Features

- **User Authentication**
  - Firebase email/password authentication
  - Protected routes with auth guards
  - Persistent login sessions
  - User profile display

- **Movie Discovery**
  - Browse random movies with infinite scroll
  - View quick movie information plus movie poster

- **Movie Details**
  - Movie poster in high resolution
  - Complete director and cast list with character names and pictures
  - Movie overview and ratings
  - Genre, runtime, and release information

- **Responsive Design**
  - Adaptive layouts for all screen sizes
  - Optimized for desktop and mobile viewing

---

## Usage

### Authentication

1. **Register**: Click "REGISTER" button, enter email and password
2. **Login**: Use your credentials to access the application
3. **Logout**: Click "Logout" button in the header

### Browsing Movies

1. Navigate to "Movies" from the navigation menu
2. Scroll down to load more movies (infinite scroll)
3. Click on any movie to view detailed information

### Viewing Movie Details

- See complete movie information including title, genre, runtime
- View cast members with their character names
- See director information
- View movie posters and backdrop images

---

## Screenshots

![Desktop version](src/assets/img/Desktop01.png)
![Desktop version](src/assets/img/Desktop02.png)
![Desktop version](src/assets/img/Desktop03.png)
![Desktop version](src/assets/img/Desktop04.png)
![Desktop version](src/assets/img/Desktop05.png)
![Desktop version](src/assets/img/Desktop06.png)
![Desktop version](src/assets/img/Desktop07.png)
![Desktop demo](src/assets/img/DesktopDemo.gif)
![Mobile demo](src/assets/img/MobileDemo.gif)
![Tablet demo](src/assets/img/TabletDemo.gif)

---

## Maintainers

[@Isaac Malagón](https://github.com/isaacmg-bit)

---

## Contributing

```text
1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Create a Pull Request
```

**Pull requests** are welcome.  
If you edit the README, please make sure to follow the  
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

---

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).  
© 2025 Isaac Malagón — Commercial use and redistribution are not allowed without permission.
