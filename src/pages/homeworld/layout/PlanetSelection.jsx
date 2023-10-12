import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import planets from "../../../utils/planets.json";
import planetTypeColorSelector from "../utils/planetTypeColorSelector";

export default function PlanetSelection({ handleHoverStatus, handlePlanetClick, selectedPlanet }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imagePromises = planets.planetList.map((planet) => {
      return new Promise((resolve, reject) => {
        const skyImage = new Image();
        const planetImage = new Image();
  
        skyImage.onload = () => {
          planetImage.onload = () => {
            resolve();
          };
          planetImage.onerror = reject;
          planetImage.src = planet.planetURL + planet.planetSmall;
        };
        skyImage.onerror = reject;
        skyImage.src = planet.planetURL + planet.planetSky;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setIsLoading(false);
      })
  }, []);

  function planetsColumn(planetList) {
    const planetsToDisplay = planetList;
    const planetType = planetsToDisplay[0].planetType;
    const isPlanetTypeIdentical = (planet) => planet.planetType === planetType;
    const validatedPlanetTypes = planetsToDisplay.every(isPlanetTypeIdentical)
  
    return (
      <div className="flex flex-col h-full w-full mx-2">
        <span className={`${planetTypeColorSelector(planetType, validatedPlanetTypes)} m-0 select-none`}>{planetType}</span>
        <div className="flex flex-col items-center w-full h-full">
          {planetsToDisplay.map((planet) => (
            <div
              key={planet.planetId}
              style={{ backgroundImage: `url(${planet.planetURL + planet.planetSky})` }}
              onMouseEnter={() => handleHoverStatus(planet, true)}
              onMouseLeave={() => handleHoverStatus(planet, false)}
              onClick={() => handlePlanetClick(planet)}
              className={`bg-cover w-full h-full mb-2 object-contain border-2 cursor-pointer
              ${planet === selectedPlanet ? 'border-cyan-400' : 'border-gray-500'}
              `}
            >
              <img src={planet.planetURL + planet.planetSmall} className="max-w-full h-full object-contain object-bottom" />
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-center items-center h-full w-full text-center ml-5">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-700"></div>
          <p className="mt-2">Loading...</p>
        </div>
      ) : (
        <>
          {planetsColumn(planets.planetList.slice(0, 3))}
          {planetsColumn(planets.planetList.slice(3, 6))}
          {planetsColumn(planets.planetList.slice(6, 9))}
        </>
      )}
    </div>
  )
}

PlanetSelection.propTypes = {
  handleHoverStatus: PropTypes.func.isRequired,
  handlePlanetClick: PropTypes.func.isRequired,
  selectedPlanet: PropTypes.object
}
