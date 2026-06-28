import axios from 'axios';

// Base URL of the FastAPI backend. Axios already ships its own types,
// so this file becomes valid TypeScript just by being named .ts.
// (Later you could read this from import.meta.env.VITE_API_URL instead of hardcoding it.)
const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

export default api;
