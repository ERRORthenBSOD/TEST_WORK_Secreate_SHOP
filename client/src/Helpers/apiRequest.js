import axios from 'axios';

export default function apiRequest(url, method, headers, data) {
    const config = {
        url,
        method,
        data,
    };

    const access_token = localStorage.getItem('access_token');

    if (access_token && typeof access_token !== 'undefined') {
        if (headers) {
            headers.Authorization = `Bearer ${access_token}`;
        } else {
            headers = {};
        }
    }

    config.headers = headers;

    return axios(config);
}
