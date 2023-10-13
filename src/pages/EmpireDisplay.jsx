import { useEffect, useState } from "react"

import speciesData from "../utils/species.json";
import speciesTraits from "../utils/speciesTraits.json";
import planets from "../utils/planets.json"
import rooms from "../utils/rooms.json";
import cities from "../utils/cities.json"
import LoadingScreen from "../components/layout/LoadingScreen";

export default function EmpireDisplay() {
  const [requiredParams, setRequiredParams] = useState(false);
  const [speciesType, setSpeciesType] = useState(null);
  const [speciesPortrait, setSpeciesPortrait] = useState(null);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [speciesPlanet, setSpeciesPlanet] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [planetName, setPlanetName] = useState('')
  const [starName, setStarName] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  function handleUrlChange() {
    const params = new URLSearchParams(window.location.search);
    const speciesParam = params.get('sN')
    const speciesTraitsParam = params.get('sT')
    const portraitParam = params.get('sP')
    const selectedPlanetParam = params.get('hP')
    const selectedRoomParam = params.get('hR');
    const selectedCityParam = params.get('hC');
    const planetNameParam = params.get('hPN');
    const starNameParam = params.get('hSN');

    if (speciesParam && portraitParam) {
      const foundSpecies = speciesData.find(species => species.name === speciesParam);
      if (foundSpecies) {
        setSpeciesType(foundSpecies)
        setSpeciesPortrait(portraitParam)
      }
    }
    if (selectedPlanetParam) {
      const planetFound = planets.planetList.find((planet) => planet.planetId === parseInt(selectedPlanetParam))
      console.log(planetFound)
      if (planetFound) {
        setSpeciesPlanet(planetFound)
      }
    }
    if (selectedRoomParam) {
      const roomFound = rooms.roomList.find((room) => room.roomId === parseInt(selectedRoomParam))
      if (roomFound) {
        setSelectedRoom(roomFound)
      }
    }
    if (speciesParam && portraitParam && selectedPlanetParam && selectedRoomParam) {
      setRequiredParams(true)
    }

    if (speciesTraitsParam || speciesParam === 'Machine' || speciesParam === 'Lithoid') {
      const urlTraitIds = params.getAll('sT');
      let traitsToLoad;
      urlTraitIds.length > 0 ? traitsToLoad = urlTraitIds[0].split('-').map(Number) : traitsToLoad = [];

      if (speciesParam === 'Machine') {
        traitsToLoad.push(46)
      } else if (speciesParam === 'Lithoid') {
        traitsToLoad.push(67)
      }

      const traitsToSet = speciesTraits.traits.filter((trait) => traitsToLoad.includes(trait.traitId))
      setSelectedTraits(traitsToSet)
    } else {
      setSelectedTraits([])
    }

    if (starNameParam) {
      setStarName(starNameParam)
    } else {
      setStarName('None')
    }
    if (planetNameParam) {
      setPlanetName(planetNameParam)
    } else {
      setPlanetName('None')
    }

    if (selectedCityParam) {
      const cityFound = cities.cityList.find((city) => city.cityId === parseInt(selectedCityParam))
      if (cityFound) {
        setSelectedCity(cityFound)
      }
    }
  }

  useEffect(() => {
    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);

    const imagePromises = rooms.roomList.map(room => {
      const image = new Image();
      image.src = rooms.baseURL + room.roomImage;
      return new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setIsLoading(false);
      })
  }, [])

  function selectURL(trait) {
    if (trait.type === 'Organic') {
      return speciesTraits.organicUrl + trait.traitImage
    } else if (trait.type === 'Machine') {
      return speciesTraits.machineUrl + trait.traitImage
    } else if (trait.type === 'Lithoid') {
      return speciesTraits.lithoidUrl + trait.traitImage
    } else if (trait.type === 'Botanical') {
      return speciesTraits.botanicalUrl + trait.traitImage
    }
  }

  return (
    <div className="flex flex-col w-full h-full items-center bg-black/40 box-border">
      {requiredParams ? (
        <div className="flex h-full w-full justify-center">
          <div className="hidden lg:flex flex-col h-1/2 w-1/5 bg-black/40 border-x border-blue-700 fixed left-0 z-40">
            <div className="h-full bg-black/40 border-2 border-gray-500 p-2 m-2 
              overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-800/70"
            >
              <p className="pb-1 select-none underline">Species Traits:</p>
              {selectedTraits.length > 0 ? (
                <div>
                  {selectedTraits.map((trait) => (
                    <div
                      className="border-2 bg-gray-900/70 border-gray-700 p-2 mb-2 last-of-type:mb-0 flex items-center justify-between"
                      key={trait.traitId}
                    >
                      <div className='flex items-center'>
                        <img src={selectURL(trait)} />
                        <p className='pl-2 select-none'>{trait.traitName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="select-none">None</p>
              )}
            </div>
            <div className="h-full border-2 border-gray-500 p-2 m-2 bg-black/40">
              <p className="pb-1 select-none underline">Ethics:</p>
              <p>--IN DEVELOPMENT--</p>
            </div>
            <div className="h-full border-2 border-gray-500 p-2 m-2 bg-black/40">
              <p className="pb-1 select-none underline">Civics:</p>
              <p>--IN DEVELOPMENT--</p>
            </div>
          </div>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <div className="flex h-full relative">
              <p className="absolute top-0 text-center"></p>
              {/*Planet Sky as background*/}
              <img
                className="absolute w-full h-full object-fill"
                src={`${speciesPlanet.planetURL + speciesPlanet.planetSky}`}
              />
              {/*Planet image*/}
              <img
                className="absolute bottom-6 sm:bottom-10 right-0"
                src={`${speciesPlanet.planetURL + speciesPlanet.planetSmall}`}
              />
              {/*Room image overlayed on top of planet*/}
              <img
                className="h-full w-full bg-cover z-20"
                src={`${rooms.baseURL + selectedRoom.roomImage}`}
              ></img>
              {/*Species image*/}
              <img
                className="object-contain h-3/4 w-full z-30 absolute bottom-0 right-20"
                src={`${speciesType.url}/${speciesPortrait}`}
              />
            </div>
          )}
          <div className="hidden lg:flex flex-col h-1/2 w-1/5 bg-black/40 border-x border-blue-700 fixed right-0 z-40">
            <div className="h-full border-2 border-gray-500 p-2 m-2 bg-black/40 
              overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-800/70"
            >
              <p className="pb-1 select-none underline">Solar System Info:</p>
              <p>Planet Name: <span className="italic">{planetName}</span></p>
              <p>Planet Type:
                <img src={`${planets.iconsURL + speciesPlanet.planetIcon}`} className='inline-block p-1' />
              </p>
              <p>Star Name: <span className="italic">{starName}</span></p>
              <p>Star Type: --IN DEVELOPMENT--</p>
            </div>
            <div className="h-full border-2 border-gray-500 p-2 m-2 bg-black/40">
              <p className="pb-1 select-none underline">Origin:</p>
              <p>--IN DEVELOPMENT--</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="pb-2">To preview empire, please meet all the following requirements:</p>
          <ul className="list-disc">
            <li>Species portrait selected: {speciesPortrait ? ('Yes') : ('No')}</li>
            <li>Planet selected: {speciesPlanet ? ('Yes') : ('No')}</li>
            <li>Room selected: {selectedRoom ? ('Yes') : ('No')}</li>
          </ul>
        </div>
      )}
    </div>
  )
}