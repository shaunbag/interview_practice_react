import { useState } from "react"
import type { ForecastItem, WeatherResponse } from "./types/Types"
import DayForecastList from "./weatherComponents/DayForecastList";

// a Record to be used when grouping the Forecasts by day
type ForecastByDay = Record<string, ForecastItem[]>;

export default function Weather() {

    const [input, setInput] = useState("")
    const [grouped, setGrouped] = useState<ForecastByDay>()

    // async api calls to get city details for lat lon especially for calling the forecast api
    async function getCityCode() {
        // trim whitespace from inputs
        let cleanInput = input.trim()

        try {
            let res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cleanInput}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)

            if (!res.ok) throw new Error("Failed to Fetch City")
            let data = await res.json()
            if (data) {
                console.log(data)
                // pass the recieved lat lon into the Five Day Forecast call
                getFiveDayForecast(data[0].lat, data[0].lon)
            }

        } catch (e) {
            console.log(e)
        }
    }

    async function getFiveDayForecast(lat: number, lon: number) {
        try {
            let res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)

            if (!res.ok) throw new Error("Failed to Fetch Forecast")
            let data = await res.json() as WeatherResponse
            if (data.list.length > 0) {
                console.log(data)
                // call the grou function to set grouped Record to forecasts grouped by day
                setGrouped(groupForecastByDay(data.list))
            }

        } catch (e) {
            console.log(e)
        }
    }


    function groupForecastByDay(list: ForecastItem[]) {
        // take the List past in and reduce it returning the accumulator with associated items pushed to the ForecastItem array keyed by day
        return list.reduce<ForecastByDay>((acc, item) => {
            const dayKey = item.dt_txt.split(" ")[0] // here we split the dt_text to just the date, full format is date and time

            if(!acc[dayKey]){
                acc[dayKey] = []
            }

            acc[dayKey].push(item)
            return acc
        }, {})
    }

    return (
        <>
            <h1>Weather Forecast</h1>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={getCityCode}>Find</button>
            {
                grouped && (
                    <DayForecastList grouped={grouped}/>
                )
            }
            
        </>
    )
}