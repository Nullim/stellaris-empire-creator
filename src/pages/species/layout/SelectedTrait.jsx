import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import traitCostColorSelector from '../utils/traitCostColorSelector';

export default function SelectedTrait({ trait, traitType, baseURL, handleTraitClick, handleHoverStatus }) {
  const [selectedURL, setSelectedURL] = useState('')

  useEffect(() => {
    let url = baseURL[0];

    if (baseURL.length > 1) {
      if (traitType === 'Organic') url = baseURL.find(url => url.includes('organic'));
      if (traitType === 'Botanical') url = baseURL.find(url => url.includes('botanical'));
      if (traitType === 'Lithoid') url = baseURL.find(url => url.includes('lithoid'));
    }

    setSelectedURL(url);
  }, [baseURL, traitType]);

  const handleClick = () => {
    handleTraitClick(trait.traitId);
  };

  return (
    <div
      onMouseEnter={() => handleHoverStatus(trait, true)}
      className="border-2 bg-gray-900/70 border-gray-700 p-1 mb-2 last-of-type:mb-0 flex items-center justify-between"
      onClick={handleClick}
    >
      <div className='flex items-center'>
        <img src={selectedURL + trait.traitImage} />
        <p className='pl-2 select-none'>{trait.traitName}</p>
      </div>
      <p className={`pr-2 ${traitCostColorSelector(trait.traitCost)}`}>{trait.traitCost}</p>
    </div>
  )
}

SelectedTrait.propTypes = {
  trait: PropTypes.shape({
    traitId: PropTypes.number.isRequired,
    traitName: PropTypes.string.isRequired,
    traitImage: PropTypes.string.isRequired,
    traitCost: PropTypes.number.isRequired,
  }),
  traitType: PropTypes.string.isRequired,
  baseURL: PropTypes.array.isRequired,
  handleTraitClick: PropTypes.func.isRequired,
  handleHoverStatus: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
}