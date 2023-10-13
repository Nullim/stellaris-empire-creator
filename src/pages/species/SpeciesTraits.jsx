import { useEffect, useState } from "react";
import speciesTraits from "../../utils/speciesTraits.json";
import traitPointColorSelector from "./utils/traitPointColorSelector";

import SelectedTrait from "./layout/SelectedTrait";
import AvailableTrait from "./layout/AvailableTrait";
import TraitDescription from "./layout/TraitDescription";

export default function SpeciesTraits() {
  const [availableTraits, setAvailableTraits] = useState([]);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [requiredTrait, setRequiredTrait] = useState(null);
  const [imageURL, setImageURL] = useState([]);
  const [traitPicks, setTraitPicks] = useState();
  const [traitPoints, setTraitPoints] = useState();
  const [traitVisible, setTraitVisible] = useState({});
  const [hoveredTrait, setHoveredTrait] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlTraitParams = urlParams.get('sT');
    const isMachine = urlParams.get('sN') === 'Machine';
    const isBotanical = urlParams.get('sN') === 'Plantoid' || urlParams.get('sN') === 'Fungoid';
    const isLithoid = urlParams.get('sN') === 'Lithoid';
    const isOceanHomeworld = urlParams.get('hP');

    let traitsToSet;
    let ImageURLToSet;
    let compulsoryTraitToSet;
    let traitPointsToSet = 2;
    let traitPicksToSet = 5;

    if (isMachine) {
      traitsToSet = speciesTraits.traits.filter(trait => trait.type === 'Machine');
      ImageURLToSet = [speciesTraits.machineUrl];
      compulsoryTraitToSet = 46; // "Machine" trait ID.
    } else if (isBotanical) {
      traitsToSet = speciesTraits.traits.filter(trait => trait.type === 'Organic' || trait.type === 'Botanical');
      ImageURLToSet = [speciesTraits.organicUrl, speciesTraits.botanicalUrl];
    } else if (isLithoid) {
      traitsToSet = speciesTraits.traits.filter(trait => trait.type === 'Organic' || trait.type === 'Lithoid');
      ImageURLToSet = [speciesTraits.organicUrl, speciesTraits.lithoidUrl];
      compulsoryTraitToSet = 67; // "Lithoid" trait ID.
    } else {
      traitsToSet = speciesTraits.traits.filter(trait => trait.type === 'Organic');
      ImageURLToSet = [speciesTraits.organicUrl];
    }

    let aquaticInvisible;
    // Ocean World Id
    if(isOceanHomeworld !== '4') {
      aquaticInvisible = 1
    } else {
      aquaticInvisible = null;
    }

    const visibleTraits = {};
    traitsToSet.forEach(trait => {
      trait.traitId === compulsoryTraitToSet || trait.traitId === aquaticInvisible
        ? visibleTraits[trait.traitId] = false
        : visibleTraits[trait.traitId] = true
    });

    if (compulsoryTraitToSet) {
      const requiredTraitToSet = traitsToSet.find(trait => {
        return trait.traitId === compulsoryTraitToSet;
      })
      if (requiredTraitToSet.traitId === 46) traitPointsToSet = 1;
      setRequiredTrait(requiredTraitToSet);
      setSelectedTraits(prevSelectedTraits => {
        const traitPresent = prevSelectedTraits.some(trait => trait === requiredTraitToSet)
        if (!traitPresent) {
          return [...prevSelectedTraits, requiredTraitToSet]
        }
        return prevSelectedTraits;
      })
    } else {
      setRequiredTrait(null);
    }

    if (urlTraitParams) {
      const urlTraitIds = urlParams.getAll('sT');
      const traitsToLoad = urlTraitIds[0].split('-');
      traitsToLoad.forEach((traitId) => {
        const compatibleTraitId = parseInt(traitId);
        const availableTrait = traitsToSet.find(trait => {
          return trait.traitId === compatibleTraitId && trait.traitId !== compulsoryTraitToSet;
        });

        if (availableTrait) {
          traitPointsToSet -= availableTrait.traitCost;
          traitPicksToSet -= 1;
          setSelectedTraits(prevSelectedTraits => {
            const traitPresent = prevSelectedTraits.some(trait => trait.traitId === availableTrait.traitId);
            if (!traitPresent) {
              return [...prevSelectedTraits, availableTrait];
            } else {
              return prevSelectedTraits;
            }
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

    setTraitPoints(traitPointsToSet);
    setTraitPicks(traitPicksToSet);
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
    const selectedTrait = selectedTraits.find(trait => {
      if (requiredTrait) {
        return trait.traitId === id && requiredTrait.traitId !== id;
      } else {
        return trait.traitId === id;
      }
    });

    const availableTrait = availableTraits.find(trait => {
      if (requiredTrait) {
        return trait.traitId === id && requiredTrait.traitId !== id;
      } else {
        return trait.traitId === id;
      }
    });

    if (selectedTrait) {
      deselectTraitLogic(selectedTrait)
    } else if (availableTrait && traitPicks !== 0) {
      selectTraitLogic(availableTrait)
    }
    window.dispatchEvent(new Event('popstate'))
  }

  const handleHoverStatus = (trait, isHovered) => {
    if (isHovered) setHoveredTrait(trait);
  }

  return (
    <div className="flex font-semibold py-4 px-5 gap-5 h-full">
      <div className="flex flex-col w-1/3">
        <div className="flex flex-col w-full text-right">
          <p>Trait points left: <span className={traitPointColorSelector(traitPoints)}>{traitPoints}</span></p>
          <p>Trait picks left: <span className={traitPointColorSelector(traitPicks)}>{traitPicks}</span></p>
        </div>
        <div className="
          flex-grow 
          border-2 
         border-gray-500 
         bg-black/40 
          p-2 
          overflow-y-auto 
          scrollbar 
          scrollbar-thumb-blue-800 
          scrollbar-track-transparent
          font-normal
          "
        >
          {hoveredTrait ? (
            <TraitDescription trait={hoveredTrait} />
          ) : (
            <div className="flex flex-col">
              <p className="py-1">Hover over a trait to see its description!</p>
              <p className="py-1">
                Be aware that some traits are
                <span className="text-orange-500"> only </span>
                available if you&apos;re a specific type of species (Plantoid, Machine, etc...).
              </p>
              <p className="py-1">
                So if you can&apos;t find a specific trait you want, make sure you have the right species type!
              </p>
              <p className="py-1">
                (<span className="text-yellow-400">Note</span>: 
                switching species types <span className="text-red-500">will remove your selected traits</span> if any.)
              </p>
            </div>
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
          scrollbar-thumb-blue-800 
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
          scrollbar-thumb-blue-800 
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
