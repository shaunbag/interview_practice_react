import type { ForecastItem } from "../types/Types";

type Props = {
    day: string;
    items: ForecastItem[];
}

export default function DayForecast({day, items}: Props){

    /**
     * lots todo here, we need to style this correctly
     * currently we are just displaying basic data as proof of concept
     * also using the icon string to fetch the weather icons from openweathermap 
     */
    return(
        <div>
            <hr/>
            <h3>{day}</h3>
            <div style={{ display: "flex", flexDirection: "row"}}>
            {
                items.map(item => {
                    return <div key={item.dt}>{item.dt_txt} <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/></div>
                })
            }
            </div>
            
        </div>
    )
}