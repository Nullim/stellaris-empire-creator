import { useEffect, useState } from "react"
import PlanetDescription from "./layout/PlanetDescription";
import PlanetSelection from "./layout/PlanetSelection";

import planets from "../../utils/planets.json";

export default function Planet() {
  const [planetName, setPlanetName] = useState('');
  const [starName, setStarName] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState();
  const [hoveredPlanet, setHoveredPlanet] = useState(null)

  useEffect(() => {
    const getParamsFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const planetNameParam = params.get('hPN');
      const starNameParam = params.get('hSN');
      const selectedPlanetParam = params.get('hP');

      if (planetNameParam) setPlanetName(planetNameParam);
      if (starNameParam) setStarName(starNameParam);
      if (selectedPlanetParam) {
        const planetFound = planets.planetList.find((planet) => planet.planetId === parseInt(selectedPlanetParam))
        console.log("Planet Found value:", planetFound)
        if (planetFound) {
          setSelectedPlanet(planetFound)
        }
      }
    };
    getParamsFromURL();
  }, [])

  function changePlanetName(e) {
    const nameToSet = e.target.value;
    setPlanetName(nameToSet);
    const params = new URLSearchParams(window.location.search);
    params.set('hPN', nameToSet);
    window.history.replaceState({}, '', `?${params.toString()}`)
    window.dispatchEvent(new Event('popstate'))
  }

  function changeStarName(e) {
    const nameToSet = e.target.value;
    setStarName(nameToSet);
    const params = new URLSearchParams(window.location.search);
    params.set('hSN', nameToSet);
    window.history.replaceState({}, '', `?${params.toString()}`)
    window.dispatchEvent(new Event('popstate'))
  }

  const handleHoverStatus = (planet, isHovered) => {
    if (isHovered) {
      setHoveredPlanet(planet)
    } else if (selectedPlanet) {
      setHoveredPlanet(null)
    }
  }

  const handlePlanetClick = (planet) => {
    if (planet === selectedPlanet) return;
    setSelectedPlanet(planet)
    const params = new URLSearchParams(window.location.search);
    params.set('hP', planet.planetId);
    window.history.replaceState({}, '', `?${params.toString()}`)
    window.dispatchEvent(new Event('popstate'))
  }

  return (
    <div className="flex flex-col font-semibold px-5 gap-5 h-full
      overflow-y-auto scrollbar scrollbar-thumb-blue-800 scrollbar-track-transparent
    ">
      <div className="flex justify-center w-full">
        <div className="flex font-thin">
          <div className="flex flex-col pt-1 px-4">
            <label className="text-orange-400">Planet Name:</label>
            <input
              className="border-2 border-gray-500 bg-black/40 backdrop-blur-md font-normal pl-1 outline-none focus:border-blue-500"
              value={planetName}
              maxLength={15}
              onChange={changePlanetName}
            ></input>
          </div>
          <div className="flex flex-col pt-1 px-4">
            <label className="text-orange-400">Star Name:</label>
            <input
              className="border-2 border-gray-500 bg-black/40 backdrop-blur-md font-normal pl-1 outline-none focus:border-blue-500"
              value={starName}
              maxLength={15}
              onChange={changeStarName}
            ></input>
          </div>
          <div className="flex flex-col pt-1 px-4">
            <label className="text-orange-400">Starting Solar System:</label>
            <div className="flex">
              <input
                className="border-2 border-gray-500 bg-black/40 backdrop-blur-md font-thin pl-1 w-auto text-center"
                value="test"
                disabled
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full mb-1">
        <div className="flex flex-col w-1/4">
          <span className="text-center">Planet Type</span>
          <div className="flex-grow border-2 border-gray-500 bg-black/40 p-2 font-normal max-h-60 overflow-y-auto scrollbar scrollbar-thumb-blue-800 scrollbar-track-transparent">
            {hoveredPlanet ? (
              <PlanetDescription planet={hoveredPlanet} />
            ) : selectedPlanet ? (
              <PlanetDescription planet={selectedPlanet} />
            ) : "Hover over a planet to see its description!"}
          </div>
        </div>
        <PlanetSelection
          handleHoverStatus={handleHoverStatus}
          handlePlanetClick={handlePlanetClick}
          selectedPlanet={selectedPlanet}
        />
      </div>
    </div>
  )
}