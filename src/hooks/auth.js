// hooks/auth.js

import { useState, useEffect } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkAuth = () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
                setLoading(false);
            } else {
                setLoading(false);
            }
        };
        checkAuth();

        return () => {

        };
    }, []);

    return { user, loading };
};

export default useAuth;
