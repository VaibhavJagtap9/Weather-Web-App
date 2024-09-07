
interface IWeather {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        pressure:number;
        humidity:number;
    }
    weather: [{
        main: string;
        description: string;
        icon: string;
    }]
    wind:{
        speed:number;
    }
}

export default IWeather;