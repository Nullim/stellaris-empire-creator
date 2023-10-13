import { useEffect, useState } from 'react';
import LoadingScreen from '../../../components/layout/LoadingScreen';

const BASE_URL = '../../images/genders'

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

const GenderSelection = () => {
  const [selectedGender, setSelectedGender] = useState('default');
  const [hoveredGender, setHoveredGender] = useState(null);
  const [isMachine, setIsMachine] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imagePromises = genderData.map((genderInfo) => {
      return new Promise((resolve, reject) => {
        const normalImage = new Image();
        const selectedImage = new Image();
        const hoverImage = new Image();

        normalImage.onload = () => {
          selectedImage.onload = () => {
            hoverImage.onload = () => {
              resolve()
            }
            hoverImage.src = `${genderInfo.genderURL}${genderInfo.hover}`;
            hoverImage.onerror = reject;
          }
          selectedImage.src = `${genderInfo.genderURL}${genderInfo.selected}`;
          selectedImage.onerror = reject;
        }
        normalImage.src = `${genderInfo.genderURL}${genderInfo.normal}`;
        normalImage.onerror = reject;
      })
    });
    Promise.all(imagePromises)
      .then(() => {
        setIsLoading(false);
      })

    const getParamsFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const genderParam = params.get('sG');
      const speciesParam = params.get('sN');
      if (speciesParam === 'Machine') {
        setIsMachine(true);
        setSelectedGender('default');
      } else if (genderParam) {
        setIsMachine(false);
        setSelectedGender(genderParam);
      } else {
        setIsMachine(false);
      }
    }
    getParamsFromURL();
  }, []);

  const handleMouseEnter = (gender) => {
    setHoveredGender(gender);
  };

  const handleMouseLeave = () => {
    setHoveredGender(null);
  };

  const handleClick = (gender) => {
    setSelectedGender((prevGender) => {
      const params = new URLSearchParams(window.location.search);
      let newGender;

      if (prevGender === gender) {
        newGender = 'default';
        params.delete('sG');
      } else {
        newGender = gender;
        params.set('sG', gender);
      }

      window.history.replaceState({}, '', `?${params.toString()}`);
      return newGender;
    });
    window.dispatchEvent(new Event('popstate'))
  };

  return (
    <div className='flex flex-col'>
      <div className="flex items-center justify-start">
        {isLoading && !isMachine ? (
          <LoadingScreen />
        ) : (
          !isMachine && genderData.map((genderInfo) => (
            <div
              key={genderInfo.gender}
              className="cursor-pointer pr-3"
              onMouseEnter={() => handleMouseEnter(genderInfo.gender)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(genderInfo.gender)}
            >
              {/* Render appropriate gender image */}
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
          ))
        )}
      </div>
      <p className='font-thin pt-2'>
        {isMachine ? "You cannot select a gender as a machine." : `Note: You can click the same gender icon to return to "default" genders.`}
      </p>
    </div>
  );
};

export default GenderSelection
