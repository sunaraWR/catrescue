import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('cat_rescue_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authAPI = {
    register: (username, email, password) => api.post('/users/register', { username, email, password }),
    login: (username, password) => api.post('/users/login', { username, password }),
    getProfile: (id) => api.get(`/users/profile/${id}`),
    updateProfile: (id, data) => api.put(`/users/profile/${id}`, data),
    changePassword: (id, currentPassword, newPassword) => api.put(`/users/profile/${id}/password`, { currentPassword, newPassword }),
};

export const highscoresAPI = {
    getTop: () => api.get('/highscores'),
    save: (data) => api.post('/highscores', data),
};

export default api;
