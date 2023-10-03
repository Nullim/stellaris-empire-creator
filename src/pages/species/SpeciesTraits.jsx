import { useEffect, useState } from "react";
import speciesTraits from "../../utils/speciesTraits.json";
import SelectedTrait from "./layout/SelectedTrait";
import traitPointColorSelector from "./utils/traitPointColorSelector";
import AvailableTrait from "./layout/AvailableTrait";

export default function SpeciesTraits() {
  const [availableTraits, setAvailableTraits] = useState([]);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [traitPicks, setTraitPicks] = useState(5);
  const [traitPoints, setTraitPoints] = useState(2);
  const [traitVisible, setTraitVisible] = useState({});
  const [traitDescription, setTraitDescription] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlTraitParams = urlParams.get('sT');
    const isMachine = urlParams.get('sN') === 'Machine';
    const isBotanical = urlParams.get('sN') === 'Plantoid' || urlParams.get('sN') === 'Fungoid';
    const isLithoid = urlParams.get('sN') === 'Lithoid';

    let traitsToSet;
    let ImageURLToSet;

    if (isMachine) {
      traitsToSet = speciesTraits.traits.filter(trait => trait.type === 'Machine');
      ImageURLToSet = [speciesTraits.machineUrl];
    } else if (isBotanical) {
      traitsToSet = speciesTraits.traits.filter(trait => trait.type === 'Organic' || trait.type === 'Botanical');
      ImageURLToSet = [speciesTraits.organicUrl, speciesTraits.botanicalUrl];
    } else if (isLithoid) {
      traitsToSet = speciesTraits.traits.filter(trait => trait.type === 'Organic' || trait.type === 'Lithoid');
      ImageURLToSet = [speciesTraits.organicUrl, speciesTraits.lithoidUrl];
    } else {
      traitsToSet = speciesTraits.traits.filter(trait => trait.type === 'Organic');
      ImageURLToSet = [speciesTraits.organicUrl];
    }

    const visibleTraits = {};
    traitsToSet.forEach(trait => {
      visibleTraits[trait.traitId] = true;
    });

    if (urlTraitParams) {
      const urlTraitIds = urlParams.getAll('sT');
      const traitsToLoad = urlTraitIds[0].split('-');
      traitsToLoad.forEach((traitId) => {
        const compatibleTraitId = parseInt(traitId);
        const availableTrait = traitsToSet.find(trait => {
          return trait.traitId === compatibleTraitId;
        });

        if (availableTrait) {
          setSelectedTraits(prevSelectedTraits => {
            const traitPresent = prevSelectedTraits.some(trait => trait === availableTrait)
            if (!traitPresent) {
              setTraitPicks(prevTraitPicks => prevTraitPicks - 1);
              setTraitPoints(prevTraitPoints => prevTraitPoints - availableTrait.traitCost);
              return [...prevSelectedTraits, availableTrait];
            }
            return prevSelectedTraits;
          });

          visibleTraits[compatibleTraitId] = false;
          if (availableTrait.excludes) {
            const traitExclusions = availableTrait.excludes;
            traitExclusions.forEach((excludedTraitId) => {
              visibleTraits[excludedTraitId] = false;
            })
          }
        }
      });
    }
    setTraitVisible(visibleTraits);
    setAvailableTraits(traitsToSet);
    setImageURL(ImageURLToSet);
  }, []);

  function traitVisibilityLogic(trait) {
    let startingVisibility = { ...traitVisible };
    const traitVisibility = !startingVisibility[trait.traitId]
    let updatedVisibility = { ...startingVisibility, [trait.traitId]: traitVisibility }

    const exclusionsVisibility = trait.excludes.length > 0
      ? excludedTraitsVisibility(trait.excludes, updatedVisibility, trait.traitId)
      : {};
    setTraitVisible({ ...updatedVisibility, ...exclusionsVisibility });
  }

  function excludedTraitsVisibility(traitExclusions, traitVisibility, selectedTraitId) {
    const filteredSelectedTraits = selectedTraits.filter(trait => trait.traitId !== selectedTraitId)
    let excludedTraitVisibility = { ...traitVisibility }
    traitExclusions.forEach((traitId) => {
      const excludedTraitPresentInOtherTrait = filteredSelectedTraits.find(trait => trait.excludes.includes(traitId))
      if (!excludedTraitPresentInOtherTrait) {
        excludedTraitVisibility[traitId] = !traitVisibility[traitId];
      }
    })
    return excludedTraitVisibility;
  }

  function selectTraitLogic(availableTrait) {
    const params = new URLSearchParams(window.location.search);
    const traitParam = params.getAll('sT');

    traitVisibilityLogic(availableTrait);
    setSelectedTraits([...selectedTraits, availableTrait])
    setTraitPicks(traitPicks - 1);
    setTraitPoints(traitPoints - availableTrait.traitCost);

    params.set('sT', traitParam ? [...traitParam, availableTrait.traitId].join('-') : availableTrait.traitId);
    window.history.replaceState({}, '', `?${params.toString()}`);
  }

  function deselectTraitLogic(selectedTrait) {
    const updatedSelectedTraits = selectedTraits.filter(trait => trait.traitId !== selectedTrait.traitId);
    const params = new URLSearchParams(window.location.search);
    const traitParam = params.getAll('sT');
    const updatedTraitParam = (traitParam[0].split('-')).filter(trait => parseInt(trait) !== selectedTrait.traitId)

    traitVisibilityLogic(selectedTrait);
    setSelectedTraits(updatedSelectedTraits);
    setTraitPicks(traitPicks + 1);
    setTraitPoints(traitPoints + selectedTrait.traitCost);

    params.set('sT', updatedTraitParam.join('-'))
    window.history.replaceState({}, '', `?${params.toString()}`);
    if (!params.get('sT')) {
      params.delete('sT');
      window.history.replaceState({}, '', `?${params.toString()}`);
    }
  }

  const handleTraitClick = (id) => {
    const selectedTrait = selectedTraits.find(trait => trait.traitId === id);
    const availableTrait = availableTraits.find(trait => trait.traitId === id);

    if (selectedTrait) {
      deselectTraitLogic(selectedTrait)
    } else if (traitPicks !== 0) {
      selectTraitLogic(availableTrait)
    }
  }

  const handleHoverStatus = (trait, isHovered) => {
    isHovered
    ? setTraitDescription('I am being hovered!')
    : setTraitDescription('Hover over a trait to see its description!')
  }

  return (
    <div className="flex font-bold py-4 px-5 gap-5 h-full">
      <div className="flex flex-col w-1/3">
        <div className="flex flex-col w-full text-right">
          <p>Trait points left: <span className={traitPointColorSelector(traitPoints)}>{traitPoints}</span></p>
          <p>Trait picks left: <span className={traitPointColorSelector(traitPicks)}>{traitPicks}</span></p>
        </div>
        <div className="bg-black/40 flex-grow border-2 border-gray-500 p-2 font-normal">
          {traitDescription !== '' ? (
            traitDescription
          ) : (
            'Hover over a trait to see its description!'
          )}
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
              trait={trait}
              traitType={trait.type}
              baseURL={imageURL}
              handleTraitClick={handleTraitClick}
              handleHoverStatus={handleHoverStatus}
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
          scrollbar-track-transparent
          font-normal
          "
        >
          {selectedTraits.length === 0 ? (
            <p>No selected Traits. Click on a trait to add it!</p>
          ) : (
            selectedTraits.map(trait => (
              <SelectedTrait
                key={trait.traitId}
                trait={trait}
                traitType={trait.type}
                baseURL={imageURL}
                handleTraitClick={handleTraitClick}
                handleHoverStatus={handleHoverStatus}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
