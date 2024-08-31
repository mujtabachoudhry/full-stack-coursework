import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
});

export const register = (params) => API.get('/register', { params });
export const login = (params) => API.get('/login', { params });
export const logout = () => API.get('/logout');

export default API;
