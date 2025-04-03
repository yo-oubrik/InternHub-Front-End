import axios from "@/lib/axios";

const getValidToken = () => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const expirationTime = expiresIn ? parseInt(expiresIn, 10) : 0;

    if (!token || !(Date.now() < expirationTime)) {
        return null;
    }
    return token;
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