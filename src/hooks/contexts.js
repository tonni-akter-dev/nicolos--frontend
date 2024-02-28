// UseClientContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate asynchronous initialization (e.g., fetching user data from an API)
        const initializeUser = async () => {
            try {
                // Perform asynchronous data fetching or initialization here
                // For example:
                // const userData = await fetchUserData();
                // setUser(userData);
            } catch (error) {
                console.error('Error initializing user:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeUser();

        // Clean-up function (if needed)
        return () => {
            // Perform any clean-up actions here
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const login = (userData) => {
        // Perform asynchronous state update
        setUser(userData);
    };

    const logout = () => {
        // Perform asynchronous state update
        setUser(null);
    };

    if (loading) {
        // Optionally, you can render a loading indicator while initializing the user
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
