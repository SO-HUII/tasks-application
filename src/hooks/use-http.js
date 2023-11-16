import React, { useCallback, useState } from 'react';

const useHttp = (applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback (async (responseConfig) => {
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
    }, [applyData]);
    return {
        isLoading,  // === isLoading: isLoading
        error,
        sendRequest
    }
};

export default useHttp;