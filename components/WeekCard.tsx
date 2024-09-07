'use client';
import React, { useState, useContext, useEffect } from 'react';
import { CityContext } from './context/CityContext';
import IForecast from '@/types/IForecast';

const WeekCard = () => {
    // City Context
    const { cityName, location } = useContext(CityContext);
    const [weather, setWeather] = useState<IForecast[] | null>(null);
    const [icons, setIcons] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (location && location.latitude) {
            getWeather();
        }
    }, [location, cityName]);

    // Fetch with Timeout Function
    const fetchWithTimeout = (url: string, options = {}, timeout = 8000) => {
        return new Promise<Response>((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error("Request timed out"));
            }, timeout);

            fetch(url, options)
                .then((response) => {
                    clearTimeout(timer);
                    resolve(response);
                })
                .catch((err) => {
                    clearTimeout(timer);
                    reject(err);
                });
        });
    };

    // Fetch Weather Data with Retry Mechanism
    const getWeather = async (retryCount = 3) => {
        try {
            setLoading(true);
            setError(null);

            const url =
                cityName === ''
                    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=250693b5cee6c2a54af8ad1bfc705b5f`
                    : `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=250693b5cee6c2a54af8ad1bfc705b5f`;

            console.log(`Fetching: ${url}`);

            const response = await fetchWithTimeout(url, {}, 10000); // 10 seconds timeout
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();

            if (data && data.list && data.list.length > 0) {
                let filteredData: IForecast[] = [];
                // Filter every 7th entry from the list
                for (let i = 0; i < data.list.length; i += 7) {
                    filteredData.push(data.list[i]);
                }
                setWeather(filteredData);
                setError(null);
            } else {
                throw new Error('No weather data available');
            }
        } catch (err) {
            if (retryCount > 0) {
                console.log(`Retrying... Attempts left: ${retryCount}`);
                getWeather(retryCount - 1); // Retry if an error occurs
            } else {
                setError('Failed to fetch weather data. Please try again later.');
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-8 w-full rounded-xl min-h-full">
            <p className='font-semibold text-blue-700 uppercase text-xs'>7 day Forecast</p>

            {/* Header */}
            <div className="flex w-full justify-between py-4 items-center border-b-2 border-gray-200 dark:border-slate-800">
                <p>Date</p>
                <div className="flex items-center">
                    <p className='mx-3'>Climate</p>
                </div>
                <p>min/max</p>
            </div>

            {/* Display Error or Weather Data */}
            {error ? (
                <div className="error-message">
                    <p className="text-red-500">Error: {error}</p>
                    <p>Please check your internet connection or try again later.</p>
                </div>
            ) : loading ? (
                <p>Loading...</p>
            ) : weather ? (
                weather.map((item, index) => (
                    <div key={index} className="flex w-full justify-between py-2 items-center border-b-2 border-gray-200 dark:border-slate-950">
                        <p>{item.dt_txt.slice(8, 10)}-{item.dt_txt.slice(5, 7)}</p>
                        <div className="flex items-center">
                            <img src={item ? `/${item.weather[0].icon}.png` : "/preload.png"} alt="sun" className="object-contain w-14 h-14 my-1 " />
                            <p className='mx-2'>{item.weather[0].main}</p>
                        </div>
                        <p>{Math.round(item.main.temp_min)}/{Math.round(item.main.temp_max)}</p>
                    </div>
                ))
            ) : (
                <p>No weather data available</p>
            )}
        </div>
    );
};

export default WeekCard;
