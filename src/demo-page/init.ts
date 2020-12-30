import { importAll } from '../index';

importAll(require.context('./', true, /\.(js|ts|ico|png|svg)$/i));
