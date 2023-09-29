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

  const handleSpeciesClick = (species) => {
    if (species === selectedSpeciesData) return;
    setIsLoading(true)
    setSelectedSpeciesData(() => species)
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
    <div className="flex h-full w-full">
      
      {/* Render species namelist */}
      <div className="w-1/6 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-800 scrollbar-track-slate-500">
        <ul>
          {speciesData.map((namelist, index) => (
            <li
              key={index}
              className={`py-1 px-2 cursor-pointer border font-bold 
                ${namelist === selectedSpeciesData ? "border-cyan-300" : "border-transparent"}
              `}
              onClick={() => handleSpeciesClick(namelist)}>
              {namelist.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Render species images */}
      <div className="w-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-800 scrollbar-track-slate-500">
        <div className="flex flex-wrap">
          {isLoading ? (
            <p className="cursor-progress">Loading...</p>
          ) : (
            selectedSpeciesData.images.map((image, index) => (
              <div
                key={index}
                className={`border 
                  ${image === selectedPortrait ? "border-cyan-500 border-2 transition-all" : "border-transparent border-2"}
                `}>
                <img
                  className="cursor-pointer object-contain object-bottom mb-1 w-36 h-36"
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
