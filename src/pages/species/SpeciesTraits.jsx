import { useEffect, useState } from "react";
import speciesTraits from "../../utils/speciesTraits.json";
import SelectedTrait from "./layout/SelectedTrait";
import traitColorSelector from "./utils/traitColorSelector";
import AvailableTrait from "./layout/AvailableTrait";

export default function SpeciesTraits() {
  const [availableTraits, setAvailableTraits] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [traitPicks, setTraitPicks] = useState(5);
  const [traitPoints, setTraitPoints] = useState(2);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [traitVisible, setTraitVisible] = useState({});

  useEffect(() => {
    const initialTraitVisibility = {};
    availableTraits.forEach(trait => {
      initialTraitVisibility[trait.traitId] = true;
    })
    setTraitVisible(initialTraitVisibility);
  }, [availableTraits])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isMachine = urlParams.get('sN') === 'Machine';
    const isBotanical = urlParams.get('sN') === 'Plantoid' || urlParams.get('sN') === 'Fungoid';
    const isLithoid = urlParams.get('sN') === 'Lithoid';

    if (isMachine) {
      setAvailableTraits(speciesTraits.traits.filter(trait => trait.type === 'Machine'));
      setImageURL([speciesTraits.machineUrl]);
    } else if (isBotanical) {
      setAvailableTraits(speciesTraits.traits.filter(trait => trait.type === 'Organic' || trait.type === 'Botanical'));
      setImageURL([speciesTraits.organicUrl, speciesTraits.botanicalUrl])
    } else if (isLithoid) {
      setAvailableTraits(speciesTraits.traits.filter(trait => trait.type === 'Organic' || trait.type === 'Lithoid'));
      setImageURL([speciesTraits.organicUrl, speciesTraits.lithoidUrl])
    } else {
      setAvailableTraits(speciesTraits.traits.filter(trait => trait.type === 'Organic'));
      setImageURL([speciesTraits.organicUrl]);
    }
  }, []);

  const handleTraitClick = (id, traitCost) => {
    const selectedTrait = selectedTraits.find(trait => trait.traitId === id);
    const availableTrait = availableTraits.find(trait => trait.traitId === id);
    const isAvailableTraitVisible = traitVisible[id];

    if (selectedTrait) {
      const updatedSelectedTraits = selectedTraits.filter(trait => trait.traitId !== selectedTrait.traitId);
      setSelectedTraits(updatedSelectedTraits);
      setTraitPicks(traitPicks + 1);
      setTraitPoints(traitPoints + selectedTrait.traitCost);

      if (!isAvailableTraitVisible) {
        const traitVisibility = { ...traitVisible, [id]: true };
        setTraitVisible(traitVisibility);
      }
    } else if (traitPicks !== 0) {
      setSelectedTraits([...selectedTraits, availableTrait])
      setTraitPicks(traitPicks - 1);
      setTraitPoints(traitPoints - traitCost);

      if (isAvailableTraitVisible) {
        const updatedVisibility = { ...traitVisible, [id]: false };
        setTraitVisible(updatedVisibility);
      }
    }
  }

  return (
    <div className="flex font-bold py-4 px-5 gap-5 h-full">
      <div className="flex flex-col w-1/3">
        <div className="flex flex-col w-full text-right">
          <p>Trait points left: <span className={traitColorSelector(traitPoints)}>{traitPoints}</span></p>
          <p>Trait picks left: <span className={traitColorSelector(traitPicks)}>{traitPicks}</span></p>
        </div>
        <div className="bg-black/40 flex-grow border-2 border-gray-500 p-2 font-normal">
          Here goes trait description
        </div>
      </div>
      <div className="flex flex-col w-1/3">
        <div className="text-left">
          Available traits:
        </div>
        <div className="
          bg-black/40 
          flex-grow 
          border-2 
          border-gray-500 
          p-2 
          overflow-y-auto 
          scrollbar 
          scrollbar-thumb-green-800 
          scrollbar-track-transparent
          font-normal
          "
        >
          {availableTraits.map(trait => (
            <AvailableTrait
              key={trait.traitId}
              id={trait.traitId}
              baseURL={imageURL}
              traitName={trait.traitName}
              traitImage={trait.traitImage}
              traitCost={trait.traitCost}
              traitType={trait.type}
              handleTraitClick={handleTraitClick}
              isVisible={traitVisible[trait.traitId]}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-1/3">
        <div className="text-left">
          Selected traits:
        </div>
        <div className="
          bg-black/40 
          flex-grow 
          border-2 
          border-gray-500 
          p-2 
          overflow-y-auto 
          scrollbar 
          scrollbar-thumb-green-800 
          scrollbar-track-transparent"
        >
          {selectedTraits.map(trait => (
            <SelectedTrait
              key={trait.traitId}
              id={trait.traitId}
              baseURL={imageURL}
              traitName={trait.traitName}
              traitImage={trait.traitImage}
              traitCost={trait.traitCost}
              traitType={trait.type}
              handleTraitClick={handleTraitClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
