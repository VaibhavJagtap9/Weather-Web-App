interface IForecast {
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
    }
    weather: [{
        main: string;
        icon: string;
    }]
    dt_txt: string;
}

export default IForecast;