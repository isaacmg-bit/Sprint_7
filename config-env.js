const fs = require('fs');
const path = require('path');

const environment = process.argv.includes('--environment=prod') ? 'production' : 'development';

const config = {
  production: true,
  apiUrl: process.env.apiUrl || 'https://api.themoviedb.org/3',
  apiToken: process.env.apiToken || '',
};

const envFile = `export const environment = ${JSON.stringify(config, null, 2)};`;

fs.writeFileSync(
  path.join(__dirname, 'src/environments/environment.ts'),
  envFile
);

console.log(`✅ environment.ts generated for ${environment}`);