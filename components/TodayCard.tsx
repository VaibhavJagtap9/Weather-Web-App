'use client';

import React, { useState, useContext, useEffect } from 'react';
import { CityContext } from './context/CityContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import IForecast from '@/types/IForecast';

const TodayCard = () => {
    const [weather, setWeather] = useState<IForecast[] | null>(null);
    const { cityName, location } = useContext(CityContext);
    const [icons, setIcons] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getWeather();
    }, [cityName, location.latitude]);

    const getWeather = async () => {
        try {
            const url = cityName === ''
                ? `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=250693b5cee6c2a54af8ad1bfc705b5f`
                : `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=250693b5cee6c2a54af8ad1bfc705b5f`;
            
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.list && data.list.length > 0) {
                let datalist: IForecast[] = data.list.slice(0, 6);
                setWeather(datalist);
            } else {
                setError('No weather data available');
                setWeather(null);
            }
        } catch (err) {
            setError('Failed to fetch weather data');
            console.error(err);
            setWeather(null);
        }
    };

    return (
        <div className="flex flex-col bg-gray-100 dark:bg-slate-900 md:p-8 p-4 w-full rounded-xl">
            <p className='font-semibold text-blue-700 uppercase text-xs'>Today's Forecast</p>
            <div className="flex flex-row flex-wrap md:flex-nowrap overflow-x-scroll">
                {error ? (
                    <p>{error}</p>
                ) : weather ? (
                    weather.map((data, index) => (
                        <div key={index} className="w-1/2 flex flex-col justify-center items-center mt-4 md:border-r border-gray-400">
                            <p className="text-xs">{data.dt_txt.slice(11, 16)}</p>
                            <img 
                                src={`/${data.weather[0].icon}.png`} 
                                className='object-contain my-1.5' 
                                alt="weather icon" 
                                style={{ width: '50px', height: '50px' }} 
                            />
                            <p className="text-md font-bold">{data.main.temp}°C</p>
                        </div>
                    ))
                ) : (
                    <div className="h-24 w-full">
                        <Skeleton />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodayCard;
