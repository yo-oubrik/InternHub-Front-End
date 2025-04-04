import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
