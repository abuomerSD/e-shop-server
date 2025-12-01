import axios from 'axios'
import { API_TEST_URL } from '../config/env.config'


// Create Axios Instance for E2E Testing
const api = axios.create({
    baseURL: API_TEST_URL,
    timeout: 5000,
    headers: {
        'Content-Type': "application/json",
    },
});

export const setToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};


export default api;