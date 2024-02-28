'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

import instance from '../hooks/instance'

const truckContext = createContext();

const TruckProvider = ({ children }) => {

    const [initialValue, setInitialValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('/api/truck/getAllTrucks');
                setInitialValue(response.data);
            } catch (error) {
                console.error('Error fetching data from the database:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <truckContext.Provider value={initialValue}>
            {children}
        </truckContext.Provider>
    );
};

const useTruckContext = () => {
    
    const contextValue = useContext(truckContext);

    if (contextValue === undefined) {
        throw new Error('useTruckContext must be used within a TruckProvider');
    }

    return contextValue;
};

export { TruckProvider, useTruckContext };
