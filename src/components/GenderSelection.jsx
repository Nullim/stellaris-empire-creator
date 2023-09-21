import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BASE_URL = '../../public/images/genders'

const genderData = [
  {
    gender: 'male',
    genderURL: `${BASE_URL}/male/`,
    normal: 'male.png',
    selected: 'male_selected.png',
    hover: 'male_hover.png'
  },
  {
    gender: 'female',
    genderURL: `${BASE_URL}/female/`,
    normal: 'female.png',
    selected: 'female_selected.png',
    hover: 'female_hover.png'
  },
  {
    gender: 'indeterminable',
    genderURL: `${BASE_URL}/indeterminable/`,
    normal: 'indeterminable.png',
    selected: 'indeterminable_selected.png',
    hover: 'indeterminable_hover.png'
  },
]

const GenderSelection = ({ handleGenderClick }) => {
  const [selectedGender, setSelectedGender] = useState('default');
  const [hoveredGender, setHoveredGender] = useState(null);

  useEffect(() => {
    genderData.forEach((genderInfo) => {
      const normalImage = new Image();
      normalImage.src = `${genderInfo.genderURL}${genderInfo.normal}`;

      const selectedImage = new Image();
      selectedImage.src = `${genderInfo.genderURL}${genderInfo.selected}`;

      const hoverImage = new Image();
      hoverImage.src = `${genderInfo.genderURL}${genderInfo.hover}`;
    });
  }, []);

  const handleMouseEnter = (gender) => {
    setHoveredGender(gender);
  };

  const handleMouseLeave = () => {
    setHoveredGender(null);
  };

  const handleClick = (gender) => {
    setSelectedGender((prevGender) =>
      prevGender === gender ? 'default' : gender
    );
    handleGenderClick(gender);
  };

  return (
    <div className='flex flex-col'>
      <div className="flex items-center justify-start">
        {genderData.map((genderInfo) => (
          <div
            key={genderInfo.gender}
            className="cursor-pointer pr-3"
            onMouseEnter={() => handleMouseEnter(genderInfo.gender)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(genderInfo.gender)}
          >
            <img
              src={
                selectedGender === genderInfo.gender
                  ? `${genderInfo.genderURL}${genderInfo.selected}`
                  : hoveredGender === genderInfo.gender
                    ? `${genderInfo.genderURL}${genderInfo.hover}`
                    : `${genderInfo.genderURL}${genderInfo.normal}`
              }
              alt={genderInfo.gender}
            />
          </div>
        ))}
      </div>
      <p className='font-thin pt-2'>
        Note: You can click the same gender icon to return to &quot;default&quot; genders.
      </p>
    </div>
  );
};

GenderSelection.propTypes = {
  handleGenderClick: PropTypes.func.isRequired
};

export default GenderSelection
