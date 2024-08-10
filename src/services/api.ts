import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

export const login = (email: string, password: string) => {
  return api.post('/login', { email, password });
};

export const register = (email: string, password: string) => {
  return api.post('/register', { email, password });
};

export const fetchUserData = (userId: string) => {
  return api.get(`/users/${userId}`);
};
