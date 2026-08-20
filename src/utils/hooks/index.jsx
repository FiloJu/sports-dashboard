import { useState, useEffect } from 'react';
import USER_MOCK_DATA from '../../data.json';

const IS_MOCKED = true;


export function useFetch(url, token = null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (IS_MOCKED) {
            setTimeout(() => {
                const mockUser = USER_MOCK_DATA[0];

                if (url.includes('user-info')) {
                    const stats = {
                        totalSessions: mockUser.runningData.length,
                        totalDistance: mockUser.runningData.reduce((total, jour) => total + jour.distance, 0),
                        totalDuration: mockUser.runningData.reduce((total, jour) => total + jour.duration, 0),
                        totalCalories: mockUser.runningData.reduce((total, jour) => total + jour.caloriesBurned, 0)
                    };
                    setData({
                        profile: mockUser.userInfos,
                        statistics: stats
                    });

                } else if (url.includes('user-activity')) {
                    setData(mockUser.runningData);
                }
            }, 500);

        }
        else {
            const fetchData = async () => {
                try {
                    const response = await fetch(url, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const result = await response.json();
                    setData(result);
                } catch (err) {
                    setError(err);
                }
            };
            fetchData();
        }
    }, [url, token]);

    return { data, error };
}