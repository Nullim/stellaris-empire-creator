import PropTypes from 'prop-types';

import planets from "../../../utils/planets.json";
import planetTypeColorSelector from "../utils/planetTypeColorSelector";

export default function PlanetSelection({ handleHoverStatus, handlePlanetClick, selectedPlanet }) {
  function planetsColumn(planetList) {
    const planetsToDisplay = planetList;
    const planetType = planetsToDisplay[0].planetType;
    const isPlanetTypeIdentical = (planet) => planet.planetType === planetType;
    const validatedPlanetTypes = planetsToDisplay.every(isPlanetTypeIdentical)
  
    return (
      <div className="flex flex-col h-full w-full">
        <span className={`${planetTypeColorSelector(planetType, validatedPlanetTypes)} select-none`}>{planetType}</span>
        <div className="flex flex-col items-center w-full h-full bg-black/40">
          {planetsToDisplay.map((planet) => (
            <div
              key={planet.planetId}
              style={{ backgroundImage: `url(${planet.planetURL + planet.planetSky})` }}
              onMouseEnter={() => handleHoverStatus(planet, true)}
              onMouseLeave={() => handleHoverStatus(planet, false)}
              onClick={() => handlePlanetClick(planet)}
              className={`bg-cover w-full h-full object-contain border ${planet === selectedPlanet ? 'border-cyan-400' : 'border-gray-500'}`}
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
      {planetsColumn(planets.planetList.slice(0, 3))}
      {planetsColumn(planets.planetList.slice(3, 6))}
      {planetsColumn(planets.planetList.slice(6, 9))}
    </div>
  )
}

PlanetSelection.propTypes = {
  handleHoverStatus: PropTypes.func.isRequired,
  handlePlanetClick: PropTypes.func.isRequired,
  selectedPlanet: PropTypes.object
}
