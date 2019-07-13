import axios from 'axios';

const api = axios.create({
    baseURL: 'https://github.com/augustomarcelo/demo',
});

export default api;
