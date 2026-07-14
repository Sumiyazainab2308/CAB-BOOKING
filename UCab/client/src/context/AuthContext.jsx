import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('ucab_token') || null);
    const [role, setRole] = useState(localStorage.getItem('ucab_role') || null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem('ucab_theme') || 'light');
    const [toast, setToast] = useState(null);

    // Set axios default authorization header
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Apply theme attribute on mount and change
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('ucab_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => {
            setToast(null);
        }, 4000);
    };

    // Load initial user/admin profile if token exists
    useEffect(() => {
        const fetchProfile = async () => {
            if (!token || !role) {
                setLoading(false);
                return;
            }
            try {
                if (role === 'admin') {
                    // We can verify admin token against an endpoint or restore state from local storage
                    const savedAdmin = localStorage.getItem('ucab_admin_data');
                    if (savedAdmin) {
                        setAdmin(JSON.parse(savedAdmin));
                    }
                } else {
                    const res = await axios.get('http://localhost:8000/api/users/profile');
                    setUser(res.data);
                }
            } catch (err) {
                console.error("Session verification failed:", err.message);
                logout();
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token, role]);

    const loginUser = (userData, jwtToken) => {
        setUser(userData);
        setAdmin(null);
        setToken(jwtToken);
        setRole('user');
        localStorage.setItem('ucab_token', jwtToken);
        localStorage.setItem('ucab_role', 'user');
        localStorage.setItem('ucab_user_data', JSON.stringify(userData));
        showToast(`Welcome back, ${userData.name}! 🚕`, 'success');
    };

    const loginAdmin = (adminData, jwtToken) => {
        setAdmin(adminData);
        setUser(null);
        setToken(jwtToken);
        setRole('admin');
        localStorage.setItem('ucab_token', jwtToken);
        localStorage.setItem('ucab_role', 'admin');
        localStorage.setItem('ucab_admin_data', JSON.stringify(adminData));
        showToast(`Admin Logged In: ${adminData.name} 🛡️`, 'success');
    };

    const logout = () => {
        setUser(null);
        setAdmin(null);
        setToken(null);
        setRole(null);
        localStorage.removeItem('ucab_token');
        localStorage.removeItem('ucab_role');
        localStorage.removeItem('ucab_user_data');
        localStorage.removeItem('ucab_admin_data');
        delete axios.defaults.headers.common['Authorization'];
        showToast('Successfully logged out', 'info');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                admin,
                setAdmin,
                token,
                role,
                loading,
                loginUser,
                loginAdmin,
                logout,
                theme,
                toggleTheme,
                toast,
                showToast
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
