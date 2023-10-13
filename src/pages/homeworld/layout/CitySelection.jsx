import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import cities from "../../../utils/cities.json";
import planets from "../../../utils/planets.json";
import LoadingScreen from '../../../components/layout/LoadingScreen';

export default function CitySelection({ handleCityClick, selectedCity }) {
  const [isLoading, setIsLoading] = useState(true)
  const cityList = cities.cityList;

  useEffect(() => {
    const imagePromises = cities.cityList.map(city => {
      const image = new Image();
      image.src = cities.baseURL + city.ecumenopolis;
      return new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setIsLoading(false))
  }, []);

  return (
    <div className="flex flex-col w-full h-full mt-2 bg-black/40">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full h-full">
          {cityList.map((city) => (
            <div
              key={city.cityId}
              // Continental World sky for background
              style={{ backgroundImage: `url(${planets.planetList[4].planetURL + planets.planetList[4].planetSky})` }}
              onClick={() => handleCityClick(city)}
              className={`relative bg-cover text-center w-full h-full object-contain border-2 cursor-pointer
              ${city === selectedCity ? 'border-cyan-400' : 'border-gray-500'}
              `}
            >
              <p className="absolute top-0 left-0 w-full text-center bg-black/40">{city.cityName}</p>
              <img src={cities.baseURL + city.ecumenopolis} className="max-w-full h-full object-contain object-bottom" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

CitySelection.propTypes = {
  handleCityClick: PropTypes.func.isRequired,
  selectedCity: PropTypes.object
}
