import axios from "@/lib/axios";
import toast from "react-hot-toast";

export const getValidToken = () => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const expirationTime = expiresIn ? parseInt(expiresIn, 10) : 0;
    if (!(Date.now() < expirationTime)) {
        console.error("Auth token expired");
    }
    if (!token) {
        console.error("Auth token is null")
        return null;
    }
    return token;
};

export const RequestWithAuth = async (url: string, options?: {
    method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
    body?: any;
    params?: any;
}) => {
    try {
        const token = getValidToken();
        if (!token) {
            return null;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            ...(options?.params ? { params: options.params } : {}),
            ...(options || {})
        };
        let response;
        switch (options?.method) {
            case 'PUT':
                response = await axios.put(url, options.body, config);
                break;
            case 'POST':
                response = await axios.post(url, options.body, config);
                break;
            case 'DELETE':
                response = await axios.delete(url, config);
                break;
            default:
                response = await axios.get(url, config);
                break;
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchWithAuth = async (url: string) => {
    try {
        const token = getValidToken();
        if (!token) {
            return null;
        }

        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const deleteWithAuth = async (url: string) => {
    try {
        const token = getValidToken();
        if (!token) {
            return false;
        }

        const res = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return true;
    } catch (error) {
        console.error("Error deleting data:", error);
        return false;
    }
}

export const putWithAuth = async (endpoint: string, requestBody: any, errorMessage: string, successMessage: string): Promise<boolean> => {
    const token = getValidToken();
    if (!token) {
        toast.error(errorMessage, {
            id: endpoint,
        });
        return false;
    }

    try {
        const response = await axios.put(
            endpoint,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Check if response was successful
        if (response.status >= 200 && response.status < 300) {
            toast.success(successMessage, {
                id: endpoint,
            });
            return true;
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    } catch (error) {
        toast.error(errorMessage, {
            id: endpoint,
        });
        console.error(errorMessage, error);
        return false;
    }
}

