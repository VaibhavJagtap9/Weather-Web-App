'use client';

import BingMapsReact from "bingmaps-react";
import { CityContext } from '@/components/context/CityContext'
import { useContext, useEffect, useState } from 'react'
import Loading from "./Loading";


// ... (imports and interface remain unchanged)

const MapBox = () => {
    const [geolocation, setGeolocation] = useState({ lat: 0, lng: 0 });
    const { cityName, location } = useContext(CityContext);


    // Conditionally render push pins based on geolocation
    const pushPin = [{
        center: {
            latitude: geolocation.lat,
            longitude: geolocation.lng,
        },
        options: {
            title: cityName,
            color: "red",
            icon: "/mappin2.png",
        },
    }];


    useEffect(() => {
        if (location.latitude && location.longitude) {
            setGeolocation({ lat: location.latitude, lng: location.longitude });
            console.log("Location:", location);
        }
        console.log("Geolocation:", geolocation);
        console.log(pushPin);
    }, [location, cityName]);

    return (
        <div className="w-full h-full p-4">

            {
                (geolocation.lat === 0 && geolocation.lng === 0) ?
                    <Loading /> : <BingMapsReact
                        bingMapsKey={process.env.NEXT_PUBLIC_BING_MAP_API_KEY}
                        pushPins={pushPin}
                        viewOptions={{ center: { latitude: geolocation.lat, longitude: geolocation.lng } }}
                    />

            }

        </div>
    );
};

export default MapBox;
