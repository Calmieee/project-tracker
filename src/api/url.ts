import { loadEnv } from 'vite';
const env = loadEnv('', process.cwd());
export const URL = env.VITE_API_URL;
