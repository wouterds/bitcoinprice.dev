import dotenv from 'dotenv';
import * as tsConfigPaths from 'tsconfig-paths';

dotenv.config();

tsConfigPaths.register({
  baseUrl: './',
  paths: {
    '*': [
      'src/*', // dev
      '*', // dist
    ],
  },
});
