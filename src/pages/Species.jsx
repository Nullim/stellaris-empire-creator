import { useEffect, useState } from "react";
import speciesData from "../utils/species.json";

export default function Species () {
  const [selectedSpeciesData, setSelectedSpeciesData] = useState(speciesData[0]);
  const [selectedPortrait, setSelectedPortrait] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSpeciesClick = (species) => {
    setIsLoading(true)
    setSelectedSpeciesData(() => species)
  }

  const handlePortraitClick = (portrait) => {
    setSelectedPortrait(portrait)
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

  return(
    <div className="flex h-full w-full">
      <div className="w-1/6 p-4 border border-green-600 overflow-y-auto scrollbar-thin scrollbar-thumb-green-800 scrollbar-track-slate-500">
        <ul>
          {speciesData.map((namelist, index) => (
            <li 
              key={index} 
              className={`py-1 px-2 cursor-pointer border ${
                namelist === selectedSpeciesData ? "border-cyan-300" : "border-transparent"
              }`}
              onClick={() => handleSpeciesClick(namelist)}>
              {namelist.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full p-4 border border-green-600">
        <div className="grid grid-cols-9 gap-1">
          {isLoading ? (
            <p className="text-center cursor-progress">Loading...</p>
          ) : (
            selectedSpeciesData.images.map((image, index) => (
              <img
                key={index}
                className={`
                  border ${image === selectedPortrait ? "border-cyan-500 border-2 transition-all" : "border-transparent border-2"}
                  cursor-pointer 
                  object-contain 
                  object-bottom 
                  mb-1 
                  w-36 
                  h-36
                `}
                src={`${selectedSpeciesData.url}/${image}`}
                alt={image}
                onClick={() => handlePortraitClick(image)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}