import { useEffect, useState } from "react";
import speciesData from "../../utils/species.json";

export default function SpeciesPortraits() {
  const [selectedSpeciesData, setSelectedSpeciesData] = useState(speciesData[0]);
  const [selectedPortrait, setSelectedPortrait] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getParamsFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const speciesParam = params.get('sN');
      const portraitParam = params.get('sP');
      const genderParam = params.get('uG');

      if (speciesParam) {
        const foundSpecies = speciesData.find(species => species.name === speciesParam);
        if (foundSpecies) {
          setSelectedSpeciesData(foundSpecies);
          setSelectedPortrait(portraitParam);
          if (speciesParam === 'Machine' && genderParam) {
            params.delete('sG');
            window.history.replaceState({}, '', `?${params.toString()}`);
          }
        }
      }
    };
    getParamsFromURL();
  }, []);

  function updateTraitParams (speciesData) {
    const params = new URLSearchParams(window.location.search);
    const traitParams = params.get('sT');
    const speciesParam = params.get('sN');

    if(traitParams && speciesParam !== speciesData.name) {
      params.delete('sT');
      window.history.replaceState({}, '', `?${params.toString()}`);
    }
  }

  const handleSpeciesClick = (species) => {
    if (species === selectedSpeciesData) return;
    setIsLoading(true)
    updateTraitParams(species)
    setSelectedSpeciesData(species)
  }

  const handlePortraitClick = (portrait) => {
    setSelectedPortrait(portrait)
    const params = new URLSearchParams(window.location.search);
    params.set('sN', selectedSpeciesData.name);
    params.set('sP', portrait);
    if (params.get('sN') === 'Machine') {
      params.delete('sG');
    }
    window.history.replaceState({}, '', `?${params.toString()}`)
  }

  useEffect(() => {
    const imagePromises = selectedSpeciesData.images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `${selectedSpeciesData.url}/${image}`;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setIsLoading(false);
      })
  }, [selectedSpeciesData]);

  return (
    <div className="flex h-full w-full font-semibold">
      {/* Render species namelist */}
      <div className="w-52 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-slate-500/10">
        <ul className="border-2 border-slate-600 bg-black/40 p-2">
          {speciesData.map((namelist, index) => (
            <li
              key={index}
              className={`py-1 pl-2 cursor-pointer border font-bold 
                ${namelist === selectedSpeciesData ? "border-blue-500 bg-blue-700/10" : "border-transparent"}
              `}
              onClick={() => handleSpeciesClick(namelist)}>
              {namelist.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Render species images */}
      <div className="w-full p-2 overflow-y-auto scrollbar scrollbar-thumb-blue-800 scrollbar-track-transparent">
        <div className="flex flex-wrap border-2 border-gray-500 bg-black/40 p-1">
          {isLoading ? (
            <p className="cursor-progress">Loading...</p>
          ) : (
            selectedSpeciesData.images.map((image, index) => (
              <div
                key={index}
                className={`border-2 m-1
                  ${image === selectedPortrait ? "border-blue-500 bg-gray-900/70" : "border border-gray-700"}
                `}>
                <img
                  className="cursor-pointer object-contain object-bottom w-36 h-36"
                  src={`${selectedSpeciesData.url}/${image}`}
                  alt={image}
                  onClick={() => handlePortraitClick(image)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
