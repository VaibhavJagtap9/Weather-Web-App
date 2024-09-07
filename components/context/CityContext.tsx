'use client';
import React, { createContext, useState, FC, ReactNode,useEffect } from 'react';

// Creating interface for context
interface CityContextProps {
  cityName: string;
  setCityName: (city: string) => void;
  location: { latitude: number; longitude: number };
  setLocation: (location: { latitude: number; longitude: number }) => void;
}

interface Props {
  children?: ReactNode;
}

const CityContext = createContext<CityContextProps>({
  cityName: '',
  setCityName: () => {},
  location: { latitude: 0, longitude: 0 },
    setLocation: () => {},
});

const CityProvider: FC<Props> = ({ children }: Props) => {
  const [cityName, setCityName] = useState('');
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

   //Get location
   useEffect(() => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            setLocation({ latitude, longitude });
        })
    }

    
}, []);

  return (
    <CityContext.Provider value={{ cityName, setCityName,location,setLocation }}>
      {children}
    </CityContext.Provider>
  );
};

export { CityContext, CityProvider };
