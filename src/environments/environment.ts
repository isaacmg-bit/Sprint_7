export const environment = {
  production: true,

  apiToken: (window as any).NG_APP_API_KEY || '',
  apiUrl: (window as any).NG_APP_API_URL || '',

  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};
