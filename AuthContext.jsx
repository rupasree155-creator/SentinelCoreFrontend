import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login as loginApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [role, setRole] = useState(null);

    const login = async (username, password) => {
        const response = await loginApi(username, password);

        const { accessToken, refreshToken } = response.data;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        const decoded = jwtDecode(accessToken);

        setRole(decoded.role);
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                role,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};