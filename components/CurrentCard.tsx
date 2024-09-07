'use client';
import React, { useState, useEffect, useContext } from 'react';
import { CityContext } from './context/CityContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DetailCard from './DetailCard';

import IWeather from '@/types/IWeather';

const CurrentCard: React.FC = () => {
    const [weather, setWeather] = useState<IWeather | null>(null);
    const [time, setTime] = useState({ hour: '00', min: '00', sec: '00' });

    // City Context
    const { cityName, setCityName, location } = useContext(CityContext);

    // If location, then create request
    useEffect(() => {
        if (location.latitude && location.longitude) {
            getWeather(location.latitude, location.longitude);
        }
    }, [location, cityName]);

    // Get time
    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const min = String(date.getMinutes()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const sec = String(date.getSeconds()).padStart(2, '0');
            setTime({ hour, min, sec });
        }, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    // Function to get weather
    const getWeather = async (latitude: number, longitude: number) => {
        try {
            const url = cityName === ''
                ? `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=250693b5cee6c2a54af8ad1bfc705b5f`
                : `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=250693b5cee6c2a54af8ad1bfc705b5f`;
            console.log(url);

            const res = await fetch(url);
            if (res.status === 404 || !res.ok) {
                throw new Error('City not found');
            }
            const data = await res.json();
            setWeather(data);
        } catch (error) {
            console.log(error);
            alert('City not found');
            setCityName('');
        }
    };

    return (
        <>
            <div className="main flex p-4 md:px-20">
                {/* Code Web */}
                <div className="text flex flex-col w-1/2 justify-center">
                    <h1 className="text-xl md:text-2xl font-bold my-3">{weather ? weather.name : <Skeleton />}</h1>
                    <p className="text-xs capitalize">{weather ? weather.weather[0].description : <Skeleton />}</p>
                    {weather ? <h1 className="temp-text font-bold text-5xl mt-8">{Math.round(weather.main.temp)}°C</h1> : <Skeleton />}
                    {(weather && cityName === '') ? <h1 className="text-xl font-bold my-3">{time.hour}:{time.min}:{time.sec}</h1> : ''}
                </div>
                <div className="img w-1/2 flex flex-col justify-center items-center">
                    <img src={weather ? `/${weather.weather[0].icon}.png` : "/preload.png"} alt="weather" className="img-weather w-52" />
                    <h3 className="text-cl font-bold text-center"></h3>
                </div>
            </div>

            {weather ? <DetailCard feel={weather.main.feels_like} humidity={weather.main.humidity} pressure={weather.main.pressure} speed={weather.wind.speed} /> : ""}
        </>
    );
};

export default CurrentCard;
