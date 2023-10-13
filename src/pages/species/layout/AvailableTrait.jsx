import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import traitCostColorSelector from '../utils/traitCostColorSelector';

export default function AvailableTrait({
  trait,
  traitType,
  baseURL,
  handleTraitClick,
  handleHoverStatus,
  isVisible
}) {
  const [selectedURL, setSelectedURL] = useState('');
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
    if (isVisible) {
      handleTraitClick(trait.traitId);
    }
  }

  return (
    <div
      onMouseEnter={() => handleHoverStatus(trait, true)}
      style={{ cursor: `url(/images/ui/cursor_pointer.png), pointer` }}
      className={`border-2 border-gray-700 p-1 mb-2 last-of-type:mb-0 flex items-center justify-between
        ${isVisible ? 'bg-gray-900/70' : 'hidden'}
        `}
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

AvailableTrait.propTypes = {
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