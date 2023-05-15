"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Weather() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const notify = () => toast("Wow so easy!");
    const API_KEY = "27c8bb45ee131ef608760b088cee09af";
    const search = async (evt: any) => {
        setLoading(true);
        if (evt.key === "Enter") {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
                );
                setWeather(res.data);
                setQuery("");
                setLoading(false);
            } catch (error) {
                console.log(error);
                setErrorMessage("Enter another city name for exploring weather");
                setLoading(false);
            }
        };
    };
    const getWeatherIcon = (iconCode: string) => {
        return `https://openweathermap.org/img/w/${iconCode}.png`;
    };

    const dateBuilder = (d: Date) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-orange-700">Weather App</h2>
                </div>
                <div className="flex items-center justify-center">
                    <input
                        className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        type="text"
                        placeholder="Enter city name"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {loading && <p>Loading...</p>}
    {errorMessage && <p className="error-message">{errorMessage}</p>}
                {weather && (
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
                        <div className="text-center">
                            <div className="text-gray-600">{dateBuilder(new Date())}</div>
                            <div className="text-gray-600">{weather.name}, {weather.sys.country}</div>
                        </div>
                        <img
                            src={getWeatherIcon(weather.weather[0].icon)}
                            alt={weather.weather[0].description}
                        />
                        <div className="mt-6">
                            <div className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</div>
                            <div className="text-gray-700">Wind Speed: {Math.round(weather.wind.speed)} m/s</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
