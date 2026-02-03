export const environment = {
  production: true,

  apiToken: process.env['NG_APP_API_KEY'],
  apiUrl: process.env['NG_APP_API_URL'],

  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};
