import type { ForecastItem } from "../types/Types"
import DayForecast from "./DayForecast"

type Props = {
    grouped: Record<string, ForecastItem[]>
}

export default function DayForecastList({grouped}: Props){

    /**
     * in the return function here we map through Object entries of the grouped record passed via props
     * this allows us to pass day and items associated by day to the DayForecast component
     */
    return(
        <>
            {
               grouped &&( Object.entries(grouped).map(([date, items]) => {
                   return <DayForecast key={date} day={date} items={items}/>
                }))
            }
        </>
    )

}