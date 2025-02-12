import React, { useEffect, useState } from 'react';

const GoldRate = () => {
    const [goldRate, setGoldRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGoldRate = async () => {
            try {
                // const response = await fetch('https://www.iifl.com/getgoldrate');
                const response = await fetch('http://localhost:5000/api/goldrate');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGoldRate(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGoldRate();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Current Gold Rate</h1>
            <p>{goldRate.rate ? `Gold Rate: ${goldRate.rate}` : 'No data available'}</p>
        </div>
    );
};

export default GoldRate;