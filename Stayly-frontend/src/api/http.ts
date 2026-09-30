import axios from "axios";
import { userStore } from "../store/userStore";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

const publicAuthPaths = ["/api/auth/register", "/api/auth/login"];

const isPublicAuthRequest = (url?: string) =>
    publicAuthPaths.some((path) => url?.endsWith(path));

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    } else if (!isPublicAuthRequest(config.url)) {
        console.warn("⚠️ No token found in localStorage for request to", config.url);
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const isAuthenticated =
            userStore.getState().isAuthenticated;

        if (
            status === 401 &&
            isAuthenticated &&
            !isPublicAuthRequest(error.config?.url)
        ) {
            console.error(
                `❌ ${status} response for`,
                error.config?.url
            );

            userStore.getState().logout();
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default apiClient;