import { useEffect, useState } from "react";
import speciesTraits from "../../utils/speciesTraits.json";
import Trait from "./layout/Trait";
import traitColorSelector from "./utils/traitColorSelector";

export default function SpeciesTraits() {
  const [traitsToShow, setTraitsToShow] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [traitPicks, setTraitPicks] = useState(5);
  const [traitPoints, setTraitPoints] = useState(2);
  const [selectedTraits, setSelectedTraits] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isMachine = urlParams.get('sN') === 'Machine';
    const isBotanical = urlParams.get('sN') === 'Plantoid' || urlParams.get('sN') === 'Fungoid';
    const isLithoid = urlParams.get('sN') === 'Lithoid';

    if (isMachine) {
      setTraitsToShow(speciesTraits.traitList[0].traits.filter(trait => trait.type === 'Machine'));
      setImageURL([speciesTraits.machineUrl]);
    } else if (isBotanical) {
      setTraitsToShow(speciesTraits.traitList[0].traits.filter(trait => trait.type === 'Organic' || trait.type === 'Botanical'));
      setImageURL([speciesTraits.organicUrl, speciesTraits.botanicalUrl])
    } else if (isLithoid) {
      setTraitsToShow(speciesTraits.traitList[0].traits.filter(trait => trait.type === 'Organic' || trait.type === 'Lithoid'));
      setImageURL([speciesTraits.organicUrl, speciesTraits.lithoidUrl])
    } else {
      setTraitsToShow(speciesTraits.traitList[0].traits.filter(trait => trait.type === 'Organic'));
      setImageURL([speciesTraits.organicUrl]);
    }
  }, []);

  return (
    <div className="flex justify-evenly font-bold py-4 box-border px-5 gap-5 h-full">
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col text-right">
          <p>Trait points left: <span className={traitColorSelector(traitPoints)}>{traitPoints}</span></p>
          <p>Trait picks left: <span className={traitColorSelector(traitPicks)}>{traitPicks}</span></p>
        </div>
        <div className="bg-black/40 flex-grow border-2 border-gray-500 p-2">
          Here goes trait description
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="text-left">
          Available traits:
        </div>
        <div className="bg-black/40 flex-grow border-2 border-gray-500 p-2 overflow-y-auto scrollbar scrollbar-thumb-green-800 scrollbar-track-transparent">
          {traitsToShow.map(trait => (
            <Trait 
              key={trait.traitId} 
              baseURL={imageURL}
              traitName={trait.traitName} 
              traitImage={trait.traitImage}
              traitCost={trait.traitCost} 
              traitType={trait.type}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="text-left">
          Selected traits:
        </div>
        <div className="bg-black/40 flex-grow border-2 border-gray-500 p-2">
          Here goes selected traits.
        </div>
      </div>
    </div>
  )
}
