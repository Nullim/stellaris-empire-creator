import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import traitColorSelector from '../utils/traitColorSelector';

export default function SelectedTrait({ id, baseURL, traitName, traitImage, traitCost, traitType, handleTraitClick }) {
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
    handleTraitClick(id, traitCost);
  };

  return (
    <div 
    className="border-2 bg-blue-900/70 border-blue-700 p-1 mb-2 last-of-type:mb-0 flex items-center justify-between"
    onClick={handleClick}
    >
      <div className='flex items-center'>
        <img src={selectedURL + traitImage} />
        <p className='pl-2 select-none'>{traitName}</p>
      </div>
      <p className={traitColorSelector(traitCost)}>{traitCost}</p>
    </div>
  )
}

SelectedTrait.propTypes = {
  id: PropTypes.number.isRequired,
  baseURL: PropTypes.string.isRequired,
  traitName: PropTypes.string.isRequired,
  traitImage: PropTypes.string.isRequired,
  traitCost: PropTypes.number.isRequired,
  traitType: PropTypes.string.isRequired,
  handleTraitClick: PropTypes.func.isRequired
}