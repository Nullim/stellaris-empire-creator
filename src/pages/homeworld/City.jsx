import { useState, useEffect } from "react";

import CitySelection from "./layout/CitySelection";
import cities from "../../utils/cities.json"

export default function City() {
  const [selectedCity, setSelectedCity] = useState(null)

  useEffect(() => {
    const getParamsFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const selectedCityParam = params.get('hP');

      if (selectedCityParam) {
        const cityFound = cities.cityList.find((city) => city.cityId === parseInt(selectedCityParam))
        if (cityFound) {
          setSelectedCity(cityFound)
        }
      }
    };
    getParamsFromURL();
  }, [])

  const handleCityClick = (city) => {
    if (city === selectedCity) return;
    setSelectedCity(city)
    const params = new URLSearchParams(window.location.search);
    params.set('hC', city.cityId);
    window.history.replaceState({}, '', `?${params.toString()}`)
    window.dispatchEvent(new Event('popstate'))
  }

  return (
    <div className="flex flex-col font-semibold h-full 
      overflow-y-auto scrollbar scrollbar-thumb-blue-800 scrollbar-track-transparent
    ">
      <div className="flex w-full">
        <div className="flex flex-col h-full w-full items-center">
          <div className="flex flex-col w-1/8">
            <label className="text-orange-400">Room Selection:</label>
            <input
              className="border-2 border-gray-500 bg-black/40 backdrop-blur-md font-normal pl-1 outline-none focus:border-blue-500"
              value="test"
              disabled
            ></input>
          </div>
          <CitySelection handleCityClick={handleCityClick} selectedCity={selectedCity} />
        </div>
      </div>
    </div>
  )
}