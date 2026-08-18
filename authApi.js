import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = (username, password) =>
    axios.post(`${API_URL}/login`, {
        username,
        password
    });

export const refreshAccessToken = (refreshToken) =>
    axios.post(
        `${API_URL}/refresh`,
        { refreshToken }
    );