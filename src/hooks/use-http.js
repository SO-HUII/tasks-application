import React, { useState } from 'react';

const useHttp = (responseConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (taskText) => {
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await fetch(
                responseConfig.url, {
                    method: responseConfig.method ? responseConfig.method : 'GET',
                    headers: responseConfig.headers ? responseConfig.headers : {},
                    body: responseConfig.body ? JSON.stringify(responseConfig.body) : null,
                }
            );
    
            if(!response.ok) {
                throw new Error('Request failed!');
            }
            const data = await response.json();
            applyData(data);

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };
    return {
        isLoading,  // === isLoading: isLoading
        error,
        sendRequest
    }
};

export default useHttp;