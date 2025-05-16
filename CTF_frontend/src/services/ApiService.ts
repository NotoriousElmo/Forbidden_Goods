import axios from 'axios';

const getFrontendPort = () => {
    return window.location.port || '3000';
};

const getBackendPort = () => {
    const frontendPort = parseInt(getFrontendPort());
    return frontendPort - 3000 + 4000;
};

const getHost = () => {
    return window.location.host.split(':')[0];
};

const API_BASE_URL = process.env.REACT_APP_API_URL || `http://${getHost()}:${getBackendPort()}/v1`;

const ApiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token: string) => {
    if (token) {
        ApiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete ApiService.defaults.headers.common['Authorization'];
    }
};

export default ApiService;