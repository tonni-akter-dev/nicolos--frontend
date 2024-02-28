'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

import instance from '../hooks/instance'

const driverContext = createContext();

const DriverProvider = ({ children }) => {
  const [initialValue, setInitialValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/user/getAllUser');
        setInitialValue(response.data);
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <driverContext.Provider value={initialValue}>
      {children}
    </driverContext.Provider>
  );
};

const useDriverContext = () => {
  const contextValue = useContext(driverContext);

  if (contextValue === undefined) {
    throw new Error('useDriverContext must be used within a DriverProvider');
  }

  return contextValue;
}; 

export { DriverProvider, useDriverContext };
