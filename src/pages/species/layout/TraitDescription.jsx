import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import speciesTraits from "../../../utils/speciesTraits.json";

const iconsURL = "/images/icons/";

export default function TraitDescription({ trait }) {
  const { traitName, traitDescription, traitEffects } = trait

  function exclusiveTraits(selectedTrait) {
    if (selectedTrait.excludes.length > 0) {
      const excludedTraits = selectedTrait.excludes.map((excludedTrait) => {
        return speciesTraits.traits.find((speciesTrait) => speciesTrait.traitId === excludedTrait);
      })
      const excludedTraitNames = excludedTraits.map((excludedTrait) => {
        return excludedTrait.traitName;
      })
      return (
        <div className='font-normal text-base'>
          Exclusive with: <span className='text-yellow-400'>{excludedTraitNames.join(', ')}</span>
        </div>
      )
    } else {
      return (
        <div className='font-normal text-base'>
          Exclusive with: <span className='text-yellow-400'>None</span>
        </div>
      )
    }
  }

  const formattedEffects = traitEffects.map((effect, index) => {
    const formattedEffect = effect
      .replace(/\$G\$/g, '<span class="text-green-500">')
      .replace(/\$C\$/g, '<span class="text-cyan-500">')
      .replace(/\$R\$/g, '<span class="text-red-500">')
      .replace(/\$Y\$/g, '<span class="text-yellow-400">')
      .replace(/\$O\$/g, '<span class="text-orange-500">')
      .replace(/&SP&/g, '</span>')
      .replace(/\$H\$/g, `<img src=${iconsURL}housing.png class="inline-block pr-1" />`)
      .replace(/\$F\$/g, `<img src=${iconsURL}food.png class="inline-block pr-1" />`)
      .replace(/\$E\$/g, `<img src=${iconsURL}energy.png class="inline-block pr-1" />`)
      .replace(/\$M\$/g, `<img src=${iconsURL}minerals.png class="inline-block pr-1" />`)
      .replace(/\$AM\$/g, `<img src=${iconsURL}amenities.png class="inline-block pr-1" />`)
      .replace(/\$BR\$/g, `<img src=${iconsURL}basic_resources.png class="inline-block pr-1" />`)
      .replace(/\$RAM\$/g, `<img src=${iconsURL}amenities_robot.png class="inline-block pr-1" />`)
      .replace(/\$POP\$/g, `<img src=${iconsURL}pop.png class="inline-block pr-1" />`)
      .replace(/\$RES\$/g, `<img src=${iconsURL}pop_job.png class="inline-block pr-1" />`)
      .replace(/\$GAS\$/g, `<img src=${iconsURL}exotic_gases.png class="inline-block pr-1" />`)
      .replace(/\$CRY\$/g, `<img src=${iconsURL}rare_crystals.png class="inline-block pr-1" />`)
      .replace(/\$MOT\$/g, `<img src=${iconsURL}volatile_motes.png class="inline-block pr-1" />`)
      .replace(/\$UNI\$/g, `<img src=${iconsURL}unity.png class="inline-block pr-1" />`)
      .replace(/\$EMP\$/g, `<img src=${iconsURL}empire_size.png class="inline-block pr-1" />`)
      .replace(/\$ENG\$/g, `<img src=${iconsURL}engineering.png class="inline-block pr-1" />`)
      .replace(/\$SOC\$/g, `<img src=${iconsURL}society.png class="inline-block pr-1" />`)
      .replace(/\$PHYS\$/g, `<img src=${iconsURL}physics.png class="inline-block pr-1" />`)
      .replace(/\$TECH\$/g, `<img src=${iconsURL}research.png class="inline-block pr-1" />`)
      .replace(/\$CONS\$/g, `<img src=${iconsURL}consumer_goods.png class="inline-block pr-1" />`)
      .replace(/\$DOSH\$/g, `<img src=${iconsURL}trade_value.png class="inline-block pr-1" />`)
      .replace(/\$ARMY\$/g, `<img src=${iconsURL}defense_army.png class="inline-block pr-1" />`)
    const sanitizedEffect = DOMPurify.sanitize(formattedEffect)
    return (
      <div key={index} className='font-normal text-base' dangerouslySetInnerHTML={{ __html: sanitizedEffect }} />
    );
  });
  return (
    <div className='flex flex-col text-left'>
      <p className='font-bold text-xl'>{traitName}</p>
      <p className='font-normal italic text-base text-stone-400 pb-2'>{traitDescription}</p>
      <div className='pb-4'>{formattedEffects}</div>
      <div className='italic'>{exclusiveTraits(trait)}</div>
    </div>
  )
}

TraitDescription.propTypes = {
  trait: PropTypes.shape({
    traitName: PropTypes.string.isRequired,
    traitDescription: PropTypes.string.isRequired,
    traitEffects: PropTypes.arrayOf(PropTypes.string).isRequired,
  })
}
