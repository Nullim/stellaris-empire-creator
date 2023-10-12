import { useEffect } from 'react';

import PropTypes from 'prop-types';
import planetClimateColorSelector from '../utils/planetClimateColorSelector';
import planets from "../../../utils/planets.json"

export default function PlanetDescription({ planet }) {
  const { planetName, planetIcon, planetIconDescription, planetClimate, planetDescription } = planet

  useEffect(() => {
    planets.planetList.forEach((planet) => {
      const image = new Image();
      image.src = `${planets.iconsURL + planet.planetIcon}`;
    });
  }, []);

  return (
    <div className='flex flex-col text-left'>
      <p className='font-bold text-center text-xl pb-1'>{planetName}</p>
      <p className='text-left'>
        <img src={`${planets.iconsURL + planetIcon}`} className='inline-block pr-1 pb-1' />{planetIconDescription}
      </p>
      <p className={`${planetClimateColorSelector(planetClimate)}`}>{planetClimate}</p>
      <p className='font-normal italic text-base text-stone-400 '>{planetDescription}</p>
    </div>
  )
}

PlanetDescription.propTypes = {
  planet: PropTypes.shape({
    planetName: PropTypes.string.isRequired,
    planetURL: PropTypes.string.isRequired,
    planetIcon: PropTypes.string.isRequired,
    planetIconDescription: PropTypes.string.isRequired,
    planetClimate: PropTypes.string.isRequired,
    planetDescription: PropTypes.string.isRequired,
  })
}
