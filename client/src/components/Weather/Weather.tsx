import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import OneDay from "./OneDay";
import { useAppSelector } from "../../redux/hooks";
import { IWeather } from "../../types/stateTypes";

export default function Weather(): JSX.Element {
  const [weather, setWeather] = useState<IWeather[]>([]);
  const { user } = useAppSelector((state) => state.authSlice);
  const API_key: string = "79f3c4d083bc6c52103c7a29793a033a";

  useEffect(() => {
    async function fetchWeather(): Promise<void> {
      try {
        const { data: geoCode }: AxiosResponse = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${user.city}&limit=1&appid=${API_key}`
        );

        const { data }: AxiosResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${geoCode[0].lat}&lon=${geoCode[0].lon}&appid=${API_key}`
        );

        const uniqueDates: Set<string> = new Set();
        const filteredList: IWeather[] = data.list.filter(
          (item: IWeather): boolean => {
            const date: string = item.dt_txt.slice(0, 10);
            const time: string = item.dt_txt.slice(11, 16);
            if (time === "12:00" && !uniqueDates.has(date)) {
              uniqueDates.add(date);
              return true;
            }
            return false;
          }
        );

        setWeather(filteredList);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchWeather();
  }, [user.city, API_key]);

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {weather.map((day: IWeather, i: number) => (
          <OneDay key={i + 1} day={day} />
        ))}
      </div>
    </>
  );
}
